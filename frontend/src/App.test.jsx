import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App.jsx';

describe('GrowthGuardian App', () => {
  it('renders without crashing synchronously', () => {
    try {
      render(<App />);
      console.log("REACT SUCESSFULLY RENDERED APP");
    } catch (e) {
      console.error("FATAL REACT RUNTIME EXCEPTION CAUSING BLANK SCREEN:");
      console.error(e.message);
      console.error(e.stack);
      throw e;
    }
  });
});
