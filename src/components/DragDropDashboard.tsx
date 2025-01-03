import { useState, useCallback } from 'react';
import Papa from 'papaparse';
import _ from 'lodash';
import { Upload } from 'lucide-react';
import { processCSVDataUtil } from '@/lib/processData';
import type { DashboardData } from '@/types/dashboard';
import { WeeklyActivityChart } from './charts/WeeklyActivityChart';
import { TimeDistributionChart } from './charts/TimeDistributionChart';
import { DomainDistributionChart } from './charts/DomainDistributionChart';
import { EngagementChart } from './charts/EngagementChart';
import { StatsCards } from './StatsCards';
import { generateSampleData } from '@/lib/sampleData';

const DragDropDashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [hasData, setHasData] = useState(false);
  
  const COLORS = ['#3ECF8E', '#6EE7B7', '#34D399', '#10B981'];

  const handleCSVData = (csvData: string) => {
    try {
      // Validate CSV structure
      const parsedData = Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true
      });
      
      // Validate required columns
      const requiredColumns = ['created_at', 'email', 'last_sign_in_at'];
      const headers = Object.keys(parsedData.data[0] || {});
      const missingColumns = requiredColumns.filter(col => !headers.includes(col));
      
      if (missingColumns.length > 0) {
        throw new Error(`Missing required columns: ${missingColumns.join(', ')}\n\nMake sure to use 'select * from auth.users;' to export the data.`);
      }

      const processedData = processCSVDataUtil(parsedData.data);
      setData(processedData);

      setHasData(true);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Error processing CSV file. Please make sure you exported the data using "select * from auth.users;"');
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'text/csv') {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target?.result) {
          handleCSVData(event.target.result as string);
        }
      };
      reader.readAsText(file);
    }
  }, []);
  
  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target?.result) {
          handleCSVData(event.target.result as string);
        }
      };
      reader.readAsText(file);
    }
  }, []);

  if (!hasData) {
    const sampleData = generateSampleData();
  
    return (
      <div className="relative min-h-[100dvh] flex items-center justify-center">
        <div className="absolute inset-0 pointer-events-none opacity-40 filter blur-[2px]">
          <StatsCards {...sampleData} />
          <div className="grid gap-4 md:grid-cols-2 mt-8">
            <WeeklyActivityChart data={sampleData.weekActivity} />
            <TimeDistributionChart data={sampleData.timeStats} colors={COLORS} />
            <DomainDistributionChart data={sampleData.domains} />
            <EngagementChart data={sampleData.engagement} />
          </div>
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`w-[90%] max-w-96 mx-4 h-64 flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-8 transition-colors bg-card shadow-lg
              ${isDragging ? 'border-blue-500 bg-blue-500/10' : 'border-border'}`}
          >
            <Upload className="h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2 text-foreground">Drop your CSV file here</h2>
            <div className="text-sm text-muted-foreground mb-4 text-center">
              <p className="mb-2">Export your Supabase users with:</p>
              <code className="bg-muted px-2 py-1 rounded">select * from auth.users;</code>
            </div>
            <p className="text-muted-foreground mb-4">- then -</p>
            <label className="cursor-pointer bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600 transition-colors">
              Upload CSV
              <input
                type="file"
                accept=".csv"
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const totalUsers = data.rawData.length;
  const activeUsers = data.rawData.filter(u => u.engagement > 0).length;
  const profileComplete = data.rawData.filter(u => u.hasAvatar && u.fullName).length;
  const completionRate = totalUsers ? Math.round((profileComplete / totalUsers) * 100) : 0;

  return (
    <div className="space-y-8">
      <div className="flex justify-end">
        <label className="cursor-pointer bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600 transition-colors inline-flex items-center gap-2">
          <Upload className="h-4 w-4" />
          Upload New CSV
          <input
            type="file"
            accept=".csv"
            onChange={handleFileSelect}
            className="hidden"
          />
        </label>
      </div>

      <StatsCards
        totalUsers={totalUsers}
        activeUsers={activeUsers}
        profileComplete={profileComplete}
        completionRate={completionRate}
        domainsCount={data.domains.length}
        peakActivity={_.maxBy(data.timeStats, 'value')?.name || 'N/A'}
        monthlySignups={data.monthlyStats?.thisMonth || 0}
        monthlyGrowth={data.monthlyStats?.monthlyGrowth || '0'}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <WeeklyActivityChart data={data.weekActivity} />
        <TimeDistributionChart data={data.timeStats} colors={COLORS} />
        <DomainDistributionChart data={data.domains} />
        <EngagementChart data={data.engagement} />
      </div>
    </div>
  );
};

export default DragDropDashboard;