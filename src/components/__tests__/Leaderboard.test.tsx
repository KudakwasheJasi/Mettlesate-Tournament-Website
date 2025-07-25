/**
    * @description      : 
    * @author           : kudakwashe Ellijah
    * @group            : 
    * @created          : 22/07/2025 - 23:55:23
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 24/07/2025
    * - Author          : kudakwashe Ellijah
    * - Modification    : Created tests for Leaderboard component
 **/
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Leaderboard from '../Leaderboard';

describe('Leaderboard', () => {
  it('renders loading state initially and then player rows', async () => {
    render(<Leaderboard />);

    // Check for spinner element indicating loading state
    const spinner = document.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();

    // Wait for spinner to disappear
    await waitFor(() => {
      const spinner = document.querySelector('.animate-spin');
      if (spinner) {
        throw new Error('Loading spinner still present');
      }
    }, {timeout: 5000});

    // Now check for player rows
    const table = screen.getAllByRole('table')[0];
    const rows = table.querySelectorAll('tr');
    expect(rows.length).toBeGreaterThan(1); // header + players

    // Check for presence of Rank and Player headers
    expect(screen.getByText(/Rank/i)).toBeInTheDocument();
    expect(screen.getByText(/Player/i)).toBeInTheDocument();
  });
});
