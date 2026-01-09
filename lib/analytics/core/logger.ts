// lib/analytics/core/logger.ts

import { analyticsConfig } from './config';

export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

class AnalyticsLogger {
  private static instance: AnalyticsLogger;
  private logs: Array<{ level: LogLevel; message: string; data?: any; timestamp: number }> = [];
  private maxLogs = 100;

  private constructor() {}

  public static getInstance(): AnalyticsLogger {
    if (!AnalyticsLogger.instance) {
      AnalyticsLogger.instance = new AnalyticsLogger();
    }
    return AnalyticsLogger.instance;
  }

  private shouldLog(): boolean {
    return analyticsConfig.shouldDebug();
  }

  private addLog(level: LogLevel, message: string, data?: any): void {
    const logEntry = {
      level,
      message,
      data,
      timestamp: Date.now(),
    };

    this.logs.push(logEntry);

    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }
  }

  public debug(message: string, data?: any): void {
    this.addLog(LogLevel.DEBUG, message, data);
    if (this.shouldLog()) {
      console.log('[Analytics Debug] ' + message, data || '');
    }
  }

  public info(message: string, data?: any): void {
    this.addLog(LogLevel.INFO, message, data);
    if (this.shouldLog()) {
      console.info('[Analytics Info] ' + message, data || '');
    }
  }

  public warn(message: string, data?: any): void {
    this.addLog(LogLevel.WARN, message, data);
    if (this.shouldLog()) {
      console.warn('[Analytics Warning] ' + message, data || '');
    }
  }

  public error(message: string, error?: any): void {
    this.addLog(LogLevel.ERROR, message, error);
    if (this.shouldLog()) {
      console.error('[Analytics Error] ' + message, error || '');
    }
  }

  public getLogs(): typeof this.logs {
    return [...this.logs];
  }

  public clearLogs(): void {
    this.logs = [];
  }
}

export const logger = AnalyticsLogger.getInstance();