import { Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import useAuth from '../../../hooks/useAuth';

export default function LogoutButton(): JSX.Element {
  const { logout } = useAuth();
  return (
    <Button type="text" className="custom-button" onClick={logout}>
      <LogoutOutlined style={{ fontSize: '24px', transform: 'translateY(-1px)' }} />
    </Button>
  );
}
