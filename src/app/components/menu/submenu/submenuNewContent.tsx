import { Card, Flex } from 'antd';
import { Link } from 'react-router-dom';
import submenuStyle from '../sub-menu.module.scss';

const subMenuNewContent = (
  <div className={submenuStyle.contentNew}>
    <div className={submenuStyle.container}>
      <Flex gap={10} justify="space-between" wrap>
        <Link to="/login" className={submenuStyle.cardLink}>
          <Card
            cover={<img alt="example" src="./img/collection/new/2726_Menu_400x400.webp" style={{ borderRadius: 0 }} />}
            className={submenuStyle.card}
          >
            Новинки для женщин
          </Card>
        </Link>
        <Link to="/login" className={submenuStyle.cardLink}>
          <Card
            cover={
              <img alt="example" src="./img/collection/new/2727_Menu_400x400_(1).webp" style={{ borderRadius: 0 }} />
            }
            className={submenuStyle.card}
          >
            Новинки для мужчин
          </Card>
        </Link>
        <Link to="/login" className={submenuStyle.cardLink}>
          <Card
            cover={
              <img alt="example" src="./img/collection/new/2730_Menu_400x400_(2).webp" style={{ borderRadius: 0 }} />
            }
            className={submenuStyle.card}
          >
            Новинки для детей
          </Card>
        </Link>
        <Link to="/login" className={submenuStyle.cardLink}>
          <Card
            cover={
              <img alt="example" src="./img/collection/new/2729_Menu_400x400_(3).webp" style={{ borderRadius: 0 }} />
            }
            className={submenuStyle.card}
          >
            Новинки аксессуаров
          </Card>
        </Link>
        <Link to="/login" className={submenuStyle.cardLink}>
          <Card
            cover={
              <img alt="example" src="./img/collection/new/2728_Menu_400x400_(4).webp" style={{ borderRadius: 0 }} />
            }
            className={submenuStyle.card}
          >
            Natacha Ramsay-Levi x ECCO
          </Card>
        </Link>
      </Flex>
    </div>
  </div>
);

export default subMenuNewContent;
