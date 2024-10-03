import { Request } from 'express';
import { EndpointExtensionContext } from '@directus/extensions';
import { Accountability } from '@directus/types';

export interface RequestContext extends Request {
    context: EndpointExtensionContext;
    accountability?: Accountability;
    rawBody?: any;
}
