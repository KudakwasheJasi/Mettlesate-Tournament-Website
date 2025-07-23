/**
    * @description      : 
    * @author           : kudakwashe Ellijah
    * @group            : 
    * @created          : 22/07/2025 - 23:56:24
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 22/07/2025
    * - Author          : kudakwashe Ellijah
    * - Modification    : 
**/
/**
 * @description      : Integration tests for landing page flow
 * @author           : kudakwashe Ellijah
 * @created          : 24/07/2025
 * 
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 24/07/2025
 * - Author          : kudakwashe Ellijah
 * - Modification    : Created integration tests for landing page
 **/
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Home from '../../app/page';

describe('Landing Page Integration', () => {
    it('renders Hero and opens/closes registration modal', async () => {
      render(<Home />);

      // Wait for Hero section to be visible after loading
      await waitFor(() => {
        // The text "Legends of Victory: Battle Royale Cup" is not present in the current Home component.
        // Instead, check for the heading text "Mettlesate Tournament" from Hero component.
        expect(screen.getByRole('heading', { name: /mettlesate tournament/i })).toBeInTheDocument();
      });

      // Click Register Now button
      const registerButton = screen.getByRole('button', { name: /Register Now/i });
      fireEvent.click(registerButton);

      // Wait for loading dots to appear and disappear
      await waitFor(() => expect(screen.queryByText(/Loading.../i)).toBeNull(), { timeout: 3000 });

      // Registration form should appear
      expect(screen.getByRole('form')).toBeInTheDocument();

      // Close the registration modal
      const closeButton = screen.getByLabelText(/Close registration form/i);
      fireEvent.click(closeButton);

      // Hero section should be visible again
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /mettlesate tournament/i })).toBeInTheDocument();
      });
    });
});
