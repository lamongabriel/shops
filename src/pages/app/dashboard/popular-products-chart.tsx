'use client'

import { useQuery } from '@tanstack/react-query'
import { Pie, PieChart } from 'recharts'

import { getPopularProducts } from '@/api/get-popular-products'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

export function PopularProductsChart() {
  const { data: popularProducts } = useQuery({
    queryFn: getPopularProducts,
    queryKey: ['metrics', 'popular-products'],
  })

  const chartConfig = {
    amount: {
      label: 'Amount',
      color: '',
    },
  } satisfies ChartConfig

  if (popularProducts) {
    popularProducts.forEach((product, index) => {
      const key = product.product as keyof typeof chartConfig

      if (!chartConfig[key]) {
        chartConfig[key] = {
          label: product.product,
          color: `hsl(var(--chart-${index + 1}))`,
        }
      }
    })
  }

  return (
    <Card className="col-span-3 flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Popular Products</CardTitle>
        <CardDescription>
          Most sold products in the selected period
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {popularProducts && (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={popularProducts}
                dataKey="amount"
                nameKey="product"
                innerRadius={60}
                strokeWidth={4}
              />
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
