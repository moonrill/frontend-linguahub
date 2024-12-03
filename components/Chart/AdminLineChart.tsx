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

interface Data {
  month: string;
  income: number;
  expense: number;
}

interface Props {
  data: Data[];
}

const AdminLineChart = ({ data }: Props) => {
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
        <ChartContainer config={chartConfig} className='2xl:h-[400px] w-full'>
          <AreaChart
            accessibilityLayer
            data={data}
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
