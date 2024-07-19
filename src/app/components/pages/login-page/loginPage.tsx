import LoginForm from './login-form/loginForm';
import './styles.loginPage.scss';

export default function LoginPage(): JSX.Element {
  return (
    <div className="login">
      <h2>Вход</h2>
      <LoginForm />
    </div>
  );
}
