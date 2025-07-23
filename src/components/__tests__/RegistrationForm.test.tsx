/**
    * @description      : 
    * @author           : kudakwashe Ellijah
    * @group            : 
    * @created          : 22/07/2025 - 20:23:09
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 22/07/2025
    * - Author          : kudakwashe Ellijah
    * - Modification    : 
**/
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RegistrationForm } from '../RegistrationForm';

describe('RegistrationForm', () => {
  const onClose = vi.fn();
  const onSubmit = vi.fn();

  beforeEach(() => {
    onClose.mockClear();
    onSubmit.mockClear();
  });

  it('renders form fields and submits valid data', async () => {
    render(<RegistrationForm onClose={onClose} onSubmit={onSubmit} />);

    const fullNameInput = screen.getByLabelText(/Full Name/i);
    const gamerTagInput = screen.getByLabelText(/Gamer Tag/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const favouriteGameInput = screen.getByLabelText(/Favourite Game Title/i);
    const submitButton = screen.getByRole('button', { name: /Register/i });

    // Fill out form fields
    fireEvent.change(fullNameInput, { target: { value: 'John Doe' } });
    fireEvent.change(gamerTagInput, { target: { value: 'JD123' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(favouriteGameInput, { target: { value: 'Chess' } });

    // Wait for form to be present in DOM and form state to be updated
    const form = await screen.findByRole('form', {}, { timeout: 3000 });
    await waitFor(() => {
      expect(form).toBeInTheDocument();
    });

    // Submit form
    fireEvent.submit(form);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
      const callArg = onSubmit.mock.calls[0][0];
      expect(callArg.fullName).toBe('John Doe');
      expect(callArg.gamerTag).toBe('JD123');
      expect(callArg.email).toBe('john@example.com');
      expect(callArg.favouriteGame).toBe('Chess');
    });
  });

  it('shows validation errors on empty submit', async () => {
    render(<RegistrationForm onClose={onClose} onSubmit={onSubmit} />);

    const submitButton = screen.getByRole('button', { name: /Register/i });
    fireEvent.click(submitButton);

    expect(await screen.findAllByText(/is required/i)).toHaveLength(3);
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('calls onClose when close button is clicked', () => {
    render(<RegistrationForm onClose={onClose} onSubmit={onSubmit} />);

    const closeButton = screen.getByLabelText(/Close registration form/i);
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalled();
  });
});
