import { BrowserRouter } from 'react-router-dom';

import { Router } from './Router';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { AppBar } from './components/AppBar';

export function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppBar />

        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}
