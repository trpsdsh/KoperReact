import logoSVG from '../assets/img/booksLogo.svg';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import Search from './Search';
import { selectCart } from '../redux/slices/cartSlice';

const Header = () => {
  const { items } = useSelector(selectCart);
  const cartCount = items.reduce((sum: number, item: any) => sum + item.count, 0);
  const location = useLocation();
  return (
    <div className='header'>
      <div className='container'>
        <Link to='/'>
          <div className='header__logo'>
            <img width='38' src={logoSVG} alt='Pizza logo' />
            <div>
              <h1>Koper Books</h1>
              <p>лучшие бесплатные книги</p>
            </div>
          </div>
        </Link>
        <Search />
        <div className='header__cart'>
          {location.pathname !== '/cart' && (
            <Link to='/cart' className='button button--cart'>
              <svg
                width='20px'
                height='20px'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M12 3V16M12 16L16 11.625M12 16L8 11.625'
                  stroke='#fff'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M15 21H9C6.17157 21 4.75736 21 3.87868 20.1213C3 19.2426 3 17.8284 3 15M21 15C21 17.8284 21 19.2426 20.1213 20.1213C19.8215 20.4211 19.4594 20.6186 19 20.7487'
                  stroke='#fff'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
              <span>{cartCount}</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
