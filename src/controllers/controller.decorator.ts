import 'reflect-metadata';
import { PATH_METADATA } from '../utils/constants';
import { Request, Response } from 'express';

export const Controller = (path?: string): ClassDecorator => {
    return (target: object) => {
        Reflect.defineMetadata(PATH_METADATA, path ? '/' + path : '', target);
    };
};

export const CatchError = (target: never, propertyName: string, descriptor: PropertyDescriptor): void => {
    const originalMethod = descriptor.value;
    descriptor.value = async function (req: Request, res: Response) {
        try {
            return await originalMethod.apply(this, [req, res]);
        } catch (error) {
            console.error('### Error', error);
            res.status(500).json({
                error,
            });
        }
    };
};
