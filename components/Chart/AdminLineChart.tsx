'use client';

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '../ui/chart';

const AdminLineChart = () => {
  const chartData = [
    { month: 'January', income: 186000, expense: 80000 },
    { month: 'February', income: 305000, expense: 20000 },
    { month: 'March', income: 237000, expense: 12000 },
    { month: 'April', income: 730000, expense: 190000 },
    { month: 'May', income: 209000, expense: 13000 },
    { month: 'June', income: 2140000, expense: 140000 },
    { month: 'July', income: 190000, expense: 80000 },
    { month: 'August', income: 300000, expense: 20000 },
    { month: 'September', income: 200000, expense: 12000 },
    { month: 'October', income: 250000, expense: 13000 },
    { month: 'November', income: 200000, expense: 140000 },
    { month: 'December', income: 190000, expense: 80000 },
  ];
  const chartConfig = {
    income: {
      label: 'Income',
      color: 'hsl(var(--chart-1))',
    },
    expense: {
      label: 'Expense',
      color: 'hsl(var(--chart-2))',
    },
  } satisfies ChartConfig;
  const formatYAxisTick = (value: number) => {
    return `${(value / 1000).toFixed(0)}k`;
  };
  return (
    <Card className='bg-white rounded-2xl w-full border-none shadow-none'>
      <CardHeader>
        <CardTitle>Monthly Payments</CardTitle>
        <CardDescription>January - December</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className='2xl:h-[450px] w-full'>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='month'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickCount={5}
              tickFormatter={formatYAxisTick}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <defs>
              <linearGradient id='fillincome' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor='var(--color-income)'
                  stopOpacity={0.8}
                />
                <stop
                  offset='95%'
                  stopColor='var(--color-income)'
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id='fillexpense' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor='var(--color-expense)'
                  stopOpacity={0.8}
                />
                <stop
                  offset='95%'
                  stopColor='var(--color-expense)'
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey='expense'
              type='natural'
              fill='url(#fillexpense)'
              fillOpacity={0.4}
              stroke='var(--color-expense)'
              stackId='a'
            />
            <Area
              dataKey='income'
              type='natural'
              fill='url(#fillincome)'
              fillOpacity={0.4}
              stroke='var(--color-income)'
              stackId='a'
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default AdminLineChart;
