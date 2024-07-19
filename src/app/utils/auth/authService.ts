import { Customer, CustomerDraft } from '@commercetools/platform-sdk';
import { UserAuthOptions } from '@commercetools/sdk-client-v2';
import ApiClient from '../../api-sdk/apiClient';

export type AuthResponse = { success: true; data: Customer } | { success: false; message: string };

class AuthService {
  private client: ApiClient;

  public user: Customer | null = null;

  constructor() {
    this.client = ApiClient.getInstance();
  }

  public async init() {
    console.log('>>> AuthService.init()');
    this.user = await this.client.init();
  }

  public async login(credentials: UserAuthOptions): Promise<AuthResponse> {
    console.log('>>> AuthService.signIn(credentials: UserAuthOptions)');
    // TODO: добавить работу с корзиной
    // await cartService.initCart();
    // const cartData = cartService.cart;
    try {
      this.client.switchToPasswordClient(credentials);
      const response = await this.client.requestBuilder
        .login()
        .post({
          body: {
            ...credentials,
            email: credentials.username,
            anonymousId: localStorage.getItem('uniqpref_935104_anonymous_session_id') || undefined,
            anonymousCartSignInMode: 'MergeWithExistingCustomerCart',
            updateProductData: true,
          },
        })
        .execute();
      console.log('login', { response });
      this.user = response.body.customer;

      return {
        success: true,
        data: response.body.customer,
      };
    } catch (error: unknown) {
      this.client.switchToRefreshFlow();
      console.log('login ERRROR', { error });
      return {
        success: false,
        message: `Failed to login: ${error instanceof Error ? error.message : ''}`,
      };
    }
  }

  public async register(customerDraft: CustomerDraft): Promise<AuthResponse> {
    console.log('>>> AuthService.signUp(credentials: UserAuthOptions)');
    try {
      await this.client.requestBuilder
        .customers()
        .post({
          body: customerDraft,
        })
        .execute();

      return await this.login({
        username: customerDraft.email,
        password: customerDraft.password || '',
      });
    } catch (error: unknown) {
      this.client.switchToCredentialsFlowClient();

      return {
        success: false,
        message: `Failed to register: ${error instanceof Error ? error.message : ''}`,
      };
    }
  }

  public async logout(): Promise<void> {
    console.log('>>> AuthService.signOut()');

    const accessToken = localStorage.getItem('uniqpref_935104_access_token');

    if (accessToken) {
      await ApiClient.revokeToken();
      localStorage.removeItem('uniqpref_935104_access_token');
      await this.client.switchToAnonFlow();
      this.user = await this.client.init();
    }
  }
}

export default AuthService;
