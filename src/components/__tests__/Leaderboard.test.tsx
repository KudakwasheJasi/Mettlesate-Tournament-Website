/**
    * @description      : 
    * @author           : kudakwashe Ellijah
    * @group            : 
    * @created          : 22/07/2025 - 23:55:23
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 22/07/2025
    * - Author          : kudakwashe Ellijah
    * - Modification    : 
**/
/**
 * @description      : Tests for Leaderboard component
 * @author           : kudakwashe Ellijah
 * @created          : 24/07/2025
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

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    // Wait for player rows to appear
    await waitFor(() => {
      expect(screen.getAllByRole('row').length).toBeGreaterThan(1); // header + players
    });

    // Check for presence of Rank and Gamer Tag headers
    expect(screen.getByText(/Rank/i)).toBeInTheDocument();
    expect(screen.getByText(/Gamer Tag/i)).toBeInTheDocument();
  });
});
