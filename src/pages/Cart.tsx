import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CartItemBlock from '../components/Cart/CartItem';
import { clearItem, selectCart } from '../redux/slices/cartSlice';
import CartEmpty from '../components/Cart/CartEmpty';
import { useAppDispatch } from '../redux/store';

const Cart: React.FC = () => {
  const { items, totalPrice } = useSelector(selectCart);
  const dispatch = useAppDispatch();

  const onClickClear = () => {
    dispatch(clearItem());
  };

  const cartCount = items.reduce((sum: number, item: any) => sum + item.count, 0);

  if (!totalPrice) {
    return <CartEmpty />;
  }

  return (
    <div className="container container--cart">
      <div className="cart">
        <div className="cart__top">
          <h2 className="content__title">Корзина</h2>
          <div onClick={onClickClear} className="cart__clear">
            <span>Очистить корзину</span>
          </div>
        </div>
        <div className="content__items">
          {items.length === 0 ? (
            <p>Загрузка...</p>
          ) : (
            items.map((item: any) => <CartItemBlock key={item.id} {...item} />)
          )}
        </div>
        <div className="cart__bottom">
          <div className="cart__bottom-details">
            <span>
              Всего книг: <b>{cartCount} шт.</b>
            </span>
          </div>
          <div className="cart__bottom-buttons">
            <Link to="/" className="button button--outline button--add go-back-btn">
              <span>Вернуться назад</span>
            </Link>
            <div className="button pay-btn">
              <Link to="/payment">
                <span>{totalPrice}₽</span>
                <br />
                <span>Перейти к оплате</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
