import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Checkbox, DatePicker, Divider, Form, Input, Select, Space, message } from 'antd';
import { Rule } from 'antd/es/form';
import { RangePickerProps } from 'antd/es/date-picker';
import dayjs, { Dayjs } from 'dayjs';
import type { BaseAddress, CustomerDraft } from '@commercetools/platform-sdk';
import {
  validateData,
  validateEmail,
  validateField,
  validatePassword,
  validatePostalCode,
  validateStreet,
} from '../../../../utils/validators';
import './styles.registrationForm.scss';
import useAuth from '../../../../hooks/useAuth';

interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Dayjs;
  address: BaseAddress;
  address2: BaseAddress;
}

const styleInpSpaceCompact = {
  width: '50%',
  marginBottom: 0,
};

const countryOptions = [
  { label: 'United States', value: 'US' },
  { label: 'Germany', value: 'DE' },
  { label: 'Russia', value: 'RU' },
  { label: 'France', value: 'FR' },
];

export default function RegistrationForm() {
  const [form] = Form.useForm();
  const { register } = useAuth();
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState(false);
  const [sameAddress, setSameAddress] = useState(false);
  const [addAddress, setAddAddress] = useState(false);
  const [defaultShippingAddress, setDefaultShippingAddress] = useState(false);
  const [defaultBillingAddress, setDefaultBillingAddress] = useState(false);
  const [shippingCountry, setShippingCountry] = useState('');
  const [billingCountry, setBillingCountry] = useState('');
  const navigate = useNavigate();
  // TODO: добавить инициализацию корзины

  const onFinish = async (values: FormValues) => {
    const { email, confirmPassword, firstName, lastName, dateOfBirth, address, address2 } = values;

    const addresses = [address];
    if (address2) {
      addresses.push(address2);
    }

    let newCustomer: CustomerDraft = {
      email,
      password: confirmPassword,
      firstName,
      lastName,
      dateOfBirth: dateOfBirth.format('YYYY-MM-DD'),
      addresses,
      shippingAddresses: [0],
    };

    // дополнено
    if (defaultShippingAddress) {
      newCustomer = {
        ...newCustomer,
        defaultShippingAddress: 0,
      };
    }

    if (sameAddress) {
      newCustomer = {
        ...newCustomer,
        billingAddresses: [0],
      };
    } else if (addAddress) {
      newCustomer = {
        ...newCustomer,
        billingAddresses: [1],
      };
    }

    if (defaultBillingAddress) {
      newCustomer = {
        ...newCustomer,
        defaultBillingAddress: sameAddress ? 0 : 1,
      };
    }

    setIsLoading(true);

    // добавлено регистрация по sdk
    try {
      const result = await register(newCustomer);
      console.log({ result });
      if (result.success) {
        navigate('/', {
          replace: true,
          state: {
            hi: `${result.data.firstName} ${result.data.lastName}`,
          },
        });
        localStorage.removeItem('uniqpref_935104_anonymous_session_id');
        localStorage.removeItem('uniqpref_935104_refresh_token');
        // TODO: добавить initCart
      } else {
        messageApi.open({
          type: 'error',
          content: result.message,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const validateConfirmPassword = (_: Rule, value: string) => {
    if (!value) return Promise.reject(new Error('Подтвердите пароль'));
    if (form.getFieldValue('password') === value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Пароль не совпадает'));
  };

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    const currentDate = dayjs();
    const selectedDate = dayjs(current);
    return selectedDate.isAfter(currentDate);
  };

  return (
    <>
      {contextHolder}
      <div className="container">
        <Form name="register" layout="vertical" form={form} onFinish={onFinish} size="small">
          <Form.Item
            name="email"
            label="Email"
            hasFeedback
            rules={[
              { type: 'email', message: 'Введите адрес электронной почты' },
              { required: true, message: 'Заполните поле' },
              { validator: validateEmail },
            ]}
          >
            <Input placeholder="example@email.com" />
          </Form.Item>
          <Form.Item label="Name" required>
            <Space.Compact style={{ width: '100%' }}>
              <Form.Item
                name="firstName"
                rules={[{ validator: validateField }]}
                hasFeedback
                style={styleInpSpaceCompact}
              >
                <Input placeholder="Имя" />
              </Form.Item>
              <Form.Item
                name="lastName"
                rules={[{ validator: validateField }]}
                hasFeedback
                style={styleInpSpaceCompact}
              >
                <Input placeholder="Фамилия" />
              </Form.Item>
            </Space.Compact>
          </Form.Item>
          <Form.Item name="dateOfBirth" label="Date of birth" required rules={[{ validator: validateData }]}>
            <DatePicker disabledDate={disabledDate} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="Shipping Address" required>
            <Space wrap style={{ width: '100%' }}>
              <Form.Item
                className="select-country"
                name={['address', 'country']}
                rules={[{ required: true, message: 'Выберите страну' }]}
              >
                <Select
                  placeholder="Select your country"
                  onChange={(value) => {
                    setShippingCountry(value);
                    form.setFieldsValue({
                      address: {
                        city: '',
                        streetName: '',
                        postalCode: '',
                      },
                    });
                  }}
                >
                  {countryOptions.map((country) => (
                    <Select.Option key={country.value} value={country.value}>
                      {country.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item>
                <Checkbox
                  className="check-address"
                  checked={defaultShippingAddress}
                  onChange={() => setDefaultShippingAddress(!defaultShippingAddress)}
                >
                  default Shipping Address
                </Checkbox>
              </Form.Item>
            </Space>
            <Space.Compact style={{ width: '100%' }}>
              <Form.Item name={['address', 'city']} rules={[{ validator: validateField }]} style={styleInpSpaceCompact}>
                <Input placeholder="Город" disabled={shippingCountry.length === 0} />
              </Form.Item>
              <Form.Item
                name={['address', 'streetName']}
                rules={[{ validator: validateStreet }]}
                style={styleInpSpaceCompact}
              >
                <Input placeholder="Улица" disabled={shippingCountry.length === 0} />
              </Form.Item>
              <Form.Item
                name={['address', 'postalCode']}
                rules={[{ validator: (_, value) => validatePostalCode(shippingCountry, value) }]}
                style={styleInpSpaceCompact}
              >
                <Input placeholder="Почтовый индекс" disabled={shippingCountry.length === 0} />
              </Form.Item>
            </Space.Compact>
          </Form.Item>
          <Form.Item>
            <Checkbox
              className="check-address"
              checked={sameAddress}
              onChange={() => {
                setSameAddress(!sameAddress);
                setAddAddress(false);
                form.resetFields(['address2']);
                setDefaultBillingAddress(false);
              }}
            >
              Выбрать как адрес для счетов
            </Checkbox>
            {sameAddress && (
              <Checkbox
                className="check-address"
                checked={defaultBillingAddress}
                onChange={() => setDefaultBillingAddress(!defaultBillingAddress)}
              >
                как базовый адрес для счетов
              </Checkbox>
            )}
          </Form.Item>
          {addAddress && (
            <Form.Item label="Billing Address" required>
              <Space wrap style={{ width: '100%' }}>
                <Form.Item
                  className="select-country"
                  name={['address2', 'country']}
                  rules={[{ required: true, message: 'Выберите страну' }]}
                >
                  <Select
                    placeholder="Выбрать страну"
                    onChange={(value) => {
                      setBillingCountry(value);
                      form.setFieldsValue({
                        address2: {
                          city: '',
                          streetName: '',
                          postalCode: '',
                        },
                      });
                    }}
                  >
                    {countryOptions.map((country) => (
                      <Select.Option key={country.value} value={country.value}>
                        {country.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item style={{ flex: 1 }}>
                  <Checkbox
                    className="check-address"
                    checked={defaultBillingAddress}
                    onChange={() => setDefaultBillingAddress(!defaultBillingAddress)}
                  >
                    default Billing Address
                  </Checkbox>
                </Form.Item>
              </Space>
              <Space.Compact style={{ width: '100%' }}>
                <Form.Item
                  name={['address2', 'city']}
                  rules={[{ validator: validateField }]}
                  style={styleInpSpaceCompact}
                >
                  <Input placeholder="City" disabled={billingCountry.length === 0} />
                </Form.Item>
                <Form.Item
                  name={['address2', 'streetName']}
                  rules={[{ validator: validateStreet }]}
                  style={styleInpSpaceCompact}
                >
                  <Input placeholder="Улица" disabled={billingCountry.length === 0} />
                </Form.Item>
                <Form.Item
                  name={['address2', 'postalCode']}
                  rules={[{ validator: (_, value) => validatePostalCode(billingCountry, value) }]}
                  style={styleInpSpaceCompact}
                >
                  <Input placeholder="Почтовый индекс" disabled={billingCountry.length === 0} />
                </Form.Item>
              </Space.Compact>
            </Form.Item>
          )}
          {!addAddress && (
            <Form.Item>
              <Button
                type="dashed"
                disabled={sameAddress}
                onClick={() => setAddAddress(!addAddress)}
                style={{ width: '60%' }}
              >
                Добавить адрес для счетов
              </Button>
            </Form.Item>
          )}
          <Form.Item name="password" label="Password" required rules={[{ validator: validatePassword }]} hasFeedback>
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            required
            rules={[{ validator: validateConfirmPassword }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button className="submit" size="large" type="primary" htmlType="submit" loading={isLoading}>
              Регистрация
            </Button>
          </Form.Item>
          <Divider />
          <div>
            Уже зарегестрированы? <Link to="/login">Войти</Link>
          </div>
        </Form>
      </div>
    </>
  );
}
