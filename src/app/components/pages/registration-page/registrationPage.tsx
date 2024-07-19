import RegistrationForm from './registration-form/registrationForm';
import './styles.registrationPage.scss';

export default function RegistrationPage(): JSX.Element {
  return (
    <div className="registration">
      <h2>Регистрация</h2>
      <RegistrationForm />
    </div>
  );
}
