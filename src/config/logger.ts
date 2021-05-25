import winston from 'winston';

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
}

const level = () => {
    const logFileEnv = ['production', 'dev']
    const env = process.env.NODE_ENV || 'local'
    return logFileEnv.includes(env) ? 'debug' : 'warn'
}

winston.addColors({
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
})

const Logger = winston.createLogger({
    level: level(),
    levels,
    format:
        winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
        winston.format.colorize({ all: true }),
        winston.format.printf(
            (info) => `${info.timestamp} ${info.level}: ${info.message}`,
        ),
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error',
        }),
        new winston.transports.File({
            filename: 'info/info.log',
            level: 'info',
        }),
        new winston.transports.File({ filename: 'logs/all.log' }),
    ]
})

export default Logger
