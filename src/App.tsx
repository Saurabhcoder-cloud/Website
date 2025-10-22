
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import RefundCalculatorPage from './pages/RefundCalculatorPage';
import ChatAssistantPage from './pages/ChatAssistantPage';
import FileUploadPage from './pages/FileUploadPage';
import PricingPage from './pages/PricingPage';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <Router>
          <div className="min-h-screen bg-background text-foreground">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/refund-calculator" element={<RefundCalculatorPage />} />
              <Route path="/chat" element={<ChatAssistantPage />} />
              <Route path="/file-taxes" element={<FileUploadPage />} />
              <Route path="/pricing" element={<PricingPage />} />
            </Routes>
          </div>
          <Toaster />
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;