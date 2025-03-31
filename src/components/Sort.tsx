import React from 'react';

import { useSelector } from 'react-redux';
import { selectFilter, setSort } from '../redux/slices/filterSlice';
import { useAppDispatch } from '../redux/store';

type SortListType = {
  name: string;
  sortProperty: string;
  order: string;
};

export const sortList: SortListType[] = [
  { name: 'Популярности ↓', sortProperty: 'rating', order: 'desc' },
  { name: 'Популярности ↑', sortProperty: 'rating', order: 'asc' },
  { name: 'Цене ↓', sortProperty: 'price', order: 'desc' },
  { name: 'Цене ↑', sortProperty: 'price', order: 'asc' },
  { name: 'Алфавиту ↓', sortProperty: 'title', order: 'desc' },
  { name: 'Алфавиту ↑', sortProperty: 'title', order: 'asc' },
];

function Sort() {
  const dispatch = useAppDispatch();
  const { sort } = useSelector(selectFilter);
  const sortRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);

  const onClickListItem = (obj: SortListType) => {
    dispatch(setSort(obj));
    setOpen(false);
  };

  React.useEffect(() => {
    const sortCloser = (event: MouseEvent) => {
      const path = event.composedPath();
      if (sortRef.current && !path.includes(sortRef.current)) {
        setOpen(false);
      }
    };
    document.body.addEventListener('click', sortCloser);
    return () => {
      document.body.removeEventListener('click', sortCloser);
    };
  }, []);

  return (
    <div ref={sortRef} className='sort'>
      <div className='sort__label'>
        <svg
          width='10'
          height='6'
          viewBox='0 0 10 6'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
            fill='#2C2C2C'
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{sort.name}</span>
      </div>
      {open && (
        <div className='sort__popup'>
          <ul>
            {sortList.map((obj, i) => (
              <li
                key={i}
                onClick={() => onClickListItem(obj)}
                className={
                  sort.sortProperty === obj.sortProperty && sort.order === obj.order ? 'active' : ''
                }>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sort;
