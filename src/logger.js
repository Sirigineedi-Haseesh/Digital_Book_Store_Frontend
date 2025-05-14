import { createLogger, format, transports } from 'winston';
import { Console } from 'winston-browser';

const logger = createLogger({
  level: 'info', // Set the default log level
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new Console(), // Logs to the browser console
    // Add other transports here (e.g., HTTP transport for sending logs to a server)
  ],
});

export default logger;