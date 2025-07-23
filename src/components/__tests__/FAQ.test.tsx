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
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FAQ from '../FAQ';

describe('FAQ', () => {
  it('renders all questions and toggles answers', () => {
    render(<FAQ />);

    const questions = screen.getAllByRole('button');
    expect(questions.length).toBeGreaterThanOrEqual(3);

    // Initially, answer should be hidden (opacity 0)
    const answer = screen.getByText((content) => content.toLowerCase().includes('you can register'));
    expect(answer).toHaveStyle('opacity: 0');

    // Click first question to open answer
    fireEvent.click(questions[0]);
    expect(answer).toHaveStyle('opacity: 1');

    // Click again to close
    fireEvent.click(questions[0]);
    expect(answer).toHaveStyle('opacity: 0');
  });
});
