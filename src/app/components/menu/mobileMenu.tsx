import classNames from 'classnames';
import { Collapse } from 'antd';
import menuItems from './menuItems';
import LogoMobile from '../../shared/logo/logoMobile';
import SearchButton from './buttons/searchButton';
import CloseButton from './buttons/closeButton';

import submenuStyle from './sub-menu.module.scss';

function CustomExpandIcon(): JSX.Element {
  return <div className={submenuStyle.expendIcon} />;
}

export default function MobileMenu(): JSX.Element {
  return (
    <section className={classNames('mobile', submenuStyle.mobileMenu)}>
      <header>
        <SearchButton />
        <LogoMobile />
        <CloseButton />
      </header>
      <div className="content">
        <Collapse ghost items={menuItems} expandIcon={CustomExpandIcon} expandIconPosition="end" />
      </div>
    </section>
  );
}
