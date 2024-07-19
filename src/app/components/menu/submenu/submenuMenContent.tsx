import { Link } from 'react-router-dom';
import classNames from 'classnames';
import submenuStyle from '../sub-menu.module.scss';

const subMenuMenContent = (
  <div className={submenuStyle.content}>
    <div className={submenuStyle.menuContainer}>
      <ul>
        <li>
          <Link to="/">Для активного отдыха летом</Link>
        </li>
        <li>
          <Link to="/">Линейка BIOM</Link>
        </li>
        <li>
          <Link to="/">Сандалии и шлёпанцы</Link>
        </li>
        <li>
          <Link to="/">Только онлайн</Link>
        </li>
      </ul>
      <ul className="submenu-2">
        <li>
          <Link className={submenuStyle.submenuTitle} to="/">
            Мужская обувь
          </Link>
        </li>
        <li>
          <Link to="/">Кроссовки</Link>
        </li>
        <li>
          <Link to="/">Кеды</Link>
        </li>
        <li>
          <Link to="/">Сандалии и шлепанцы</Link>
        </li>
        <li>
          <Link to="/">Ботинки</Link>
        </li>
        <li>
          <Link to="/">Полуботинки</Link>
        </li>
        <li>
          <Link to="/">Туфли</Link>
        </li>
        <li>
          <Link to="/">Мокасины</Link>
        </li>
        <li>
          <Link to="/">Лоферы</Link>
        </li>
        <li>
          <Link to="/">Слипоны</Link>
        </li>
      </ul>
      <ul className="submenu-2">
        <li>
          <Link className={submenuStyle.submenuTitle} to="/">
            Стиль
          </Link>
        </li>
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
          <Link to="/">Кепки и панамы</Link>
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
      <Link to="/register" className={classNames(submenuStyle.imgCard, submenuStyle.imgCardBig)}>
        <img alt="Новинки аксессуаров" src="/img/collection/men/2775_1283_500_x_250_px_(1).webp" />
        <p>Летняя коллекция</p>
      </Link>
    </div>
  </div>
);

export default subMenuMenContent;
