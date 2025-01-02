# Supabase User Analytics Dashboard

A beautiful, interactive dashboard for visualizing Supabase user analytics data. Built with React, Vite, and shadcn/ui, featuring a dark/light theme and responsive design.

![Dashboard Preview](https://raw.githubusercontent.com/supabase/supabase/master/apps/www/public/img/supabase-og-image.png)

## Features

- 📊 Interactive charts and visualizations
- 🌓 Dark/light theme support
- 📱 Fully responsive design
- 📈 Real-time data processing
- 🎨 Supabase-styled components
- 📁 CSV data import support

## Charts & Analytics

- Weekly Activity Tracking
- Time Distribution Analysis
- Domain Distribution Stats
- User Engagement Levels
- Key Performance Metrics

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Export your Supabase users data using:
   ```sql
   select * from auth.users;
   ```
2. Save the results as a CSV file
3. Drag and drop the CSV file onto the dashboard or use the upload button
4. View your analytics instantly!

## Tech Stack

- React 18
- Vite
- TypeScript
- Tailwind CSS
- shadcn/ui
- Recharts
- next-themes
- Lucide Icons

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## License

MIT

## Credits

Built with ⚡ using [Bolt.new](https://bolt.new)