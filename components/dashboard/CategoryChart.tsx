"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  LineChart,
  Line,
  Cell,
} from "recharts";

interface CategoryChartProps {
  data: {
    name: string;
    value: number;
    color?: string;
  }[];
  title: string;
  type?: "pie" | "bar" | "line";
}

export const CategoryChart: React.FC<CategoryChartProps> = ({
  data,
  title,
  type = "pie",
}) => {
  const primaryColor = "var(--primary)";

  const renderChart = () => {
    switch (type) {
      case "pie":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label={({ name, percent = 0 }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {data.map((item, index) => (
                  <Cell key={index} fill={item.color || primaryColor} />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );

      case "bar":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />
              <YAxis />

              <Tooltip />

              <Bar dataKey="value" fill={primaryColor} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );

      case "line":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />
              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="value"
                stroke={primaryColor}
                strokeWidth={3}
                dot={{
                  fill: primaryColor,
                  r: 5,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <Card
      className="
        p-6
        bg-surface
        border
        border-border
        rounded-2xl
      "
    >
      <h3 className="text-xl font-semibold text-text-primary mb-5">{title}</h3>

      {data.length > 0 ? (
        renderChart()
      ) : (
        <div className="h-[300px] flex items-center justify-center">
          <p className="text-text-secondary">No data available</p>
        </div>
      )}
    </Card>
  );
};
