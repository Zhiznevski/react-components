import styles from './DropDown.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { setLimit } from '../../store/limitSlice';
import { useRouter } from 'next/router';

const DropDown: React.FC = () => {
  const router = useRouter();
  const limit = useAppSelector((state) => state.limit.limit);
  const dispatch = useAppDispatch();
  const limits = [8, 12, 20];
  const selectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    router.push({ query: { ...router.query, page: '1' } });
    dispatch(setLimit(+value));
  };
  return (
    <div className={styles.wrapper}>
      <select
        id="select_id"
        className={styles.select}
        value={limit}
        onChange={selectHandler}
      >
        {limits.map((lim, index) => (
          <option key={index} className={styles.option} value={lim}>
            {lim}
          </option>
        ))}
      </select>
    </div>
  );
};
export default DropDown;
