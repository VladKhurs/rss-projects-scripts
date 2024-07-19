import './error404Page.module.scss';
import { Link } from 'react-router-dom';

export default function Error404Page(): JSX.Element {
  return (
    <div
      style={{
        position: 'absolute',
        top: '0',
        left: '0',
        zIndex: 3,
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        404
        <div>Не существует Страницы, которую вы посетили.</div>
        <div>
          <Link to="/">
            <button type="button">Вернуться на главную страницу</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
