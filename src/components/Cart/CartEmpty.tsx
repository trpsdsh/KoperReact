import React from 'react'
import { Link } from 'react-router'
import cartEmptyImg from '../../assets/img/empty-cart.png'
export const CartEmpty = () => {
  return (
      <div className="cart cart--empty">
        <h2>Корзина пустая 😕</h2>
        <p>
          Вероятней всего, вы не выбрали книги для загрузки.<br />
          Для того, чтобы загрузить книги, перейди на главную страницу.
        </p>
        <img src={cartEmptyImg} alt="Empty cart" />
        <Link to='/' className="button button--black">
          <span>Вернуться назад</span>
        </Link>
      </div>
  )
}
export default CartEmpty
