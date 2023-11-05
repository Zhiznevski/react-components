import { SetURLSearchParams } from 'react-router-dom';
import styles from './Pagination.module.css';
import './../../App.css';

type Props = {
  pageCount: number | null;
  setSearchParams: SetURLSearchParams;
  page: string | null;
  details: string | null;
};

const Pagination: React.FC<Props> = ({ pageCount, setSearchParams, page }) => {
  const pageNumbers = [];

  if (pageCount) {
    for (let i = 1; i <= pageCount; i++) {
      pageNumbers.push(i);
    }
  }
  return (
    <ul className={styles.list}>
      {pageNumbers.slice(0, 10).map((pageNumber) => (
        <li key={pageNumber}>
          <div
            className={
              page && pageNumber === +page ? styles.active : styles.pageNumber
            }
            onClick={() => {
              setSearchParams((prev) => ({
                ...prev,
                page: pageNumber.toString(),
              }));
            }}
          >
            {pageNumber}
          </div>
        </li>
      ))}
    </ul>
  );
};
export default Pagination;
