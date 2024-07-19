import Menu, { SubMenu } from 'rc-menu';
import subMenuNewContent from './submenu/submenuNewContent';
import subMenuWomenContent from './submenu/submenuWomenContent';
import subMenuMenContent from './submenu/submenuMenContent';
import 'rc-menu/assets/index.css';
import './rc-menu-custom.scss';

export default function MainMenu(): JSX.Element {
  return (
    <Menu mode="horizontal" style={{ backgroundColor: 'white' }}>
      <SubMenu
        title="Новинки"
        key="new"
        popupStyle={{ width: '100vw', left: 0, textTransform: 'uppercase' }}
        popupOffset={[0, 2]}
      >
        {subMenuNewContent}
      </SubMenu>
      <SubMenu title="Женщины" key="women" popupStyle={{ width: '100vw', left: 0 }} popupOffset={[0, 2]}>
        {subMenuWomenContent}
      </SubMenu>
      <SubMenu title="Мужчины" key="men" popupStyle={{ width: '100vw', left: 0 }} popupOffset={[0, 2]}>
        {subMenuMenContent}
      </SubMenu>
    </Menu>
  );
}
