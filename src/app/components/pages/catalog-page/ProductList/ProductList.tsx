import { Product, ProductCard } from './ui/ProductCard/ProductCard';
import { getOrSaveToken, queryProducts } from '../../../../utils/api';
import './styles.productList.scss';

const authorizationData = await getOrSaveToken();
const products = await queryProducts(authorizationData.access_token);

export default function ProductList(): JSX.Element {
  return (
    <div className="catalog__wrapper">
      {products && products.map((product: Product) => <ProductCard key={product.id} product={product} />)}
    </div>
  );
}
