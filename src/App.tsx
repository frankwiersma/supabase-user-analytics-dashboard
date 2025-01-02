import './App.css';
import { ThemeProvider } from 'next-themes';
import DragDropDashboard from './components/DragDropDashboard';
import { ThemeToggle } from './components/ThemeToggle';
import { Info } from 'lucide-react';

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <img src="https://supabase.com/favicon/favicon-32x32.png" alt="Supabase" className="w-8 h-8" />
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold">Supabase User Analytics Dashboard</h1>
              <div className="relative group">
                <Info className="h-5 w-5 text-muted-foreground cursor-help" />
                <div className="absolute left-0 top-full mt-2 hidden group-hover:block w-64 p-2 text-sm bg-popover text-popover-foreground rounded-md shadow-lg z-50">
                  This dashboard is not affiliated with or endorsed by Supabase.
                </div>
              </div>
            </div>
          </div>
          <ThemeToggle />
        </div>
        <DragDropDashboard />
      </div>
    </ThemeProvider>
  );
}

export default App;
