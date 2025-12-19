// src/routes/agent.js
import express from 'express';
import OpenAI from 'openai';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();
let client;

function getClient() {
  if (!client) {
    client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return client;
}

// POST /api/agent/analyze
router.post('/analyze', authMiddleware, async (req, res) => {
  const { code = '', logs = '' } = req.body;

  try {
    // ✅ Mock mode (no OpenAI call)
    if (process.env.MOCK_AI === 'true') {
      console.log('⚡ Using MOCK_AI mode');
      return res.json({
        suggestion: {
          summary: 'Mock: Detected possible error in function at line 3.',
          patch:
            '// TODO: Add a null check before using obj\nif (!obj) return;',
          confidence: 0.85,
        },
      });
    }

    // ✅ Real OpenAI call
    const client = getClient();
    const response = await client.responses.create({
      model: 'gpt-4o-mini',
      input: `You are a debugging assistant. Analyze the following code and logs:

Code:
${code}

Logs:
${logs}

Suggest fixes and improvements in clear steps.`,
    });

    const output = response.output_text || 'No suggestion available';

    res.json({
      suggestion: { summary: output },
    });
  } catch (err) {
    console.error('Agent error:', err.message);
    res.status(500).json({ error: 'AI analysis failed' });
  }
});

export default router;
