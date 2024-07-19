import { Button, Modal } from 'antd';
import { EuroCircleOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './styles.productDetailed.scss';
import { Carousel } from 'react-responsive-carousel';
import { getOrSaveToken, queryProducts } from '../../../utils/api';
import { Product } from '../catalog-page/ProductList/ui/ProductCard/ProductCard';

const authorizationData = await getOrSaveToken();
const products = await queryProducts(authorizationData.access_token);
const prods = new Map();
products.forEach((product: Product) => {
  prods.set(product.id, product);
});

export default function ProductDetail() {
  const params = useParams();

  const [product, setProduct] = useState(prods.get(params.id));
  useEffect(() => {
    setProduct(prods.get(params.id));
  }, [params.id]);

  const productName = product.masterData.current.name['ru-RU'];
  const productDesc = product.masterData.current.description['ru-RU'];
  const productColor = product.masterData.current.masterVariant.attributes[0].value;
  const productSize = '43';
  const productPrice = product.masterData.current.masterVariant.attributes[2].value;
  const isProductInCart = false;
  const prodImgUrls = product.masterData.current.masterVariant.images;

  async function addToCart() {
    console.log('Добавил в корзину');
  }
  async function removeProductFromCart() {
    console.log('Удалил из в корзины');
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="product-details">
      <div className="product-details__wrapper">
        {productName ? <div className="product-details__product-name">{productName}</div> : null}
        {productDesc ? <div className="product-details__product-description">{productDesc}</div> : null}
        {productColor ? <div className="product-details__product-color">Color: {productColor}</div> : null}
        {productSize ? <div className="product-details__product-size">Size: {productSize}</div> : null}

        {productPrice ? (
          <div className="product-details__product-price">
            Цена {productPrice} <EuroCircleOutlined />
          </div>
        ) : null}

        {isProductInCart ? (
          <Button type="primary" danger className="product-detailed__add-button" onClick={removeProductFromCart}>
            Remove from cart
          </Button>
        ) : (
          <Button type="primary" className="product-detailed__add-button" onClick={addToCart}>
            Add to cart
          </Button>
        )}
      </div>
      <Carousel onClickItem={showModal}>
        <div>
          <img src={prodImgUrls[0].url} alt="sho-to s chem-to" />
        </div>
        <div>
          <img src={prodImgUrls[1].url} alt="sho-to s chem-to" />
        </div>
        <div>
          <img src={prodImgUrls[2].url} alt="sho-to s chem-to" />
        </div>
      </Carousel>
      <Modal footer={null} title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Carousel>
          <div>
            <img src={prodImgUrls[0].url} alt="sho-to s chem-to" />
          </div>
          <div>
            <img src={prodImgUrls[1].url} alt="sho-to s chem-to" />
          </div>
          <div>
            <img src={prodImgUrls[2].url} alt="sho-to s chem-to" />
          </div>
        </Carousel>
      </Modal>
    </div>
  );
}
