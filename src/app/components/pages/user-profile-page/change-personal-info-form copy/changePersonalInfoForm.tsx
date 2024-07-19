import { Button, Space, DatePicker, Form, Input, message } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import dayjs, { Dayjs } from 'dayjs';
import { validateField, validateData, validateEmail } from '../../../../utils/validators';
import { getOrSaveToken, changePersonalInfo } from '../../../../utils/api';
import useAuth from '../../../../hooks/useAuth';
import './changePersonalInfoForm.scss';

type FormValues = {
  firstName: string;
  lastName: string;
  dateOfBirth: Dayjs;
  email: string;
};

const styleInpSpaceCompact = {
  width: '50%',
  marginBottom: 0,
};

export default function ChangePersonalInfoForm(): JSX.Element {
  const { user, setUser } = useAuth();
  const [form] = Form.useForm();
  const { register } = useAuth();
  if (user == null) {
    throw new Error('user is null');
  }
  const [messageApi, contextHolder] = message.useMessage({ maxCount: 1 });
  const onFinish = async (values: FormValues) => {
    const authorizationData = await getOrSaveToken();
    const changePersolalInfoData: FormValues = {
      firstName: values.firstName,
      lastName: values.lastName,
      dateOfBirth: values.dateOfBirth,
      email: values.email,
    };
    // TODO: добавить инициализацию корзины
    const result = await changePersonalInfo(
      authorizationData.access_token,
      user.id,
      user.version,
      changePersolalInfoData,
    );
    console.log('authorizationData.access_token', authorizationData.access_token);
    console.log('result', result);
    if (result.email) {
      setUser(result);
      messageApi.open({
        type: 'success',
        content: 'Личные данные успешно изменены',
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

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    const currentDate = dayjs();
    const selectedDate = dayjs(current);
    return selectedDate.isAfter(currentDate);
  };

  return (
    <div className="container">
      <h3>Поменять личные данные</h3>
      <Form
        className="form"
        name="change_personal_info_form"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        {contextHolder}
        <Form.Item label="Name" required>
          <Space.Compact style={{ width: '100%' }}>
            <Form.Item name="firstName" rules={[{ validator: validateField }]} hasFeedback style={styleInpSpaceCompact}>
              <Input placeholder="Имя" />
            </Form.Item>
            <Form.Item name="lastName" rules={[{ validator: validateField }]} hasFeedback style={styleInpSpaceCompact}>
              <Input placeholder="Фамилия" />
            </Form.Item>
          </Space.Compact>
        </Form.Item>
        <Form.Item name="dateOfBirth" label="Date of birth" required rules={[{ validator: validateData }]}>
          <DatePicker disabledDate={disabledDate} style={{ width: '100%' }} />
        </Form.Item>
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
        <Button className="submit" type="primary" htmlType="submit">
          Поменять личные данные
        </Button>
      </Form>
    </div>
  );
}
