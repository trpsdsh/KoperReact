import React from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import BookBlock from '../components/BookBlock';
import Skeleton from '../components/BookBlock/Skeleton';
import Pagination from '../components/Pagination';
import { fetchBooks, selectBooks, StatusBooks } from '../redux/slices/booksSlice';
import NotFoundBlock from '../components/NotFoundBlock';
import { useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { categoryId, sort: sortType, currentPage, searchValue } = useSelector(selectFilter);

  const { items, status } = useSelector(selectBooks);

  const booksSkeleton = [...new Array(8)].map((_, index) => <Skeleton key={index} />);
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  React.useEffect(() => {
    fetchBooksArray();
  }, [searchValue, categoryId, sortType.sortProperty, sortType.order, currentPage]);

  const fetchBooksArray = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `search=${searchValue}` : '';

    dispatch(
      fetchBooks({
        category,
        search,
        currentPage,
        sortType,
      }),
    );
    window.scrollTo(0, 0);
  };
  const booksArray = items.map((obj: any) => (
    <BookBlock key={obj.id} {...obj} /> //spreadsyntax
  ));

  const onClickCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      dispatch(
        setFilters({
          ...params,
          sort: sortType,
          searchValue: '',
          categoryId: 0,
          currentPage: 1,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortType: sortType.sortProperty,
        order: sortType.order,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType.sortProperty, sortType.order, currentPage]);

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className='content__title'>Все книги</h2>
      {status === StatusBooks.REJECTED ? (
        <NotFoundBlock />
      ) : (
        <div className='content__items'>{status === 'loading' ? booksSkeleton : booksArray}</div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
