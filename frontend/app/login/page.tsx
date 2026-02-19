"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple authentication - just set a flag in localStorage
    localStorage.setItem("isAuthenticated", "true");
    router.push("/dashboard");
  };

  return (
    <div className="flex-grow flex items-center justify-center relative overflow-hidden p-6 min-h-screen">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <div className="absolute inset-0 bg-background-light dark:bg-background-dark z-10 opacity-90" />
        {/* Abstract gradient background */}
        <div className="w-full h-full bg-gradient-to-br from-primary/30 via-background-dark to-background-dark opacity-40" />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-background-dark z-20 pointer-events-none" />
      </div>

      {/* Login Card Container */}
      <div className="relative z-30 w-full max-w-5xl bg-white/80 dark:bg-surface-dark/90 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        {/* Left Side: Visual / Brand Context */}
        <div className="hidden md:flex md:w-5/12 bg-primary/10 relative flex-col justify-between p-12 overflow-hidden">
          {/* Decorative Circle */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center space-x-2 mb-8">
              <div className="bg-primary p-2 rounded-lg">
                <span className="material-icons text-white text-xl">insights</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-800 dark:text-white">
                SalesForecast
              </span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
              Predictive Intelligence for Modern Business
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-8">
              Harness the power of time-series analysis to drive your growth strategy with precision.
            </p>
          </div>

          <div className="relative z-10">
            <div className="p-6 bg-white/50 dark:bg-black/20 rounded-xl border border-white/20 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Monthly Growth
                </span>
                <span className="text-green-500 flex items-center text-sm font-bold">
                  <span className="material-icons text-sm mr-1">trending_up</span> +12.4%
                </span>
              </div>
              {/* Decorative mini-chart bars */}
              <div className="flex items-end space-x-2 h-16">
                <div className="flex-1 bg-primary/30 rounded-t-sm h-[40%]" />
                <div className="flex-1 bg-primary/40 rounded-t-sm h-[60%]" />
                <div className="flex-1 bg-primary/30 rounded-t-sm h-[45%]" />
                <div className="flex-1 bg-primary/50 rounded-t-sm h-[75%]" />
                <div className="flex-1 bg-primary/40 rounded-t-sm h-[65%]" />
                <div className="flex-1 bg-primary rounded-t-sm h-[90%] shadow-[0_0_10px_rgba(43,140,238,0.5)]" />
              </div>
            </div>
          </div>

          {/* Bottom accent */}
          <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full md:w-7/12 p-8 md:p-16 flex flex-col justify-center bg-transparent">
          <div className="max-w-md mx-auto w-full">
            {/* Mobile Brand Header */}
            <div className="md:hidden flex items-center space-x-2 mb-8 justify-center">
              <div className="bg-primary p-1.5 rounded-lg">
                <span className="material-icons text-white text-lg">insights</span>
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-800 dark:text-white">
                SalesForecast
              </span>
            </div>

            <div className="text-center md:text-left mb-10">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                Welcome Back
              </h1>
              <p className="text-slate-500 dark:text-slate-400">
                Enter your credentials to access your dashboard.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="email">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-icons text-slate-400 text-xl group-focus-within:text-primary transition-colors">
                      email
                    </span>
                  </div>
                  <input
                    className="block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-[#131d27] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow sm:text-sm shadow-sm"
                    id="email"
                    name="email"
                    placeholder="name@company.com"
                    type="email"
                    defaultValue=""
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="password">
                    Password
                  </label>
                  <a className="text-sm font-medium text-primary hover:text-primary/80 transition-colors" href="#">
                    Forgot password?
                  </a>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-icons text-slate-400 text-xl group-focus-within:text-primary transition-colors">
                      lock
                    </span>
                  </div>
                  <input
                    className="block w-full pl-10 pr-10 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-[#131d27] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow sm:text-sm shadow-sm"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                    defaultValue=""
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className="material-icons text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xl transition-colors">
                      {showPassword ? "visibility" : "visibility_off"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <input
                  className="h-4 w-4 text-primary focus:ring-primary border-slate-300 dark:border-slate-600 rounded bg-slate-50 dark:bg-[#131d27]"
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                />
                <label className="ml-2 block text-sm text-slate-600 dark:text-slate-400" htmlFor="remember-me">
                  Keep me logged in for 30 days
                </label>
              </div>

              {/* Submit Button */}
              <button
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-primary hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-background-dark transition-all duration-200 shadow-[0_4px_14px_0_rgba(43,140,238,0.39)] hover:shadow-[0_6px_20px_rgba(43,140,238,0.23)] hover:-translate-y-0.5"
                type="submit"
              >
                Sign In
              </button>
            </form>

            {/* Footer / Secondary Action */}
            <div className="mt-8 text-center pt-6 border-t border-slate-200 dark:border-white/5">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Don&apos;t have an account?
                <a className="font-medium text-primary hover:text-primary/80 ml-1 transition-colors" href="#">
                  Contact Administrator
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* System Status Footer */}
      <div className="absolute bottom-4 left-0 w-full text-center z-40">
        <p className="text-xs text-slate-500 dark:text-slate-500">
          © 2024 Sales Forecast Systems. All rights reserved. <span className="mx-1">•</span>
          <span className="text-green-500 inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> System Operational
          </span>
        </p>
      </div>
    </div>
  );
}
