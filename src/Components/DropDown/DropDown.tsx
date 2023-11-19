import styles from './DropDown.module.css';
import { SetURLSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { setLimit } from '../../store/limitSlice';

type Props = {
  setSearchParams: SetURLSearchParams;
};

const DropDown: React.FC<Props> = ({ setSearchParams }) => {
  const limit = useAppSelector((state) => state.limit.limit);
  console.log(limit);
  const dispatch = useAppDispatch();
  const limits = [8, 12, 20];
  const selectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSearchParams((prev) => ({ ...prev, page: '1' }));
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
