import { CustomerDraft } from '@commercetools/platform-sdk';
import dayjs, { Dayjs } from 'dayjs';

const authUrl = 'https://auth.europe-west1.gcp.commercetools.com';
const hostUrl = 'https://api.europe-west1.gcp.commercetools.com';
const clientId = 'nzAyqe_yF9B-UZ3oEPCY8nL9';
const clientSecret = 'FTsQG9qg_rhwm005prhJqsXfx1YS-mmW';
const productKey = '/pnc-ecommerce-app';
const tokenEndpoint = '/oauth/token';

export async function getToken() {
  try {
    const response = await fetch(authUrl + tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      },
      body: 'grant_type=client_credentials',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching token:', error);
    throw error;
  }
}

export async function getOrSaveToken() {
  const authDataFromLocalStorage = localStorage.getItem('authData_point&click');
  if (authDataFromLocalStorage === null) {
    const gettedAuthData = await getToken();
    localStorage.setItem('authData_point&click', JSON.stringify(gettedAuthData));
    return gettedAuthData;
  }
  return JSON.parse(authDataFromLocalStorage);
}

interface AddressesSettings {
  isDefaultShipping: boolean;
  isSameAddresses: boolean;
  isDefaultBilling: boolean;
}

function takeAddressesIds(addresses: [{ id: string }]): string[] {
  const ids = [];
  for (let i = 0; i < addresses.length; i += 1) {
    ids.push(addresses[i].id);
  }
  return ids;
}

interface Actions {
  action: string;
  addressId: string;
}

function generateActions(ids: string[], addressesSettings: AddressesSettings): Actions[] {
  const actions = [
    {
      action: 'addShippingAddressId',
      addressId: ids[0],
    },
  ];
  if (addressesSettings.isSameAddresses) {
    actions.push({
      action: 'addBillingAddressId',
      addressId: ids[0],
    });
    if (addressesSettings.isDefaultBilling) {
      actions.push({
        action: 'setDefaultBillingAddress',
        addressId: ids[0],
      });
      actions.push({
        action: 'setDefaultShippingAddress',
        addressId: ids[0],
      });
    }
  } else {
    actions.push({
      action: 'addBillingAddressId',
      addressId: ids[1],
    });
    if (addressesSettings.isDefaultBilling) {
      actions.push({
        action: 'setDefaultBillingAddress',
        addressId: ids[1],
      });
    }
  }
  return actions;
}

export async function loginCustomer(
  access_token: string,
  userLoginData: { email: string; password: string | undefined },
) {
  const response = await fetch(`${hostUrl + productKey}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify(userLoginData),
  });
  const data = await response.json();
  return data;
}

export async function setAddress(access_token: string, userData: { id: string; version: string; actions: Actions[] }) {
  const response = await fetch(`${hostUrl + productKey}/customers/${userData.id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify({
      version: userData.version,
      actions: userData.actions,
    }),
  });
  const data = await response.json();
  return data;
}

export async function registerCustomer(
  access_token: string,
  values: CustomerDraft,
  addressesSettings: AddressesSettings,
) {
  const response = await fetch(`${hostUrl + productKey}/customers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify({
      email: values.email,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
      dateOfBirth: values.dateOfBirth,
      addresses: values.addresses,
    }),
  });
  const registerResponse = await response.json();
  const customerData = registerResponse.customer;
  const addressesIdsTaken = takeAddressesIds(customerData.addresses);
  await setAddress(access_token, {
    id: customerData.id,
    version: customerData.version,
    actions: generateActions(addressesIdsTaken, addressesSettings),
  });
  loginCustomer(access_token, { email: values.email, password: values.password });
  return registerResponse;
}

export async function queryProducts(access_token: string) {
  const response = await fetch(`${hostUrl + productKey}/products`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
  });
  const data = await response.json();
  return data.results;
}

export async function getProductById(access_token: string, id: string) {
  const response = await fetch(`${hostUrl + productKey}/products/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
  });
  const data = await response.json();
  return data;
}

export async function changePassword(
  access_token: string,
  id: string,
  version: number,
  userData: { passwordOld: string; passwordNew: string },
) {
  const response = await fetch(`${hostUrl + productKey}/customers/password`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
      version,
      currentPassword: userData.passwordOld,
      newPassword: userData.passwordNew,
    }),
  });
  const data = await response.json();
  return data;
}

export async function changePersonalInfo(
  access_token: string,
  customerId: string,
  customerVersion: number,
  changeData: {
    firstName: string;
    lastName: string;
    dateOfBirth: Dayjs;
    email: string;
  },
) {
  const url = `${hostUrl + productKey}/customers/${customerId}`;

  const dateBirth = new Date(String(changeData.dateOfBirth));
  console.log(dateBirth.getFullYear(), dateBirth.getMonth(), dateBirth.getDate());
  const formatedDateBirth = `${dateBirth.getFullYear()}-${dateBirth.getMonth() + 1}-${dateBirth.getDate()}`;

  const body = {
    version: customerVersion,
    actions: [
      {
        action: 'setFirstName',
        firstName: changeData.firstName,
      },
      {
        action: 'setLastName',
        lastName: changeData.lastName,
      },
      {
        action: 'setDateOfBirth',
        dateOfBirth: formatedDateBirth,
      },
      {
        action: 'changeEmail',
        email: changeData.email,
      },
    ],
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  console.log('body', body);
  return data;
}
