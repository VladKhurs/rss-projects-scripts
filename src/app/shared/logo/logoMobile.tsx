import { Link } from 'react-router-dom';

export default function LogoMobile(): JSX.Element {
  return (
    <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
      <img src="./img/logo.svg" alt="Logo" width="89" height="24" />
    </Link>
  );
}
