import styles from './Pagination.module.css';
import { useRouter } from 'next/router';

type Props = {
  pageCount: number | undefined;
};

const Pagination: React.FC<Props> = ({ pageCount }) => {
  const router = useRouter();
  const page = router.query.page as string;
  const numPage = page ? +page : null;
  const getPrevPage = () => {
    if (numPage) {
      const newPage = numPage > 1 ? numPage - 1 : numPage;
      router.push({ query: {...router.query, page: newPage } });
    }
  };
  const getNextPage = () => {
    if (numPage && pageCount) {
      const newPage = numPage <= pageCount ? numPage + 1 : numPage;
      router.push({ query: { ...router.query, page: newPage } });
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
      <button
        data-testid="nextBtn"
        disabled={isNextDisabled()}
        onClick={() => getNextPage()}
      >
        next
      </button>
    </div>
  );
};
export default Pagination;
