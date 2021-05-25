import {createLogger, transports, format } from 'winston';

const { combine, timestamp, printf, colorize } = format;

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
}

const level = () => {
    return isConsole() ? 'debug' : 'warn'
}

const isConsole = () => {
    const logFileEnv = ['production', 'dev']
    const env = process.env.NODE_ENV || 'local'
    return !logFileEnv.includes(env);
}

const logger = createLogger({
    level: level(),
    levels,
    format:
        combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
        printf(logFormat()),
    ),
    transports: [
        new transports.File({
            filename: 'logs/error.log',
            level: 'error',
        }),
        new transports.File({
            filename: 'logs/info.log',
            level: 'info',
        }),
        new transports.File({
            filename: 'logs/debug.log',
            level: 'debug',
        }),
    ]
})

if (isConsole()) {
    logger.add(new transports.Console({
        format: combine(
            colorize({ all: true }),
            printf(logFormat()),
        )
    }));
}

function logFormat() {
    return (info) => `[${info.level.toUpperCase()}] ${info.timestamp} - ${info.message}`;
}

export default logger
