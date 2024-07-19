import { Button } from 'antd';

export default function SearchButton(): JSX.Element {
  return (
    <Button type="text" className="custom-button">
      <svg width="24" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18.1427 13.8422C15.5858 16.897 11.0366 17.3007 7.98184 14.7438C4.92704 12.1869 4.52341 7.63773 7.08029 4.58293C9.63718 1.52813 14.1864 1.1245 17.2412 3.68138C20.296 6.23827 20.6996 10.7874 18.1427 13.8422ZM7.47972 16.865C11.3425 19.4623 16.6222 18.7749 19.6764 15.1259C22.9422 11.2241 22.4267 5.41357 18.5248 2.14772C14.623 -1.11814 8.81248 -0.60258 5.54663 3.29924C2.50284 6.93576 2.7437 12.2303 5.94932 15.5774L-6.10352e-05 22.6853L1.53361 23.969L7.47972 16.865Z"
          fill="currentColor"
        />
      </svg>
    </Button>
  );
}
