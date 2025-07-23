import '@testing-library/jest-dom';
import { vi, expect } from 'vitest';
import React from 'react';

// Mock external modules
vi.mock('next/image', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: ({ src, alt, ...props }: any) => React.createElement('img', { src, alt, ...props })
  };
});

// Mock API for leaderboard
vi.mock('@/lib/api', () => ({
  __esModule: true,
  fetchLeaderboard: vi.fn().mockResolvedValue({
    data: [
      { id: 1, username: 'Gamer1', points: 1000 },
      { id: 2, username: 'Gamer2', points: 950 },
      { id: 3, username: 'Gamer3', points: 900 },
      { id: 4, username: 'Gamer4', points: 850 },
      { id: 5, username: 'Gamer5', points: 800 },
      { id: 6, username: 'Gamer6', points: 750 },
      { id: 7, username: 'Gamer7', points: 700 },
      { id: 8, username: 'Gamer8', points: 650 },
      { id: 9, username: 'Gamer9', points: 600 },
      { id: 10, username: 'Gamer10', points: 550 },
    ]
  })
}));

// Add any global matchers or utilities
expect.extend({
  toBeValidEmail(received: string) {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(received);
    return {
      message: () => `expected ${received} ${isValid ? 'not' : ''} to be a valid email address`,
      pass: isValid
    };
  }
});
