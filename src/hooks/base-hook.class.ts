import { ExtendedActionHandler, ExtendedFilterHandler } from '../types';

export class BaseHook {
    getMethod(methodName: string): ExtendedFilterHandler | ExtendedActionHandler | undefined {
        if (typeof (this as any)[methodName] === 'function') {
            return (this as any)[methodName];
        } else {
            console.error(`Method not found: ${methodName}`);
        }
        return;
    }
}
