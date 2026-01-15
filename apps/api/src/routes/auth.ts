import { Router } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { Strategy as OAuth2Strategy } from 'passport-oauth2';

import { env } from '../config/env.js';
import { logger } from '../lib/logger.js';
import { authMiddleware } from '../middleware/auth.js';
import { prisma } from '@january/database';

export const authRouter = Router();

// Configure 42 OAuth Strategy
const fortyTwoStrategy = new OAuth2Strategy(
  {
    authorizationURL: 'https://api.intra.42.fr/oauth/authorize',
    tokenURL: 'https://api.intra.42.fr/oauth/token',
    clientID: env.FT_CLIENT_ID,
    clientSecret: env.FT_CLIENT_SECRET,
    callbackURL: env.FT_CALLBACK_URL,
  },
  async (accessToken: string, _refreshToken: string, _profile: unknown, done: (err: Error | null, user?: unknown) => void) => {
    try {
      // Fetch user data from 42 API
      const response = await fetch('https://api.intra.42.fr/v2/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch 42 user data');
      }

      const ftUser = await response.json();

      // Create or update user in database
      const user = await prisma.user.upsert({
        where: { fortyTwoId: String(ftUser.id) },
        update: {
          email: ftUser.email,
          displayName: ftUser.displayname,
          login: ftUser.login,
          avatarUrl: ftUser.image?.versions?.medium || ftUser.image?.link,
          campus: ftUser.campus?.[0]?.name || null,
        },
        create: {
          fortyTwoId: String(ftUser.id),
          email: ftUser.email,
          displayName: ftUser.displayname,
          login: ftUser.login,
          avatarUrl: ftUser.image?.versions?.medium || ftUser.image?.link,
          campus: ftUser.campus?.[0]?.name || null,
          tokens: 100, // Initial token balance
        },
      });

      done(null, user);
    } catch (error) {
      logger.error('OAuth callback error:', error);
      done(error as Error);
    }
  }
);

passport.use('42', fortyTwoStrategy);

// Initiate 42 OAuth flow
authRouter.get('/42', passport.authenticate('42', { session: false }));

// OAuth callback
authRouter.get(
  '/42/callback',
  passport.authenticate('42', { session: false, failureRedirect: '/login?error=auth_failed' }),
  (req, res) => {
    const user = req.user as { id: string };

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'] }
    );

    // Set httpOnly cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Redirect to frontend
    res.redirect(env.CORS_ORIGIN);
  }
);

// Get current user
authRouter.get('/me', authMiddleware, (req, res) => {
  res.json(req.user);
});

// Logout
authRouter.post('/logout', (_req, res) => {
  res.clearCookie('token');
  res.json({ success: true });
});
