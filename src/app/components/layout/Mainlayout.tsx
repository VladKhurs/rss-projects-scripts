import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import MainHeader from '../mainHeader/mainHeader';

const { Content, Footer } = Layout;

export default function MainLayout(): JSX.Element {
  return (
    <Layout style={{ width: '100v', backgroundColor: 'white' }}>
      <MainHeader />
      <Content>
        <Outlet />
      </Content>
      <Footer>footer</Footer>
    </Layout>
  );
}
