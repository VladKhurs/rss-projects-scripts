/**
 * Описание:
 * Конструктор вызывается при создании синглтон инстанса apiClient.
 *  В конструкторе происходит создание трех типов клиентов:
 *    - credentialsFlowClient - клиент без аутентификации под customer и без аутентификации анонимной сессии
 *    - anonymousFlowClient - клиент с настройками под анонимную сессию
 *    - refreshFlowAnonymousClient - клиент с настройками для обновления токена анонимной сессии
 */

import { Client, ClientBuilder, UserAuthOptions } from '@commercetools/sdk-client-v2';
import { Customer, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import ApiClientOptions from './apiClientOptions';
import settings from '../const/settings';

const { projectKey, authUrl, clientId, clientSecret } = settings;

class ApiClient {
  private static instance: ApiClient;

  private credentialsFlowClient: Client;

  private anonymousFlowClient: Client;

  private refreshFlowAnonymousClient: Client;

  private currentClient: Client;

  /**
   * в конструкторе делается инициализация различных вариантов клиента и в конце на основании состояния хранимых в localStorage
   * access_token и refresh_token делается выбор текущего используемого apiClient с соответствующим flow.
   */
  constructor() {
    const anonymousSessionId = localStorage.getItem('uniqpref_935104_anonymous_session_id');
    const accessToken = localStorage.getItem('uniqpref_935104_access_token');

    /* обычный flow (без инициализации конкретного  пользователя и безанонимной сессии) */
    this.credentialsFlowClient = new ClientBuilder()
      .withProjectKey(projectKey)
      .withClientCredentialsFlow(ApiClientOptions.getClientCredentialOptions())
      .withHttpMiddleware(ApiClientOptions.getHttpOptions())
      .build();

    /* клиент анонимного flow */
    this.anonymousFlowClient = new ClientBuilder()
      .withProjectKey(projectKey)
      .withAnonymousSessionFlow(ApiClientOptions.getAnonymousAuthCredentialOptions())
      .withHttpMiddleware(ApiClientOptions.getHttpOptions())
      .build();

    // TODO: возможно распространить рефреш токена ананимного клиента и на customer
    /* refresh flow */
    this.refreshFlowAnonymousClient = new ClientBuilder()
      .withProjectKey(projectKey)
      .withRefreshTokenFlow(ApiClientOptions.getRefreshAuthCredentialOptions())
      .withHttpMiddleware(ApiClientOptions.getHttpOptions())
      .build();

    /* блок выбора типа клиента первый раз при инициализации (далее делаются дополнительные выборы) */

    if (!anonymousSessionId && !accessToken) {
      /* анонимная сессия не создавалась ранее (!anonymousSessionId) и аутентификация customer не выполнялась (!accessToken)
        переходим на клиента anonymous flow для созадания анонимной сессии и последующей работы с ней */
      this.currentClient = this.anonymousFlowClient;
    } else if (anonymousSessionId && accessToken) {
      /* ранее создавалось анонимная сессия (anonymousSessionId), и был получен анонимный токен для нее (accessToken)
        переходим на клиента обновления токена аннонимного доступа (для его освежения) */
      this.currentClient = this.refreshFlowAnonymousClient;
    } else if (!anonymousSessionId && accessToken) {
      /* работа в анонимной сессии не велась (!anonymousSessionId), но была аутентификация под customer т.к. есть token (accessToken)
        входим под конкретным customer но без необходимости ввода пароля (используется access_token) */
      this.currentClient = this.credentialsFlowClient;
    } else {
      /* во всех остальных случаях выбираем клиента для создания новой анонимную сессии */
      this.currentClient = this.anonymousFlowClient;
    }

    // TODO: удалить после отладки всех действий связанных с аутентификацией
    /* ************* */
    console.log('>>> this.currentClient = (ApiClient constructor)');
    console.log(
      'currentClient = this.credentialsFlowClient: (none | customer)',
      this.currentClient === this.credentialsFlowClient,
    ); // залогинен под customer
    console.log(
      'currentClient = this.anonymousFlowClient: (anonymous)',
      this.currentClient === this.anonymousFlowClient,
    ); // первично
    console.log(
      'currentClient = this.refreshFlowAnonymousClient: (refresh: init)',
      this.currentClient === this.refreshFlowAnonymousClient,
    ); // вторично и если разлогинится (последнее возможно не правильно)
    console.log(
      `Состояние localStorage # access_token: ${localStorage.getItem(
        'uniqpref_935104_access_token',
      )}, anonymous_session_id: ${localStorage.getItem('uniqpref_935104_anonymous_session_id')}`,
    );
    /* ************* */
  }

  /**
   * Возвращает синглтон инстанс ApiClient
   * @returns instance: ApiClient
   */
  public static getInstance() {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }

    return ApiClient.instance;
  }

  /**
   * Возвращает ApiRoot объект для дальнейшей работы с api eCommerce:
   * передача endpoint, типа запроса, параметров запроса и запуска запроса на выполнение.
   */
  public get requestBuilder() {
    return createApiBuilderFromCtpClient(this.currentClient).withProjectKey({ projectKey });
  }

  /**
   * Инициализация ApiClient (вызывается при инициализации службы аутентификация и в конце logout)
   * Производятся непосредственные попытки соединений с сервером на базе настроек клиентов под различные flow
   * Если они не оканчиваются успехом, то делаются соответствующие переключения текущего клиента
   */
  public async init(): Promise<Customer | null> {
    const accessToken = localStorage.getItem('uniqpref_935104_access_token');
    const anonymousSessionId = localStorage.getItem('uniqpref_935104_anonymous_session_id');

    if (accessToken && !anonymousSessionId) {
      // есть токен, но сессия не анонимная (пользователь был залогинен ранее)
      try {
        this.switchToAccessTokenClient();
        const loginResult = await this.requestBuilder.me().get().execute();
        return loginResult.body;
      } catch {
        this.switchToCredentialsFlowClient();
      }
    } else if (!accessToken && anonymousSessionId) {
      try {
        await this.requestBuilder.get().execute();
      } catch {
        this.switchToCredentialsFlowClient();
      }
    }

    return null;
  }

  public static async revokeToken(): Promise<void> {
    console.log('> ApiClient > revokeToken()');
    const accessTokenToRevoke = localStorage.getItem('uniqpref_935104_access_token');

    try {
      await fetch(`${authUrl}/oauth/token/revoke`, {
        method: 'POST',
        body: `token=${accessTokenToRevoke}&token_type_hint=access_token`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${window.btoa(`${clientId}:${clientSecret}`)}`,
        },
      });
    } catch (error: unknown) {
      console.log(`Failed to revoke token: ${error instanceof Error ? error.message : ''}`);
      if (error instanceof Error) console.error(error.message);
    }
  }

  public switchToAccessTokenClient(): void {
    console.log('> ApiClient > switchToAccessTokenClient()');

    const accessToken = localStorage.getItem('uniqpref_935104_access_token');
    this.currentClient = new ClientBuilder()
      .withProjectKey(projectKey)
      .withExistingTokenFlow(`Bearer ${accessToken}`, { force: true })
      .withHttpMiddleware(ApiClientOptions.getHttpOptions())
      .build();
  }

  public switchToPasswordClient(user: UserAuthOptions): void {
    console.log('> ApiClient > switchToPasswordClient(user: UserAuthOptions)');
    this.currentClient = new ClientBuilder()
      .withProjectKey(projectKey)
      .withPasswordFlow(ApiClientOptions.getPasswordAuthOptions(user))
      .withHttpMiddleware(ApiClientOptions.getHttpOptions())
      .build();
  }

  public switchToCredentialsFlowClient(): void {
    console.log('> ApiClient > credentialsFlowClient()');
    this.currentClient = this.credentialsFlowClient;
  }

  public async switchToAnonFlow(): Promise<void> {
    console.log('> ApiClient > switchToAnonFlow()');
    this.currentClient = new ClientBuilder()
      .withProjectKey(projectKey)
      .withAnonymousSessionFlow(ApiClientOptions.getAnonymousAuthCredentialOptions())
      .withHttpMiddleware(ApiClientOptions.getHttpOptions())
      .build();
  }

  public async switchToRefreshFlow(): Promise<void> {
    console.log('> ApiClient > switchToRefreshFlow()');
    this.currentClient = new ClientBuilder()
      .withProjectKey(projectKey)
      .withRefreshTokenFlow(ApiClientOptions.getRefreshAuthCredentialOptions())
      .withHttpMiddleware(ApiClientOptions.getHttpOptions())
      .build();
  }
}

export default ApiClient;
