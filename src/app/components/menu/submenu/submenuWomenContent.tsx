import { Link } from 'react-router-dom';
import { Tag } from 'antd';
import classNames from 'classnames';
import submenuStyle from '../sub-menu.module.scss';

const subMenuWomenContent = (
  <div className={submenuStyle.content}>
    <div className={submenuStyle.menuContainer}>
      <ul>
        <li>
          <Link to="/">
            Яркие сумки{' '}
            <Tag color="#87d068" style={{ padding: '1px 3px', lineHeight: '100%', fontSize: '0.7em' }}>
              NEW
            </Tag>
          </Link>
        </li>
        <li>
          <Link to="/">Элегантная обувь на лето</Link>
        </li>
        <li>
          <Link to="/">Дышащие кроссовки</Link>
        </li>
        <li>
          <Link to="/">Только онлайн</Link>
        </li>
      </ul>
      <ul className="submenu-2">
        <li>
          <Link className={submenuStyle.submenuTitle} to="/">
            Женская обувь
          </Link>
        </li>
        <li>
          <Link to="/">Кроссовки</Link>
        </li>
        <li>
          <Link to="/">Ботинки</Link>
        </li>
        <li>
          <Link to="/">Кеды</Link>
        </li>
        <li>
          <Link to="/">Полуботинки</Link>
        </li>
        <li>
          <Link to="/">Сандалии и Босоножки</Link>
        </li>
        <li>
          <Link to="/">Туфли</Link>
        </li>
        <li>
          <Link to="/">Сапоги</Link>
        </li>
        <li>
          <Link to="/">Ботильоны</Link>
        </li>
        <li>
          <Link to="/">Балетки</Link>
        </li>
        <li>
          <Link to="/">Слипоны</Link>
        </li>
        <li>
          <Link to="/">Шлепанцы и Сабо</Link>
        </li>
        <li>&nbsp;</li>
        <li className={submenuStyle.submenuTitle}>Стиль</li>
        <li>
          <Link to="/">Классический</Link>
        </li>
        <li>
          <Link to="/">Повседневный</Link>
        </li>
        <li>
          <Link to="/">Спортивный</Link>
        </li>
        <li>
          <Link to="/">Для активного отдыха</Link>
        </li>
      </ul>
      <ul className="submenu-2">
        <li>
          <Link className={submenuStyle.submenuTitle} to="/">
            Аксессуары
          </Link>
        </li>
        <li>
          <Link to="/">Сумки</Link>
        </li>
        <li>
          <Link to="/">Рюкзаки</Link>
        </li>
        <li>
          <Link to="/">Перчатки и варежки</Link>
        </li>
        <li>
          <Link to="/">Кошельки</Link>
        </li>
        <li>
          <Link to="/">Ремни</Link>
        </li>
        <li>
          <Link to="/">Носки</Link>
        </li>
        <li>
          <Link to="/">Шнурки</Link>
        </li>
        <li>
          <Link to="/">Стельки</Link>
        </li>
        <li>
          <Link to="/">Прочие аксессуары</Link>
        </li>
        <li>&nbsp;</li>
        <li>
          <Link to="/" className={submenuStyle.submenuTitle}>
            Средства по уходу
          </Link>
        </li>
      </ul>
      <Link
        to="/register"
        className={classNames(submenuStyle.imgCard, submenuStyle.imgCardSmall)}
        // style={{ width: '17%' }}
      >
        <img alt="Новинки аксессуаров" src="/img/collection/women/2773_4930_362x362.webp" />
        <p>Новинки аксессуаров</p>
      </Link>
      <Link to="/register" className={classNames(submenuStyle.imgCard, submenuStyle.imgCardBig)}>
        <img alt="Новинки аксессуаров" src="/img/collection/women/2774_2069_400x250.webp" />
        <p>Летняя коллекция</p>
      </Link>
    </div>
  </div>
);

export default subMenuWomenContent;
