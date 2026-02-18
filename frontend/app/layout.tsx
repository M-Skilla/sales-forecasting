import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sales Forecasting System",
  description: "Time series sales forecasting with ARIMA and Prophet",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
