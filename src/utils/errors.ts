import { createError, DirectusErrorConstructor } from '@directus/errors';
import { Response } from 'express';

export const InternalServerError = createError('INTERNAL_SERVER_ERROR', 'Server error occurred', 500);
export const ForbiddenError = createError('FORBIDDEN', 'You are not allowed to do the current action', 403);
export const InsufficientFundsError = createError('INSUFFICIENT_FUNDS', 'You do not have enough credits', 422);
export const NotFoundError = createError('NOT_FOUND', 'Not found', 404);
export const UnauthorizedError = createError('UNAUTHORIZED', 'You are not authenticated to perform this action', 401);
export const InvalidPayloadError = createError('INVALID_PAYLOAD', 'Invalid payload', 400);

export const endpointError = (res: Response, error: DirectusErrorConstructor) => {
    const errorInstance = new error();
    res.status(errorInstance.status);
    return res.json({
        ...errorInstance,
    });
};
