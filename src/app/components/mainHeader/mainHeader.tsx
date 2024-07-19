import { Flex, Layout } from 'antd';
import LogoMain from '../../shared/logo/logoMain';
import MainMenu from '../menu/mainMenu';
import ToolBar from '../menu/toolbar/toolbar';
import { useScreenWidth } from '../../utils/screenWidth/screenWidth';
import style from './mainHeader.module.scss';
import { useMenu } from '../../utils/mobileMenu/mobileMenu';
import MobileMenu from '../menu/mobileMenu';
import LogoMobile from '../../shared/logo/logoMobile';

const { Header } = Layout;

export default function MainHeader(): JSX.Element {
  const isMobile = useScreenWidth();
  const { isMenuOpen } = useMenu();
  return (
    <>
      <Header className={style.header}>
        <Flex justify="space-between" align="center">
          {!isMobile ? <LogoMain /> : <LogoMobile />}
          {!isMobile && <MainMenu />}
          <ToolBar />
        </Flex>
      </Header>
      {isMenuOpen && <MobileMenu />}
    </>
  );
}
