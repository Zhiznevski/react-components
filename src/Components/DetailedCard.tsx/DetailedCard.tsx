import styles from './DetailedCard.module.css';
import { SetURLSearchParams, useOutletContext } from 'react-router-dom';
import './../../App.css';
import icon from './../../assets/close_btn.svg';
import { useGetPersonQuery } from '../../services/persons';

const DetailedCard: React.FC = () => {
  const [details, page, setSearchParams]: [string, string, SetURLSearchParams] =
    useOutletContext();
  const { data, isFetching } = useGetPersonQuery(details);

  if (isFetching) {
    return (
      <div className={styles.loaderWrapper}>
        <div data-testid="loader" className="loader"></div>
      </div>
    );
  } else
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
          <img
            className={styles.image}
            src={data?.data.images.large}
            alt={data?.data.images.large}
          ></img>
        </div>
        <div className={styles.body}>
          <h3 className={styles.title}>{data?.data.name}</h3>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <div className={styles.itemTitle}>Supertype</div>
              <div className={styles.itemDescription}>
                {data?.data.supertype}
              </div>
            </li>
            <li className={styles.listItem}>
              <div className={styles.itemTitle}>HP</div>
              <div className={styles.itemDescription}>{data?.data.hp}</div>
            </li>
            {/* <li className={styles.listItem}>
            <div className={styles.itemTitle}>rules</div>
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
          </li> */}
          </ul>
        </div>
      </div>
    );
};
export default DetailedCard;
