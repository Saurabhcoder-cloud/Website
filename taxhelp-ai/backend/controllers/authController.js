import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { createUser, findUserByEmail, findUserById } from '../models/User.js';

const TOKEN_EXPIRY = '7d';

function signToken(userId) {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not configured');
  }

  return jwt.sign({ sub: userId }, process.env.JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
}

export async function register(req, res) {
  const { name, email, password } = req.body ?? {};

  if (!name || !email || !password) {
    return res.status(400).json({
      error: 'validation_error',
      message: 'Name, email, and password are required.',
      example: {
        name: 'Ada Lovelace',
        email: 'ada@example.com',
        password: 'Str0ngPassw0rd!'
      }
    });
  }

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        error: 'conflict',
        message: 'An account with that email already exists.',
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await createUser({ name, email, passwordHash });
    const token = signToken(user.id);

    return res.status(201).json({
      message: 'Registration successful.',
      token,
      user,
      sample: {
        request: { name: 'John Doe', email: 'john@example.com', password: 'Strong#1234' },
        response: {
          message: 'Registration successful.',
          token: '<jwt-token>',
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            plan: user.plan,
            plan_expiry: user.plan_expiry,
            created_at: user.created_at
          }
        }
      }
    });
  } catch (error) {
    console.error('Registration failed:', error);
    return res.status(500).json({
      error: 'server_error',
      message: 'Unable to register user at this time.'
    });
  }
}

export async function login(req, res) {
  const { email, password } = req.body ?? {};

  if (!email || !password) {
    return res.status(400).json({
      error: 'validation_error',
      message: 'Email and password are required.'
    });
  }

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        error: 'invalid_credentials',
        message: 'Email or password is incorrect.'
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        error: 'invalid_credentials',
        message: 'Email or password is incorrect.'
      });
    }

    const token = signToken(user.id);

    return res.json({
      message: 'Login successful.',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        plan: user.plan,
        plan_expiry: user.plan_expiry,
        created_at: user.created_at
      },
      sample: {
        request: { email: 'john@example.com', password: 'Strong#1234' },
        response: {
          message: 'Login successful.',
          token: '<jwt-token>'
        }
      }
    });
  } catch (error) {
    console.error('Login failed:', error);
    return res.status(500).json({
      error: 'server_error',
      message: 'Unable to login at this time.'
    });
  }
}

export async function me(req, res) {
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({
      error: 'unauthorized',
      message: 'Authentication token missing or invalid.'
    });
  }

  try {
    const user = await findUserById(userId);
    if (!user) {
      return res.status(404).json({
        error: 'not_found',
        message: 'User not found.'
      });
    }

    return res.json({
      user,
      sample: {
        response: {
          user
        }
      }
    });
  } catch (error) {
    console.error('Fetch profile failed:', error);
    return res.status(500).json({
      error: 'server_error',
      message: 'Unable to retrieve user profile.'
    });
  }
}
