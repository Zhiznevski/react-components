import { SetURLSearchParams } from 'react-router-dom';
import styles from './Pagination.module.css';
import './../../App.css';

type Props = {
  setSearchParams: SetURLSearchParams;
  page: string | null;
  details: string | null;
  pageCount: number | undefined;
};

const Pagination: React.FC<Props> = ({ setSearchParams, page, pageCount }) => {
  const numPage = page ? +page : null;

  const pageNumbers = [];
  if (pageCount) {
    for (let i = 1; i <= +pageCount; i++) {
      pageNumbers.push(i);
    }
  }
  const getPrevPage = () => {
    if (numPage) {
      const newPage = numPage > 1 ? numPage - 1 : numPage;
      setSearchParams((prev) => ({
        ...prev,
        page: newPage,
      }));
    }
  };
  const getNextPage = () => {
    if (numPage && pageCount) {
      const newPage = numPage <= pageCount ? numPage + 1 : numPage;
      setSearchParams((prev) => ({
        ...prev,
        page: newPage,
      }));
    }
  };
  const isPrevDisabled = () => {
    if (numPage) {
      return numPage <= 1;
    }
  };
  const isNextDisabled = () => {
    if (numPage && pageCount) {
      return numPage >= pageCount;
    }
  };
  return (
    <div className={styles.wrapper}>
      <button disabled={isPrevDisabled()} onClick={() => getPrevPage()}>
        prev
      </button>
      <button disabled={isNextDisabled()} onClick={() => getNextPage()}>
        next
      </button>
    </div>
  );
};
export default Pagination;
