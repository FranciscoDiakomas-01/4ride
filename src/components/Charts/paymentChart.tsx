"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "Gráfico de área interativo de pagamentos";

const chartData = [
  { date: "2024-04-01", concluido: 22320, pendente: 1530, cancelado: 230 },
  { date: "2024-04-02", concluido: 13280, pendente: 120, cancelado: 20 },
  { date: "2024-04-03", concluido: 210, pendente: 130, cancelado: 25 },
  { date: "2024-04-04", concluido: 250, pendente: 1460, cancelado: 35 },
  { date: "2024-04-05", concluido: 300, pendente: 2354, cancelado: 40 },
  { date: "2024-04-06", concluido: 23280, pendente: 170, cancelado: 428 },
  { date: "2024-04-07", concluido: 270, pendente: 150, cancelado: 22 },
  { date: "2024-04-08", concluido: 290, pendente: 1280, cancelado: 30 },
  { date: "2024-04-09", concluido: 2400, pendente: 140, cancelado: 186 },
  { date: "2024-04-10", concluido: 250, pendente: 360, cancelado: 20 },
  { date: "2024-04-09", concluido: 200, pendente: 140, cancelado: 185 },
  { date: "2024-04-10", concluido: 2450, pendente: 1650, cancelado: 20 },
];

const chartConfig = {
  concluido: {
    label: "Pagamentos Concluídos",
    color: "var(--chart-1)",
  },
  pendente: {
    label: "Pagamentos Pendentes",
    color: "var(--chart-2)",
  },
  cancelado: {
    label: "Pagamentos Cancelados",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export function ChartLinear() {
  const [timeRange, setTimeRange] = React.useState("90d");

  const filteredData = chartData;

  return (
    <Card className="pt-0" data-aos="fade-up">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Pagamentos - Gráfico Interativo</CardTitle>
          <CardDescription>
            Exibindo pagamentos por status em Abril 2024
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillConcluido" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--chart-1)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--chart-1)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillPendente" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--chart-2)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--chart-2)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillCancelado" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--chart-3)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--chart-3)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("pt-PT", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("pt-PT", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="concluido"
              type="natural"
              fill="url(#fillConcluido)"
              stroke="var(--chart-1)"
              stackId="a"
            />
            <Area
              dataKey="pendente"
              type="natural"
              fill="url(#fillPendente)"
              stroke="var(--chart-2)"
              stackId="a"
            />
            <Area
              dataKey="cancelado"
              type="natural"
              fill="url(#fillCancelado)"
              stroke="var(--chart-3)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
