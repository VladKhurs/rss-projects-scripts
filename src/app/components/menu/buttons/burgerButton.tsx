import { Tooltip, Button } from 'antd';
import { useMenu } from '../../../utils/mobileMenu/mobileMenu';

export default function BurgerButton(): JSX.Element {
  const { isMenuOpen, setIsMenuOpen } = useMenu();

  return (
    <Tooltip title="Меню">
      <Button
        type="text"
        className="custom-button"
        style={{ transform: 'translateY(-3px)' }}
        onClick={() => {
          setIsMenuOpen(true);
          console.log('Burger click', isMenuOpen);
        }}
      >
        <svg width="32" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="8" width="22" height="2" fill="#181818" />
          <rect x="5" y="15" width="22" height="2" fill="#181818" />
          <rect x="5" y="22" width="22" height="2" fill="#181818" />
        </svg>
      </Button>
    </Tooltip>
  );
}
