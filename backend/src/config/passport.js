// backend/src/config/passport.js
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import User from '../Models/User.js';

/* ================= GOOGLE OAUTH ================= */
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/auth/google/callback',
      },
      async (_, __, profile, done) => {
        try {
          let user = await User.findOne({ providerId: profile.id });

          if (!user) {
            user = await User.create({
              username: profile.displayName,
              email: profile.emails?.[0]?.value,
              provider: 'google',
              providerId: profile.id,
            });
          }

          done(null, user);
        } catch (err) {
          done(err, null);
        }
      }
    )
  );
  console.log('✅ Google OAuth enabled');
} else {
  console.warn('⚠️ Google OAuth disabled (missing env variables)');
}

/* ================= GITHUB OAUTH ================= */
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: '/api/auth/github/callback',
      },
      async (_, __, profile, done) => {
        try {
          let user = await User.findOne({ providerId: profile.id });

          if (!user) {
            user = await User.create({
              username: profile.username,
              provider: 'github',
              providerId: profile.id,
            });
          }

          done(null, user);
        } catch (err) {
          done(err, null);
        }
      }
    )
  );
  console.log('✅ GitHub OAuth enabled');
} else {
  console.warn('⚠️ GitHub OAuth disabled (missing env variables)');
}

export default passport;
