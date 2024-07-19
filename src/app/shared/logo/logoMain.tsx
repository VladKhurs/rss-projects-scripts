import { Link } from 'react-router-dom';

export default function LogoMain(): JSX.Element {
  return (
    <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
      <img src="./img/logo.svg" alt="Logo" width="120" height="70" />
    </Link>
  );
}
