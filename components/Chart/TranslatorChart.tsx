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

const TranslatorChart = () => {
  const chartData = [
    { month: 'January', income: 190000 },
    { month: 'February', income: 65000 },
    { month: 'March', income: 975000 },
    { month: 'April', income: 350000 },
    { month: 'May', income: 120000 },
    { month: 'June', income: 426000 },
    { month: 'July', income: 450000 },
    { month: 'August', income: 256000 },
    { month: 'September', income: 321000 },
    { month: 'October', income: 198000 },
    { month: 'November', income: 190000 },
    { month: 'December', income: 150000 },
  ];

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
        <ChartContainer
          config={chartConfig}
          className='h-full 2xl:h-[350px] w-full'
        >
          <BarChart accessibilityLayer data={chartData}>
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
