import { Response } from 'express';

export class BaseController {
    getMethod(methodName: string): Function | undefined {
        if (typeof (this as any)[methodName] === 'function') {
            return (this as any)[methodName];
        } else {
            console.error(`Method not found: ${methodName}`);
        }
        return;
    }

    handleErrors(res: Response, error: any) {
        res.status(500).json({
            error,
        });
    }
}
