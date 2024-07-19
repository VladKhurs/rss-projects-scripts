import { Button, Divider, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword } from '../../../../utils/validators';
import { getOrSaveToken, changePassword } from '../../../../utils/api';
import './styles.changePasswordForm.scss';
import useAuth from '../../../../hooks/useAuth';

type Fields = {
  password1: string;
  password2: string;
};

type ChangePasswordOptions = {
  passwordOld: string;
  passwordNew: string;
};

export default function ChangePasswordForm(): JSX.Element {
  const { user, setUser } = useAuth();
  if (user == null) {
    throw new Error('user is null');
  }
  const [messageApi, contextHolder] = message.useMessage({ maxCount: 1 });
  const onFinish = async (values: Fields) => {
    const authorizationData = await getOrSaveToken();
    const changePasswordData: ChangePasswordOptions = { passwordOld: values.password1, passwordNew: values.password2 };
    // TODO: добавить инициализацию корзины
    const result = await changePassword(authorizationData.access_token, user.id, user.version, changePasswordData);
    console.log('authorizationData.access_token', authorizationData.access_token);
    console.log('result', result);
    if (result.email) {
      setUser(result);
      messageApi.open({
        type: 'success',
        content: 'Пароль был изменен успешно',
        duration: 2,
      });
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
      <h3>Поменять пароль</h3>
      <Form className="form" name="login_form" layout="vertical" initialValues={{ remember: true }} onFinish={onFinish}>
        {contextHolder}
        <Form.Item<Fields>
          className="formItem"
          label="Старый пароль"
          name="password1"
          rules={[{ required: true, message: 'Введите старый пароль' }, { validator: validatePassword }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<Fields>
          className="formItem"
          label="Новый пароль"
          name="password2"
          rules={[{ required: true, message: 'Введите новый пароль' }, { validator: validatePassword }]}
        >
          <Input.Password />
        </Form.Item>
        <Button className="submit" type="primary" htmlType="submit">
          Поменять пароль
        </Button>
      </Form>
    </div>
  );
}
