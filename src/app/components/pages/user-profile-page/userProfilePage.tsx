import { Button, Input, Descriptions } from 'antd';
import { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import ChangePasswordForm from './change-password-form/changePasswordForm';
import ChangePersonalInfoForm from './change-personal-info-form copy/changePersonalInfoForm';

// interface UserProfilePageProps {
//   title?: string; // вставить свои пропсы
// }

type Address = {
  city: string;
  country: string;
  postalCode: string;
  streetName: string;
  id: string;
};

function GenerateAddress({ address }: { address: Address }): JSX.Element {
  return (
    <div>
      <div>Город: {address.city}</div>
      <div>Страна: {address.country}</div>
      <div>Почтовый код: {address.postalCode}</div>
      <div>Улица: {address.streetName}</div>
    </div>
  );
}

export default function UserProfilePage(): JSX.Element {
  const { user, setUser } = useAuth();
  const [isEditMode, setEditMade] = useState(false);
  console.log('user', user);
  if (user === null) {
    throw new Error('user is null');
  }
  if (user.defaultBillingAddressId === undefined) {
    throw new Error('user.defaultBillingAddressId is null');
  }
  if (user.defaultShippingAddressId === undefined) {
    throw new Error('user.defaultShippingAddressId is null');
  }
  const addressesIds: string[] = [];
  user.addresses.map((address, i) => {
    if (address.id === undefined) {
      throw new Error('address.id is undefined');
    }
    addressesIds.push(address.id);
    return addressesIds;
  });
  const defaultBillingAddress = user.addresses[addressesIds.indexOf(user.defaultBillingAddressId)];
  const defaultShippingAddress = user.addresses[addressesIds.indexOf(user.defaultShippingAddressId)];
  return (
    <div>
      <div>Профиль</div>
      {!isEditMode ? (
        <Button
          onClick={() => {
            setEditMade(true);
          }}
          style={{ backgroundColor: '#FFDFBA' }}
        >
          Перейти в Режим редактирования
        </Button>
      ) : (
        <Button onClick={() => setEditMade(false)} style={{ backgroundColor: '#BAE9FF' }}>
          Перейти в Режим просмотра
        </Button>
      )}
      {isEditMode ? (
        <div style={{ backgroundColor: '#FFDFBA' }}>
          <h3>Режим редактирования</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <ChangePasswordForm />
            <ChangePersonalInfoForm />
          </div>
        </div>
      ) : (
        <div style={{ backgroundColor: '#BAE9FF', display: 'flex', flexWrap: 'wrap' }}>
          <h3 style={{ width: '100%' }}>Режим просмотра</h3>
          <div style={{ margin: '10px 20px', border: '3px solid black', padding: '10px', borderRadius: '10px' }}>
            <h4>Данные пользователя:</h4>
            <div>Имя: {user.firstName}</div>
            <div>Фамилия: {user.lastName}</div>
            <div>Дата рождения: {user.dateOfBirth}</div>
          </div>
          <div style={{ margin: '10px 20px', border: '3px solid black', padding: '10px', borderRadius: '10px' }}>
            <h4>Адреса:</h4>
            <div style={{ border: '3px solid black', padding: '10px', borderRadius: '10px' }}>
              {user.addresses.map((address, i) => (
                <div key={address.id}>
                  <h5>Адрес {i + 1}</h5>
                  <div>
                    <div>Город: {address.city}</div>
                    <div>Страна: {address.country}</div>
                    <div>Почтовый код: {address.postalCode}</div>
                    <div>Улица: {address.streetName}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ margin: '10px 20px', border: '3px solid black', padding: '10px', borderRadius: '10px' }}>
            <h3>Default Billing Address</h3>
            <div>
              <div>Город: {defaultBillingAddress.city}</div>
              <div>Страна: {defaultBillingAddress.country}</div>
              <div>Почтовый код: {defaultBillingAddress.postalCode}</div>
              <div>Улица: {defaultBillingAddress.streetName}</div>
            </div>
          </div>
          <div style={{ margin: '10px 20px', border: '3px solid black', padding: '10px', borderRadius: '10px' }}>
            <h3>Default Shipping Address</h3>
            <div>
              <div>Город: {defaultShippingAddress.city}</div>
              <div>Страна: {defaultShippingAddress.country}</div>
              <div>Почтовый код: {defaultShippingAddress.postalCode}</div>
              <div>Улица: {defaultShippingAddress.streetName}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// удалить заглушку при необходимости
// UserProfilePage.defaultProps = {
//   title: 'UserProfilePage',
// };
