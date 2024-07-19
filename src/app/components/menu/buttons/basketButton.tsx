import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function BasketButton(): JSX.Element {
  const navigate = useNavigate();
  return (
    <Button type="text" className="custom-button" onClick={() => navigate('/basket')}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.2318 4.61475H20.7046L23.4041 21.9994L23.7146 23.9994H21.6907H2.66166H0.637695L0.948254 21.9994L3.64773 4.61475H7.11934C7.35259 2.0272 9.52728 -0.000488281 12.1756 -0.000488281C14.8238 -0.000488281 16.9985 2.0272 17.2318 4.61475ZM15.2525 6.61475V8.76875C15.2525 8.92567 15.2407 9.07986 15.2181 9.23047H17.2318C17.2455 9.0784 17.2525 8.92439 17.2525 8.76875V6.61475H18.9912L21.3801 21.9994H2.97222L5.36114 6.61475H7.09863V8.76875C7.09863 8.92439 7.10564 9.0784 7.11935 9.23047H9.13305C9.11038 9.07986 9.09863 8.92567 9.09863 8.76875V6.61475H15.2525ZM9.13304 4.61475C9.35579 3.13443 10.6331 1.99951 12.1756 1.99951C13.718 1.99951 14.9953 3.13443 15.2181 4.61475H9.13304Z"
          fill="currentColor"
        />
      </svg>
    </Button>
  );
}
