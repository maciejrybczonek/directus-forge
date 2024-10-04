import { METHOD_METADATA, PATH_METADATA } from '../utils/constants';
import { RequestMethod, RequestContext } from '../types';
import { EndpointExtensionContext } from '@directus/extensions';
import { NextFunction, Request, Response, Router } from 'express';
import { DependencyContainer } from 'tsyringe';
import { BaseController } from '../controllers/base-controller.class';

const createContextMiddleware = (context: EndpointExtensionContext) => {
    return (req: Request, res: Response, next: NextFunction) => {
        (req as RequestContext).context = context;
        next();
    };
};

export const initEndpoints = async <T extends BaseController>({
    controllers,
    router,
    context,
    container,
}: {
    controllers: { new (...args: unknown[]): T }[];
    router: Router;
    context: EndpointExtensionContext;
    container: DependencyContainer;
}) => {
    controllers.forEach((controllerClass) => {
        const methods = Object.getOwnPropertyNames(controllerClass.prototype);
        const controllerInstance = container.resolve(controllerClass);
        const controllerPath = Reflect.getMetadata(PATH_METADATA, controllerClass);
        router.use(createContextMiddleware(context));

        methods.forEach((methodName) => {
            if (methodName !== 'constructor') {
                const controllerMethod = controllerInstance.getMethod(methodName);
                if (!controllerMethod) {
                    return;
                }
                const methodPath = Reflect.getMetadata(PATH_METADATA, controllerMethod);
                const requestMethod = Reflect.getMetadata(METHOD_METADATA, controllerMethod);

                if (requestMethod === undefined) return;
                const methodMap = {
                    [RequestMethod.GET]: router.get,
                    [RequestMethod.POST]: router.post,
                    [RequestMethod.PUT]: router.put,
                    [RequestMethod.PATCH]: router.patch,
                    [RequestMethod.DELETE]: router.delete,
                    [RequestMethod.HEAD]: router.head,
                    [RequestMethod.OPTIONS]: router.options,
                    [RequestMethod.SEARCH]: router.search,
                    [RequestMethod.ALL]: router.all,
                };
                const routeHandler = methodMap[requestMethod as RequestMethod];
                if (routeHandler) {
                    routeHandler.bind(router)(controllerPath + methodPath, controllerMethod.bind(controllerInstance));
                }
            }
        });
    });
};
