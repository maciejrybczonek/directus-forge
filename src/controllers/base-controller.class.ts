import { Response } from 'express';

export class BaseController {
    getMethod(methodName: string): (() => unknown) | undefined {
        if (typeof (this as never)[methodName] === 'function') {
            return (this as never)[methodName];
        } else {
            console.error(`Method not found: ${methodName}`);
        }
        return;
    }

    handleErrors(res: Response, error: unknown) {
        res.status(500).json({
            error,
        });
    }
}
