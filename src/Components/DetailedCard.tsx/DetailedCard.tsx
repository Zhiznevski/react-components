import styles from './DetailedCard.module.css';
import { SetURLSearchParams, useOutletContext } from 'react-router-dom';
import './../../App.css';
import icon from './../../assets/close_btn.svg';
import { useGetPersonQuery } from '../../services/persons';

const DetailedCard: React.FC = () => {
  const [details, page, setSearchParams]: [string, string, SetURLSearchParams] =
    useOutletContext();
  const { data, isLoading } = useGetPersonQuery(details);

  if (isLoading) {
    return (
      <div className={styles.loaderWrapper}>
        <div data-testid="loader" className="loader"></div>
      </div>
    );
  }
  return (
    <div data-testid="details" className={styles.wrapper}>
      <img
        src={icon}
        alt="close-button"
        className={styles.closeBtn}
        onClick={() => {
          setSearchParams({ page: page });
        }}
      ></img>
      <div className={styles.imageWrapper}>
        <img className={styles.image} src={data?.image} alt={data?.name}></img>
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{data?.name}</h3>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <div className={styles.itemTitle}>Gender</div>
            <div className={styles.itemDescription}>{data?.gender}</div>
          </li>
          <li className={styles.listItem}>
            <div className={styles.itemTitle}>Status</div>
            <div className={styles.itemDescription}>{data?.status}</div>
          </li>
          <li className={styles.listItem}>
            <div className={styles.itemTitle}>Specie</div>
            <div className={styles.itemDescription}>{data?.species}</div>
          </li>
          <li className={styles.listItem}>
            <div className={styles.itemTitle}>Origin</div>
            <div className={styles.itemDescription}>{data?.origin.name}</div>
          </li>
          <li className={styles.listItem}>
            <div className={styles.itemTitle}>Type</div>
            <div className={styles.itemDescription}>
              {data?.type || 'unknown'}
            </div>
          </li>
          <li className={styles.listItem}>
            <div className={styles.itemTitle}>Location</div>
            <div className={styles.itemDescription}>{data?.location.name}</div>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default DetailedCard;
