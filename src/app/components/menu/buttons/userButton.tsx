import { Button } from 'antd';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Customer } from '@commercetools/platform-sdk';
import useAuth from '../../../hooks/useAuth';

function handleClick(user: Customer | null, navigate: NavigateFunction) {
  if (user) {
    navigate('/profile');
  } else {
    navigate('/login');
  }
}

export default function UserButton(): JSX.Element {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <Button type="text" className="custom-button" onClick={() => handleClick(user, navigate)}>
      <svg width="22" height="24" viewBox="0 0 22 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.1039 8.86744C13.0004 8.86744 14.5378 7.33 14.5378 5.43347C14.5378 3.53695 13.0004 1.99951 11.1039 1.99951C9.20736 1.99951 7.66992 3.53695 7.66992 5.43347C7.66992 7.33 9.20736 8.86744 11.1039 8.86744ZM11.1039 10.8674C14.105 10.8674 16.5378 8.43457 16.5378 5.43347C16.5378 2.43238 14.105 -0.000488281 11.1039 -0.000488281C8.10279 -0.000488281 5.66992 2.43238 5.66992 5.43347C5.66992 8.43457 8.10279 10.8674 11.1039 10.8674ZM19.9493 21.9995C19.6207 17.4013 15.7862 13.7729 11.1043 13.7729C6.42231 13.7729 2.5878 17.4013 2.25917 21.9995H19.9493ZM21.9536 21.9995C21.6216 16.2959 16.8911 11.7729 11.1043 11.7729C5.31737 11.7729 0.586872 16.2959 0.254939 21.9995H0.236328V22.6406V23.9995H21.9722V22.6406V21.9995H21.9536Z"
          fill="currentColor"
        />
      </svg>
    </Button>
  );
}
