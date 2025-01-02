import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';

interface EngagementLevels {
  high: number;
  medium: number;
  low: number;
}

interface Props {
  data: EngagementLevels;
}

export const EngagementChart = ({ data }: Props) => {
  const chartData = [
    { name: 'High', value: data.high },
    { name: 'Medium', value: data.medium },
    { name: 'Low', value: data.low }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Engagement Levels</CardTitle>
        <CardDescription>User engagement distribution</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={chartData}>
              <PolarGrid stroke="#2E2E2E" />
              <PolarAngleAxis dataKey="name" tick={{ fill: '#CCCCCC', fontSize: 12 }} />
              <PolarRadiusAxis tick={{ fill: '#CCCCCC', fontSize: 12 }} />
              <Radar
                name="Users"
                dataKey="value"
                stroke="#3ECF8E"
                fill="#3ECF8E"
                fillOpacity={0.6}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};