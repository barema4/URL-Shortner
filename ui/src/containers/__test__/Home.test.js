import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../Home'

it('renders home component', () => {
    render(<Home />);
    const linkElement = screen.getByText('Please submit your Url');
    expect(linkElement).toBeInTheDocument();
  });

  it('get elements button text', () => {
    render(<Home />);
    const linkElement = screen.getByText('CREATE');
    expect(linkElement).toBeInTheDocument();
  });