import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { EuroCircleOutlined } from '@ant-design/icons';
import './styles.productCard.scss';

interface Attribute {
  name: string;
  value: string;
}

interface Images {
  url: string;
}

interface Product {
  id: string;
  masterData: {
    current: {
      name: { 'ru-RU': string };
      description: { 'ru-RU': string };
      masterVariant: { attributes: Attribute[]; images: Images[] };
    };
  };
}

function ProductCard({ product }: { product: Product }) {
  const { id, masterData } = product;
  const [loading, setImgLoading] = useState(true);

  return (
    <Link to={`/product-detail/${id}`} className="product-card">
      <div className="product-card__photo">
        <img
          className="product-card__img"
          src={masterData.current.masterVariant.images[0].url}
          alt="product"
          onLoad={() => setImgLoading(false)}
        />
      </div>
      <div className="product-card__info">
        <h4>{masterData.current.name['ru-RU']}</h4>
        <div className="product-card__price">
          <span>
            <span>
              <EuroCircleOutlined />
            </span>{' '}
            {masterData.current.masterVariant.attributes[2].value}
          </span>
        </div>
        <Button type="primary" className="product-card__add-button">
          add to cart
        </Button>
      </div>
    </Link>
  );
}

export { type Product, ProductCard };
