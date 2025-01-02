import './App.css';
import { ThemeProvider } from 'next-themes';
import DragDropDashboard from './components/DragDropDashboard';
import { ThemeToggle } from './components/ThemeToggle';

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <img src="https://supabase.com/favicon/favicon-32x32.png" alt="Supabase" className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Supabase User Analytics Dashboard</h1>
          </div>
          <ThemeToggle />
        </div>
        <DragDropDashboard />
      </div>
    </ThemeProvider>
  );
}

export default App;
