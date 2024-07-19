import { Rule } from 'antd/es/form';
import dayjs, { Dayjs } from 'dayjs';
import { postcodeValidator } from 'postcode-validator';

const validateWhitespace = (value: string) => {
  if (!value) {
    return Promise.reject(new Error('Заполните поле'));
  }
  if (value.startsWith(' ')) {
    return Promise.reject(new Error('Не использовать пробелы в начале'));
  }
  if (value.endsWith(' ')) {
    return Promise.reject(new Error('Не использовать пробелы в конце'));
  }
  return Promise.resolve();
};

export const validateEmail = (_: Rule, value: string) => {
  const regex = /^\S+@\S+\.\S+$/;
  if (value) {
    if (!regex.test(value)) {
      if (!value.includes('@')) {
        return Promise.reject(new Error("Адрес электронной почты должен сожержать символ '@'"));
      }
      if (value.split('@')[1].trim() === '') {
        return Promise.reject(new Error('Адрес электронной почты должен сожержать имя домена.'));
      }
      if (value.trim() === '') {
        return Promise.reject(new Error('Адрес электронной почты не должен сожержать пробелов.'));
      }
      return Promise.reject(new Error('Адрес электронной почты должен быть правильно отформатирован'));
    }
    return Promise.resolve();
  }
  return Promise.resolve();
};

export const validatePassword = (_: Rule, value: string) => {
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-!$%^&*()_+|~=`{}[\]:/;<>?,.@#]).{8,}$/;
  if (value) {
    if (value.length < 8) {
      return Promise.reject(new Error('Пароль должен содержать не менее 8 символов'));
    }
    if (!/[a-z]/.test(value)) {
      return Promise.reject(new Error('Пароль должен содержать не менее одной строчной буквы от A до Z'));
    }
    if (!/[A-Z]/.test(value)) {
      return Promise.reject(new Error('Пароль должен содержать не менее одной заглавной буквы от A до Z'));
    }
    if (!/\d/.test(value)) {
      return Promise.reject(new Error('Пароль должен содержать не менее одной цифры'));
    }
    if (!/[-!$%^&*()_+|~=`{}[\]:/;<>?,.@#]/.test(value)) {
      return Promise.reject(new Error('Пароль должен содержать не менее одного спец.символа (напр.: !@#$%^&*)'));
    }
    if (!/^\S(?:.*\S)?$/g.test(value)) {
      return Promise.reject(new Error('Пароль не должен содержать пробелов'));
    }
    if (regex.test(value)) {
      return Promise.resolve();
    }
    return Promise.resolve();
  }
  return Promise.resolve();
};

export const validateField = (_: Rule, value: string) =>
  validateWhitespace(value).then(() => {
    const hasSpecialCharacters = /[!@#$%'^&*(),.?":{}|<>0-9\\-]|[!$%^&*()_+|~=`{}[\]:/;<>?,.@#]/.test(value);
    if (value && !hasSpecialCharacters) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Должно содержать хотя бы один символ. Спецсимволы запрещены'));
  });

export const validateData = (_: Rule, value: Dayjs) => {
  if (!value) return Promise.reject(new Error('Заполните поле'));
  const currentDate = dayjs();
  const birthDate = dayjs(value);
  const age = currentDate.diff(birthDate, 'year');
  if (age >= 13) {
    return Promise.resolve();
  }
  return Promise.reject(new Error('Вам должно быть больше 13 лет'));
};

export const validatePostalCode = (country: string, value: string) => {
  let error = '';
  if (country === 'US') {
    error = 'код должен содержать (5 цифр): XXXXX или (5-4 цифр): XXXXX-XXXX';
  } else if (country === 'RU') {
    error = 'код должен содержать (6 цифр): XXXXXX';
  } else if (country === 'FR' || country === 'DE') {
    error = 'код должен содержать (5 цифр): XXXXX';
  }
  if (postcodeValidator(value, country)) {
    return Promise.resolve();
  }
  return Promise.reject(error);
};

export const validateStreet = (_: Rule, value: string) =>
  validateWhitespace(value).then(() => {
    if (value.length > 0) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Заполните поле'));
  });
