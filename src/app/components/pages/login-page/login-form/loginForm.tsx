import { Button, Divider, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuthOptions } from '@commercetools/sdk-client-v2';
import { validateEmail, validatePassword } from '../../../../utils/validators';
import { getOrSaveToken, loginCustomer } from '../../../../utils/api';
import './styles.loginForm.scss';
import useAuth from '../../../../hooks/useAuth';

type Fields = {
  email: string;
  password: string;
};

// const authorizationData = await getOrSaveToken();

export default function LoginForm(): JSX.Element {
  const [messageApi, contextHolder] = message.useMessage({ maxCount: 1 });
  const { login } = useAuth();
  const navigate = useNavigate();
  const onFinish = async (values: Fields) => {
    const userLoginData: UserAuthOptions = { username: values.email, password: values.password };
    // TODO: добавить инициализацию корзины
    const result = await login(userLoginData);
    if (result.success) {
      navigate('/', {
        replace: true,
        state: { hi: `${result.data.firstName} ${result.data.lastName}` },
      });
      // TODO: initCart
    } else {
      messageApi.open({
        type: 'error',
        content: result.message,
        duration: 2,
      });
    }
  };
  return (
    <div className="container">
      <Form className="form" name="login_form" layout="vertical" initialValues={{ remember: true }} onFinish={onFinish}>
        {contextHolder}
        <Form.Item<Fields>
          className="formItem"
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Введите Вашу эл.почту' }, { validator: validateEmail }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<Fields>
          className="formItem"
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Введите пароль' }, { validator: validatePassword }]}
        >
          <Input.Password />
        </Form.Item>
        <Button className="submit" type="primary" htmlType="submit">
          Вход
        </Button>
        <Divider />
        <div className="register-offer">
          Ещё нет аккаунта?<Link to="/registration">Зарегистрироваться</Link>
        </div>
      </Form>
    </div>
  );
}
