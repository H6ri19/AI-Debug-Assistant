// // backend/src/routes/auth.js
// import express from 'express';
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';
// import User from '../Models/User.js';

// const router = express.Router();

// /* ================= LOCAL AUTH ================= */

// // POST /api/auth/signup
// router.post('/signup', async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ error: 'Email & password required' });
//     }

//     const exists = await User.findOne({ email });
//     if (exists) {
//       return res.status(400).json({ error: 'User already exists' });
//     }

//     const hashed = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       username,
//       email,
//       password: hashed,
//       provider: 'local',
//     });

//     res.json({ message: '✅ User registered', userId: user._id });
//   } catch (err) {
//     res.status(500).json({ error: 'Signup failed' });
//   }
// });

// // POST /api/auth/login
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: '7d',
//     });

//     res.json({ token, user });
//   } catch (err) {
//     res.status(500).json({ error: 'Login failed' });
//   }
// });

// // GET /api/auth/me
// router.get('/me', async (req, res) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return res.status(401).json({ error: 'No token provided' });
//   }

//   const token = authHeader.split(' ')[1];

//   try {
//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Fetch full user from DB
//     const user = await User.findById(decoded.id).select('-password');

//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     res.json({ user });
//   } catch (err) {
//     res.status(401).json({ error: 'Invalid token' });
//   }
// });
// /* ================= GOOGLE OAUTH ================= */

// router.get('/google', (req, res, next) => {
//   req.app
//     .get('passport')
//     .authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
// });

// router.get('/google/callback', (req, res, next) => {
//   req.app
//     .get('passport')
//     .authenticate('google', { session: false }, (err, user) => {
//       if (err || !user) {
//         return res.redirect(`${process.env.FRONTEND_URL}/login?error=oauth`);
//       }

//       const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//         expiresIn: '7d',
//       });

//       res.redirect(`${process.env.FRONTEND_URL}/oauth?token=${token}`);
//     })(req, res, next);
// });

// /* ================= GITHUB OAUTH ================= */

// router.get('/github', (req, res, next) => {
//   req.app.get('passport').authenticate('github', { scope: ['user:email'] })(
//     req,
//     res,
//     next
//   );
// });

// router.get('/github/callback', (req, res, next) => {
//   req.app
//     .get('passport')
//     .authenticate('github', { session: false }, (err, user) => {
//       if (err || !user) {
//         return res.redirect(`${process.env.FRONTEND_URL}/login?error=oauth`);
//       }

//       const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//         expiresIn: '7d',
//       });

//       res.redirect(`${process.env.FRONTEND_URL}/oauth?token=${token}`);
//     })(req, res, next);
// });

// export default router;
// backend/src/routes/auth.js
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../Models/User.js';

const router = express.Router();

/* ================= LOCAL AUTH ================= */

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email & password required' });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashed,
      provider: 'local',
    });

    res.json({ message: '✅ User registered', userId: user._id });
  } catch (err) {
    res.status(500).json({ error: 'Signup failed' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    // remove password before sending
    const safeUser = user.toObject();
    delete safeUser.password;

    res.json({ token, user: safeUser });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// GET /api/auth/me
router.get('/me', async (req, res) => {
  const authHeader = req.headers.authorization;
  console.log('AUTH HEADER:', authHeader);
  console.log('JWT SECRET:', process.env.JWT_SECRET);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  console.log('TOKEN RECEIVED:', token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('DECODED:', decoded);

    const user = await User.findById(decoded.id).select('-password');
    res.json({ user });
  } catch (err) {
    console.error('JWT ERROR:', err.message);
    res.status(401).json({ error: 'Invalid token' });
  }
});

/* ================= GOOGLE OAUTH ================= */

router.get('/google', (req, res, next) => {
  req.app
    .get('passport')
    .authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
});

router.get('/google/callback', (req, res, next) => {
  req.app
    .get('passport')
    .authenticate('google', { session: false }, (err, user) => {
      if (err || !user) {
        return res.redirect(`${process.env.FRONTEND_URL}/login?error=oauth`);
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });

      res.redirect(`${process.env.FRONTEND_URL}/oauth?token=${token}`);
    })(req, res, next);
});

/* ================= GITHUB OAUTH ================= */

router.get('/github', (req, res, next) => {
  req.app.get('passport').authenticate('github', { scope: ['user:email'] })(
    req,
    res,
    next
  );
});

router.get('/github/callback', (req, res, next) => {
  req.app
    .get('passport')
    .authenticate('github', { session: false }, (err, user) => {
      if (err || !user) {
        return res.redirect(`${process.env.FRONTEND_URL}/login?error=oauth`);
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });

      res.redirect(`${process.env.FRONTEND_URL}/oauth?token=${token}`);
    })(req, res, next);
});

export default router;
