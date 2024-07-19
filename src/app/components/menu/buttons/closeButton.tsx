import { Button } from 'antd';
import { useMenu } from '../../../utils/mobileMenu/mobileMenu';

export default function CloseButton(): JSX.Element {
  const { setIsMenuOpen } = useMenu();
  return (
    <Button type="text" className="custom-button" onClick={() => setIsMenuOpen(false)}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.42494 8.05828L2.16856 0.801898L0.754349 2.21611L8.01073 9.47249L8.50905 9.97081L8.01108 10.4688L0.7547 17.7252L2.16891 19.1394L9.42529 11.883L9.92326 11.385L10.4685 11.9303L17.7249 19.1867L19.1391 17.7725L11.8827 10.5161L11.3375 9.97081L11.8831 9.42519L19.1395 2.16881L17.7253 0.754596L10.4689 8.01097L9.92326 8.5566L9.42494 8.05828Z"
          fill="currentColor"
        />
      </svg>
    </Button>
  );
}
