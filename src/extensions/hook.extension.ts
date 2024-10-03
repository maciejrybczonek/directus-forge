import { HookExtensionContext } from '@directus/extensions';
import { ExtendedFilterHandler, ExtendedActionHandler } from '../types';
import { HOOK_EVENT_METADATA, HOOK_PATH_METADATA, HOOK_TYPE_METADATA } from '../utils/constants';
import { ActionHandler, FilterHandler } from '@directus/types';

export const initHooks = ({
    hooks,
    filter,
    action,
    globalContext,
}: {
    hooks: { new (...args: any[]): any }[];
    filter: <T = unknown>(event: string, handler: FilterHandler<T>) => void;
    action: (event: string, handler: ActionHandler) => void;
    globalContext: HookExtensionContext;
}) => {
    hooks.forEach((hookClass) => {
        const methods = Object.getOwnPropertyNames(hookClass.prototype);
        const hookPath = Reflect.getMetadata(HOOK_PATH_METADATA, hookClass);
        const hookInstance = new hookClass();

        methods.forEach((methodName) => {
            if (methodName !== 'constructor') {
                const hookMethod = hookInstance.getMethod(methodName);
                if (!hookMethod) {
                    return;
                }
                const hookEvent = Reflect.getMetadata(HOOK_EVENT_METADATA, hookMethod);
                const hookType = Reflect.getMetadata(HOOK_TYPE_METADATA, hookMethod);

                if (hookType === 'filter') {
                    filter(`${hookPath}.${hookEvent}`, (payload, meta, context) =>
                        (hookMethod as ExtendedFilterHandler)(payload, meta, context, globalContext),
                    );
                } else {
                    action(`${hookPath}.${hookEvent}`, (meta, context) =>
                        (hookMethod as ExtendedActionHandler)(meta, context, globalContext),
                    );
                }
            }
        });
    });
};
