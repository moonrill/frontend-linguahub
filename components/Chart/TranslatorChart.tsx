import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '../ui/chart';

interface Data {
  month: string;
  income: number;
}

interface Props {
  data: Data[];
}

const TranslatorChart = ({ data }: Props) => {
  const chartConfig = {
    income: {
      label: 'Income',
      color: 'hsl(var(--chart-1))',
    },
  } satisfies ChartConfig;

  const formatYAxisTick = (value: number) => {
    return `${(value / 1000).toFixed(0)}k`;
  };

  return (
    <Card className='bg-white rounded-2xl w-full border-none shadow-none'>
      <CardHeader>
        <CardTitle>Monthly Income</CardTitle>
        <CardDescription>January - December</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className='w-full h-[236px]'>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='month'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickCount={5}
              tickFormatter={formatYAxisTick}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey='income'
              fill='var(--color-income)'
              radius={[20, 20, 0, 0]}
            ></Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default TranslatorChart;
