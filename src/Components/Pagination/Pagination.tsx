import { SetURLSearchParams } from 'react-router-dom';
import styles from './Pagination.module.css';
import './../../App.css';

type Props = {
  pageCount: number | null;
  setSearchParams: SetURLSearchParams;
  currentPage: string | null;
  searchParams: URLSearchParams;
  details: string | null;
};

const Pagination: React.FC<Props> = ({
  pageCount,
  setSearchParams,
  currentPage,
  searchParams,
}) => {
  const pageNumbers = [];

  if (pageCount) {
    for (let i = 1; i <= pageCount; i++) {
      pageNumbers.push(i);
    }
  }
  return (
    <ul className={styles.list}>
      {pageNumbers.map((page) => (
        <li key={page}>
          <span
            className={
              currentPage && page === +currentPage
                ? styles.active
                : styles.pageNumber
            }
            onClick={() => {
              setSearchParams({ ...searchParams, page: page.toString() });
            }}
          >
            {page}
          </span>
        </li>
      ))}
    </ul>
  );
};
export default Pagination;
