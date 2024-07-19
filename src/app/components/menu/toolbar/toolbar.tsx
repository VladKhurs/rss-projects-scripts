import classNames from 'classnames';
import { Tooltip } from 'antd';
import { useScreenWidth } from '../../../utils/screenWidth/screenWidth';
import BurgerButton from '../buttons/burgerButton';
import FavoriteButton from '../buttons/favoriteButton';
import SearchButton from '../buttons/searchButton';
import UserButton from '../buttons/userButton';
import BasketButton from '../buttons/basketButton';
import AboutButton from '../buttons/aboutButton';
import submenuStyle from '../sub-menu.module.scss';
import LogoutButton from '../buttons/logoutButton';
import useAuth from '../../../hooks/useAuth';

export default function ToolBar(): JSX.Element {
  const isMobile = useScreenWidth();
  const { user } = useAuth();

  return (
    <div className={classNames({ [submenuStyle.toolbar]: true, [submenuStyle.mobile]: isMobile })}>
      {isMobile && <BurgerButton />}
      {!isMobile && <SearchButton />}
      <Tooltip title="Избранное">
        <FavoriteButton />
      </Tooltip>
      <Tooltip title="Пользователь">
        <UserButton />
      </Tooltip>
      <Tooltip title="Корзина">
        <BasketButton />
      </Tooltip>
      <Tooltip title="О проекте">
        <AboutButton />
      </Tooltip>
      {user && (
        <Tooltip title="Выйти">
          <LogoutButton />
        </Tooltip>
      )}
    </div>
  );
}
