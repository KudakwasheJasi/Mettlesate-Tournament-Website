/**
    * @description      : 
    * @author           : kudakwashe Ellijah
    * @group            : 
    * @created          : 22/07/2025 - 23:54:23
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 22/07/2025
    * - Author          : kudakwashe Ellijah
    * - Modification    : 
**/
/**
 * @description      : Tests for Hero component
 * @author           : kudakwashe Ellijah
 * @created          : 24/07/2025
 * 
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 24/07/2025
 * - Author          : kudakwashe Ellijah
 * - Modification    : Created tests for Hero component
 **/
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Hero from '../Hero';

describe('Hero', () => {
  it('renders title, subtitle, and button', () => {
    const mockOnRegisterClick = vi.fn();
    render(<Hero onRegisterClick={mockOnRegisterClick} />);

    expect(screen.getByText(/Legends of Victory: Battle Royale Cup/i)).toBeInTheDocument();
    expect(screen.getByText(/Compete for glory. Only one can win./i)).toBeInTheDocument();
    const button = screen.getByRole('button', { name: /Register Now/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(mockOnRegisterClick).toHaveBeenCalled();
  });
});
