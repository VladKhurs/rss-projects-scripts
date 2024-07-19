import {
  AnonymousAuthMiddlewareOptions,
  AuthMiddlewareOptions,
  HttpMiddlewareOptions,
  PasswordAuthMiddlewareOptions,
  RefreshAuthMiddlewareOptions,
  UserAuthOptions,
} from '@commercetools/sdk-client-v2';
import settings from '../const/settings';

const { apiUrl, authUrl, projectKey, clientId, clientSecret, scopes } = settings;

class ApiClientOptions {
  private static advancedFetcher = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const response = await fetch(input, init);
    /**
     * clone() использован, т.к. response передается дальше, и если не использовать клонирование
     * то json() будучи асинхронной операцией откроет поток и последующий json() не сможет отработать
     * т.к. возникнет ошибка обращения к уже отрытому stream (открытому еще незавершенным json)
     */
    const json = await response.clone().json();

    if (json.access_token) {
      localStorage.setItem('uniqpref_935104_access_token', json.access_token);
    }
    if (json.refresh_token) {
      localStorage.setItem('uniqpref_935104_refresh_token', json.refresh_token);
    }

    return response;
  };

  public static getClientCredentialOptions(): AuthMiddlewareOptions {
    return {
      host: authUrl,
      projectKey,
      credentials: {
        clientId,
        clientSecret,
      },
      scopes: scopes.split(' '),
      fetch,
    };
  }

  public static getHttpOptions(): HttpMiddlewareOptions {
    return {
      host: apiUrl,
      fetch,
    };
  }

  public static getPasswordAuthOptions(user: UserAuthOptions): PasswordAuthMiddlewareOptions {
    return {
      host: authUrl,
      projectKey,
      credentials: {
        clientId,
        clientSecret,
        user,
      },
      scopes: scopes.split(' '),
      fetch: ApiClientOptions.advancedFetcher, // fetch c добавкой кода которая достает токен из ответа и сохраняет в localStorage
    };
  }

  public static getAnonymousAuthCredentialOptions(): AnonymousAuthMiddlewareOptions {
    const accessToken = localStorage.getItem('uniqpref_935104_access_token');

    /* если нет accessToken, то сессия создается первый раз и следует создать  anonymous_session_id для сессии новой */
    if (!accessToken) {
      localStorage.setItem('uniqpref_935104_anonymous_session_id', crypto.randomUUID());
    }

    /* при каждом запросе инициализации anonymous flow
     с помощью ApiClientOptions.advancedFetcher производится обновление access_token и refresh_token */
    const anonymousSessionId = localStorage.getItem('uniqpref_935104_anonymous_session_id');
    const credentials = { clientId, clientSecret, anonId: anonymousSessionId };
    const options: AnonymousAuthMiddlewareOptions = {
      host: authUrl,
      projectKey,
      credentials,
      scopes: scopes.split(' '),
      fetch: ApiClientOptions.advancedFetcher,
    };

    return options;
  }

  public static getRefreshAuthCredentialOptions(): RefreshAuthMiddlewareOptions {
    const refreshToken = localStorage.getItem('uniqpref_935104_refresh_token') as string;

    const credentials = { clientId, clientSecret };
    const options: RefreshAuthMiddlewareOptions = {
      host: authUrl,
      projectKey,
      credentials,
      refreshToken,
      fetch: ApiClientOptions.advancedFetcher,
    };

    return options;
  }
}

export default ApiClientOptions;
