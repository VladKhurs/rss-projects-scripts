import { Button } from 'antd';
import { Link } from 'react-router-dom';
import './styles.mainPage.scss';

export default function MainPage(): JSX.Element {
  return (
    <div className="main-page__wrapper">
      <h1>Главная</h1>
      <Link to="/catalog">
        <Button className="catalog-button">Каталог</Button>
      </Link>
    </div>
  );
}
