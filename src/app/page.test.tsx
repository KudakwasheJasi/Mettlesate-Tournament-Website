/**
    * @description      : 
    * @author           : kudakwashe Ellijah
    * @group            : 
    * @created          : 23/07/2025 - 21:57:06
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 23/07/2025
    * - Author          : kudakwashe Ellijah
    * - Modification    : 
**/
import React from 'react';
import { render, screen, waitFor, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import Home from './page';
import { vi } from 'vitest';

describe('Home Page', () => {
  it('renders loading state initially', async () => {
    render(<Home />);
    // The loading spinner does not have role="progressbar", so query by class or test id
    const loader = document.querySelector('.loader');
    expect(loader).toBeInTheDocument();
  });

  it('shows hero section after loading', async () => {
    render(<Home />);
    // Wait for loading spinner to disappear
    await waitFor(() => {
      expect(document.querySelector('.loader')).not.toBeInTheDocument();
    });
    const hero = screen.getByRole('heading', { name: /mettlesate tournament/i });
    expect(hero).toBeInTheDocument();
    const registerButton = screen.getByText(/register now/i);
    expect(registerButton).toBeInTheDocument();
  });

  describe('Registration Form', () => {
    const mockOnClose = vi.fn();
    const mockOnSubmit = vi.fn();

    beforeEach(() => {
      mockOnClose.mockClear();
      mockOnSubmit.mockClear();
    });

    it('opens registration form on click', async () => {
      render(<Home />);
      await waitFor(() => {
        const registerButton = screen.getByText(/register now/i);
        expect(registerButton).toBeInTheDocument();
        act(() => {
          registerButton.click();
        });
      });

      await waitFor(() => {
        const loadingDots = screen.getByTestId('loading-dots');
        expect(loadingDots).toBeInTheDocument();
      });

      await waitFor(() => {
        const form = screen.getByRole('form');
        expect(form).toBeInTheDocument();
      });
    });

    it('validates form fields', async () => {
      render(<Home />);
      await waitFor(() => {
        const registerButton = screen.getByText(/register now/i);
        act(() => {
          registerButton.click();
        });
      });

      await waitFor(() => {
        const form = screen.getByRole('form');
        expect(form).toBeInTheDocument();

        // Submit empty form to trigger validation
        fireEvent.submit(form);
        
        // Check error messages
        expect(screen.getByText(/Full Name is required/i)).toBeInTheDocument();
        expect(screen.getByText(/Gamer Tag is required/i)).toBeInTheDocument();
        expect(screen.getByText(/Invalid email address/i)).toBeInTheDocument();
        expect(screen.getByText(/Favourite Game Title is required/i)).toBeInTheDocument();
      });
    });

    it('submits form with valid data', async () => {
      render(<Home />);
      await waitFor(() => {
        const registerButton = screen.getByText(/register now/i);
        act(() => {
          registerButton.click();
        });
      });

      const form = screen.getByRole('form');
      expect(form).toBeInTheDocument();

      // Fill out form
      await userEvent.type(screen.getByLabelText(/Full Name/i), 'Test User');
      await userEvent.type(screen.getByLabelText(/Gamer Tag/i), 'testgamer123');
      await userEvent.type(screen.getByLabelText(/Email/i), 'test@example.com');
      await userEvent.type(screen.getByLabelText(/Favourite Game Title/i), 'Test Game');

      // Submit form
      fireEvent.submit(form);

      // Wait for form submission
      await waitForElementToBeRemoved(() => screen.getByRole('form'));

      // Check form submission
      await waitFor(() => {
        const checkSubmission = () => {
          expect(mockOnSubmit).toHaveBeenCalledWith({
            fullName: 'Test User',
            gamerTag: 'testgamer123',
            email: 'test@example.com',
            favouriteGame: 'Test Game'
          });
        };
        checkSubmission();
      });
    });

    it('closes form when close button is clicked', async () => {
      render(<Home />);
      await waitFor(() => {
        const registerButton = screen.getByText(/register now/i);
        act(() => {
          registerButton.click();
        });
      });

      await waitFor(() => {
        const closeButton = screen.getByRole('button', { name: /close/i });
        expect(closeButton).toBeInTheDocument();
        act(() => {
          closeButton.click();
        });

        // Form should be gone
        expect(screen.queryByRole('form')).not.toBeInTheDocument();
      });
    });
  });

  it('displays event details section', async () => {
    render(<Home />);
    await waitFor(() => {
      const details = screen.getByRole('heading', { name: /event details/i });
      expect(details).toBeInTheDocument();
    });
  });

  it('hero section has video background', async () => {
    render(<Home />);
    await waitFor(() => {
      const video = screen.getByRole('video');
      expect(video).toBeInTheDocument();
      expect(video).toHaveAttribute('autoplay');
      expect(video).toHaveAttribute('loop');
      expect(video).toHaveAttribute('muted');
    });
  });

  it('hero section has proper overlay', async () => {
    render(<Home />);
    await waitFor(() => {
      const overlay = screen.getByRole('img', { hidden: true });
      expect(overlay).toBeInTheDocument();
      expect(overlay).toHaveStyle('background-repeat: no-repeat');
    });
  });

  it('hero section has animated content', async () => {
    render(<Home />);
    await waitFor(() => {
      const animatedContent = screen.getByRole('heading', { name: /mettlesate tournament/i });
      expect(animatedContent).toHaveClass('motion');
    });
  });
});
