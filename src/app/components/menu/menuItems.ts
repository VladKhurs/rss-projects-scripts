import type { CollapseProps } from 'antd';
import subMenuNewContent from './submenu/submenuNewContent';
import subMenuWomenContent from './submenu/submenuWomenContent';
import subMenuMenContent from './submenu/submenuMenContent';

const menuItems: CollapseProps['items'] = [
  {
    key: 'new',
    label: 'Новинки',
    children: subMenuNewContent,
  },
  {
    key: 'women',
    label: 'Женщины',
    children: subMenuWomenContent,
  },
  {
    key: 'men',
    label: 'Мужчины',
    children: subMenuMenContent,
  },
];

export default menuItems;
