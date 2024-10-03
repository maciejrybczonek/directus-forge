import { HOOK_PATH_METADATA, HOOK_EVENT_METADATA, HOOK_TYPE_METADATA } from '../utils/constants';

export const Hook = (path: string): ClassDecorator => {
    return (target: object) => {
        Reflect.defineMetadata(HOOK_PATH_METADATA, path, target);
    };
};

export const HookEvent = (event: string, type: string): MethodDecorator => {
    return (target: object, key: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
        Reflect.defineMetadata(HOOK_EVENT_METADATA, event, descriptor.value);
        Reflect.defineMetadata(HOOK_TYPE_METADATA, type, descriptor.value);
        return descriptor;
    };
};
