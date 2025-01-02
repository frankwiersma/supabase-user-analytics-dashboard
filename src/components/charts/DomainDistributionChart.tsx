import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from 'recharts';

interface DomainData {
  name: string;
  users: number;
}

interface Props {
  data: DomainData[];
}

export const DomainDistributionChart = ({ data }: Props) => (
  <Card>
    <CardHeader>
      <CardTitle>Domain Distribution</CardTitle>
      <CardDescription>Users by email domain</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#2E2E2E" />
            <XAxis 
              type="number" 
              scale="linear" 
              domain={[0, 'auto']} 
              tick={{ fill: '#CCCCCC', fontSize: 12 }}
              axisLine={{ stroke: '#2E2E2E' }}
            />
            <YAxis 
              dataKey="name" 
              type="category" 
              width={150}
              tick={{ fill: '#CCCCCC', fontSize: 12 }}
              axisLine={{ stroke: '#2E2E2E' }}
            />
            <Tooltip />
            <Bar dataKey="users" fill="#3ECF8E" name="Users" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);