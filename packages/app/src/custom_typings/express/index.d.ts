declare global {
    namespace Express {
        interface Request {
            proxyServer: string
        }
    }
}

export {};
