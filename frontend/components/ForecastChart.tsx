"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ForecastPoint {
  date: string;
  forecast: number;
  lower?: number;
  upper?: number;
}

interface ForecastChartProps {
  data: ForecastPoint[];
  metrics?: { MAE: number; RMSE: number };
  modelUsed?: string;
}

export default function ForecastChart({ data, metrics, modelUsed }: ForecastChartProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">3. Forecast Results</h2>
      
      {modelUsed && (
        <p className="text-gray-700 mb-2">
          <span className="font-medium">Model:</span> {modelUsed}
        </p>
      )}
      
      {metrics && (
        <div className="mb-4 text-sm">
          <p className="text-gray-700">
            <span className="font-medium">MAE:</span> {metrics.MAE} | 
            <span className="font-medium ml-2">RMSE:</span> {metrics.RMSE}
          </p>
        </div>
      )}

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            angle={-45} 
            textAnchor="end" 
            height={80}
            tick={{ fontSize: 12 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="forecast"
            stroke="#2563eb"
            strokeWidth={2}
            dot={{ r: 4 }}
            name="Forecast"
          />
          {data[0]?.lower !== undefined && (
            <>
              <Line
                type="monotone"
                dataKey="lower"
                stroke="#93c5fd"
                strokeWidth={1}
                strokeDasharray="5 5"
                dot={false}
                name="Lower Bound"
              />
              <Line
                type="monotone"
                dataKey="upper"
                stroke="#93c5fd"
                strokeWidth={1}
                strokeDasharray="5 5"
                dot={false}
                name="Upper Bound"
              />
            </>
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
