import winston from "winston";

export const logger = winston.createLogger({
  level: "http",
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.printf(
          ({ level, message, timestamp }) =>
            `${timestamp as string} ${level}: ${message as string}`
        )
      ),
    }),
  ],
});
