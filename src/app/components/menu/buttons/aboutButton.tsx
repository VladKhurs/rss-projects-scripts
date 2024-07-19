import { InfoCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function AboutButton(): JSX.Element {
  const navigate = useNavigate();

  return (
    <Button
      type="text"
      className="custom-button"
      onClick={() => {
        navigate('/about');
      }}
    >
      <InfoCircleOutlined style={{ fontSize: '24px', transform: 'translateY(-2px)' }} />
    </Button>
  );
}
