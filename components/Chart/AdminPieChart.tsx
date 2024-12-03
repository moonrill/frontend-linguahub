'use client';

import { Label, Pie, PieChart } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '../ui/chart';

export const description = 'A donut chart with text';

interface Props {
  system: number;
  translator: number;
  coupon: number;
}

const AdminPieChart = ({ system, translator, coupon }: Props) => {
  const chartData = [
    { type: 'system', amount: system, fill: 'var(--color-system)' },
    { type: 'translator', amount: translator, fill: 'var(--color-translator)' },
    { type: 'coupon', amount: coupon, fill: 'var(--color-coupon)' },
  ];

  const chartConfig = {
    amount: {
      label: 'Amount',
    },
    system: {
      label: 'System',
      color: 'hsl(var(--chart-2))',
    },
    translator: {
      label: 'Translator',
      color: 'hsl(var(--chart-1))',
    },
    coupon: {
      label: 'Coupon',
      color: 'hsl(var(--chart-5))',
    },
  } satisfies ChartConfig;

  const totalAmount = system + translator + coupon;

  return (
    <Card className='bg-white rounded-2xl w-full border-none shadow-none h-full'>
      <CardHeader className='items-center pb-0'>
        <CardTitle>Payment Deliveries</CardTitle>
      </CardHeader>
      <CardContent className='flex-1 pb-0'>
        <ChartContainer
          config={chartConfig}
          className='mx-auto aspect-square max-h-[400px]'
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Pie
              data={chartData}
              dataKey='amount'
              nameKey='type'
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor='middle'
                        dominantBaseline='middle'
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className='fill-foreground text-2xl font-bold'
                        >
                          {`${(totalAmount / 1000).toFixed(0)}K`}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className='fill-muted-foreground'
                        ></tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default AdminPieChart;
