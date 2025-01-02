import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ResponsiveContainer, ComposedChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';

interface WeeklyData {
  name: string;
  total: number;
  withProfile: number;
}

interface Props {
  data: WeeklyData[];
}

export const WeeklyActivityChart = ({ data }: Props) => (
  <Card>
    <CardHeader>
      <CardTitle>Weekly Activity</CardTitle>
      <CardDescription className="text-gray-400">User engagement by day</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1F1F1F" />
            <XAxis 
              dataKey="name" 
              scale="band" 
              padding={{ left: 10, right: 10 }}
              tick={{ fill: '#A0A0A0', fontSize: 12 }}
              axisLine={{ stroke: '#1F1F1F' }}
            />
            <YAxis 
              width={50}
              tick={{ fill: '#A0A0A0', fontSize: 12 }}
              axisLine={{ stroke: '#1F1F1F' }}
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#3ECF8E" name="Total Users" radius={[4, 4, 0, 0]} />
            <Bar dataKey="withProfile" fill="#10B981" name="Complete Profiles" radius={[4, 4, 0, 0]} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);