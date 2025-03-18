import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/theme.css'; // Import theme first for proper CSS cascade
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

/**
 * Root render of the application
 * Order of CSS imports is important:
 * 1. theme.css - Global design system variables
 * 2. index.css - Global reset and base styles
 * 3. App.css - App-level styles
 * 4. Component-specific styles
 */
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Performance monitoring
reportWebVitals();
