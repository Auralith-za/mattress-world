import {
  createRequestHandler,
  getStorefrontHeaders,
  type AppLoadContext,
} from '@shopify/remix-oxygen';
import {createStorefrontClient, storefrontRedirect} from '@shopify/hydrogen';
import * as remixBuild from 'virtual:remix/server-build';

export default {
  async fetch(
    request: Request,
    env: Env,
    executionContext: ExecutionContext,
  ): Promise<Response> {
    try {
      const {storefront} = createStorefrontClient({
        cache: await caches.open('hydrogen'),
        waitUntil: executionContext.waitUntil.bind(executionContext),
        i18n: {language: 'EN', country: 'ZA'},
        publicStorefrontToken: env.PUBLIC_STOREFRONT_API_TOKEN,
        privateStorefrontToken: env.PRIVATE_STOREFRONT_API_TOKEN,
        storeDomain: env.PUBLIC_STORE_DOMAIN,
        storefrontApiVersion: env.PUBLIC_STOREFRONT_API_VERSION || '2024-04',
        storefrontHeaders: getStorefrontHeaders(request),
      });

      const handleRequest = createRequestHandler({
        build: remixBuild,
        mode: 'production',
        getLoadContext: (): AppLoadContext => ({
          session: null as any,
          storefront,
          env,
          waitUntil: executionContext.waitUntil.bind(executionContext),
        }),
      });

      const response = await handleRequest(request);

      if (response.status === 404) {
        return storefrontRedirect({request, response, storefront});
      }

      return response;
    } catch (error) {
      console.error(error);
      return new Response('An unexpected error occurred', {status: 500});
    }
  },
};
