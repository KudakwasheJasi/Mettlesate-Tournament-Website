/**
    * @description      : 
    * @author           : kudakwashe Ellijah
    * @group            : 
    * @created          : 22/07/2025 - 23:54:57
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 22/07/2025
    * - Author          : kudakwashe Ellijah
    * - Modification    : 
**/
/**
 * @description      : Tests for FAQ component
 * @author           : kudakwashe Ellijah
 * @created          : 24/07/2025
 * 
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 24/07/2025
 * - Author          : kudakwashe Ellijah
 * - Modification    : Created tests for FAQ component
 **/
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FAQ from '../FAQ';

describe('FAQ', () => {
  it('renders all questions and toggles answers', async () => {
    render(<FAQ />);

    const questions = screen.getAllByRole('button');
    expect(questions.length).toBeGreaterThanOrEqual(3);

    // Initially, answer should not be in the document
    // The question text is always present, so check for the answer paragraph instead
    expect(screen.queryByText('You can register by clicking the "Register Now" button and filling out the registration form.')).toBeNull();

    // Click first question to open answer
    fireEvent.click(questions[0]);
    await waitFor(() => {
      expect(screen.getByText('You can register by clicking the "Register Now" button and filling out the registration form.')).toBeInTheDocument();
    });

    // Click again to close
    fireEvent.click(questions[0]);
    await waitFor(() => {
      // The question text remains, so check for the answer paragraph instead
      expect(screen.queryByText('You can register by clicking the "Register Now" button and filling out the registration form.')).toBeNull();
    });
  });
});
