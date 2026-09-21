import { Request, Response, NextFunction } from 'express';

export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  const start = Date.now();
  const timestamp = new Date().toISOString();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const { method, originalUrl } = req;
    const { statusCode } = res;

    let statusColor = '\x1b[32m'; // green
    if (statusCode >= 400 && statusCode < 500) {
      statusColor = '\x1b[33m'; // yellow
    } else if (statusCode >= 500) {
      statusColor = '\x1b[31m'; // red
    }

    const resetColor = '\x1b[0m';
    const cyan = '\x1b[36m';
    const gray = '\x1b[90m';

    console.log(
      `${gray}[${timestamp}]${resetColor} ${cyan}${method.padEnd(6)}${resetColor} ${originalUrl} ${statusColor}${statusCode}${resetColor} - ${duration}ms`
    );
  });

  next();
};
