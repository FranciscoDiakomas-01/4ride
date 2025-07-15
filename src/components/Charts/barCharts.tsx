"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useState } from "react";

export const description = "Bar chart mostrando rotas do ano por status";

const chartData = [
  { month: "Janeiro", concluido: 140, pendente: 60, cancelado: 20 },
  { month: "Fevereiro", concluido: 180, pendente: 90, cancelado: 35 },
  { month: "Março", concluido: 120, pendente: 50, cancelado: 25 },
  { month: "Abril", concluido: 160, pendente: 70, cancelado: 15 },
  { month: "Maio", concluido: 200, pendente: 110, cancelado: 30 },
  { month: "Junho", concluido: 150, pendente: 80, cancelado: 40 },
  { month: "Julho", concluido: 190, pendente: 100, cancelado: 20 },
  { month: "Agosto", concluido: 170, pendente: 85, cancelado: 22 },
  { month: "Setembro", concluido: 210, pendente: 95, cancelado: 18 },
  { month: "Outubro", concluido: 230, pendente: 120, cancelado: 25 },
  { month: "Novembro", concluido: 250, pendente: 130, cancelado: 30 },
  { month: "Dezembro", concluido: 300, pendente: 140, cancelado: 35 },
];

const chartConfig = {
  concluido: {
    label: "Concluídas",
    color: "var(--chart-1)",
  },
  pendente: {
    label: "Pendentes",
    color: "var(--chart-2)",
  },
  cancelado: {
    label: "Canceladas",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export function AdminBarCharts() {
  const [year, setYear] = useState(new Date().getFullYear()?.toString());
  const [open, setOpen] = useState(false);

  const years = [
    {
      value: "2025",
      label: "2025",
    },
    {
      value: "2024",
      label: "2024",
    },
    {
      value: "2023",
      label: "2023",
    },
    {
      value: "2022",
      label: "2022",
    },
    {
      value: "2021",
      label: "2021",
    },
  ];
  return (
    <Card>
      <CardHeader className="flex justify-between lg:flex-row flex-col gap-5">
        <div>
          <CardTitle>Status de Rotas por Mês</CardTitle>
          <CardDescription>Dados referentes ao ano de {year}</CardDescription>
        </div>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {year
                ? years.find((framework) => framework.value === year)?.label
                : "Filtre resultado por ano..."}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput
                placeholder="Filtre resultado por ano...."
                className="h-9"
              />
              <CommandList>
                <CommandEmpty>Ano não encotrado no sistema.</CommandEmpty>
                <CommandGroup>
                  {years.map((y) => (
                    <CommandItem
                      key={y.value}
                      value={y.value}
                      onSelect={(currentValue) => {
                        setYear(currentValue === year ? year : currentValue);
                        setOpen(false);
                      }}
                    >
                      {y.label}
                      <Check
                        className={cn(
                          "ml-auto",
                          year === y.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="lg:max-h-[350px]   w-full lg:h-[350px] overflow-hidden"
        >
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="concluido" fill="var(--chart-1)" radius={4} />
            <Bar dataKey="pendente" fill="var(--chart-2)" radius={4} />
            <Bar dataKey="cancelado" fill="var(--chart-3)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Crescimento de 8.6% nas rotas este ano{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Dados acumulados de Janeiro a Dezembro de {year}
        </div>
      </CardFooter>
    </Card>
  );
}
