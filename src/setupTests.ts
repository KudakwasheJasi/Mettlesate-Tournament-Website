/**
    * @description      : 
    * @author           : kudakwashe Ellijah
    * @group            : 
    * @created          : 23/07/2025 - 21:44:11
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 23/07/2025
    * - Author          : kudakwashe Ellijah
    * - Modification    : 
**/
import '@testing-library/jest-dom';
import { vi, expect } from 'vitest';
import * as React from 'react';

// Mock external modules
vi.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => 
    React.createElement('img', { src, alt, ...props })
}));

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

interface IntersectionObserverEntry {
  readonly time: DOMHighResTimeStamp;
  readonly rootBounds: DOMRectReadOnly | null;
  readonly boundingClientRect: DOMRectReadOnly;
  readonly intersectionRect: DOMRectReadOnly;
  readonly isIntersecting: boolean;
  readonly intersectionRatio: number;
}

interface IntersectionObserverInit {
  root?: Element | Document | null;
  rootMargin?: string;
  threshold?: number | number[];
}

class MockIntersectionObserver {
  root: Element | Document | null = null;
  rootMargin: string = '';
  thresholds: number[] = [];

  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    this.root = options?.root || null;
    this.rootMargin = options?.rootMargin || '';
    if (Array.isArray(options?.threshold)) {
      this.thresholds = options!.threshold!;
    } else if (typeof options?.threshold === 'number') {
      this.thresholds = [options!.threshold!];
    } else {
      this.thresholds = [];
    }
  }

  observe(target: Element): void {
    // no-op
  }

  unobserve(target: Element): void {
    // no-op
  }

  disconnect(): void {
    // no-op
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

window.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;

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
