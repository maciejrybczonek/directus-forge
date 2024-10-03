import { EventContext } from '@directus/types/dist/events';
import { HookExtensionContext } from '@directus/extensions';
export type ExtendedFilterHandler = <T = unknown>(
    payload: T,
    meta: Record<string, any>,
    context: EventContext,
    globalContext: HookExtensionContext,
) => T | Promise<T>;

export type ExtendedActionHandler = (
    meta: Record<string, any>,
    context: EventContext,
    globalContext: HookExtensionContext,
) => void;
