import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

type PaginationType = {
  currentPage: number;
  onChangePage: (page: number) => void;
};

const Pagination: React.FC<PaginationType> = ({ currentPage, onChangePage }) => 
  <ReactPaginate
    className={styles.root}
    breakLabel='...'
    previousLabel='<'
    nextLabel='>'
    onPageChange={(event) => onChangePage(event.selected + 1)}
    pageRangeDisplayed={8}
    pageCount={2}
    forcePage={currentPage - 1}
    renderOnZeroPageCount={null}
  />

export default Pagination;
