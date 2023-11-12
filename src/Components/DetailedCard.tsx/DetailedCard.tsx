import { useEffect, useState } from 'react';
import Person from '../../types/Person';
import styles from './DetailedCard.module.css';
import { SetURLSearchParams, useOutletContext } from 'react-router-dom';
import './../../App.css';
import icon from './../../assets/close_btn.svg';
import { getCharacter } from '../../api/api';

const DetailedCard: React.FC = () => {
  const [person, setPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState(false);
  const [details, page, setSearchParams]: [string, string, SetURLSearchParams] =
    useOutletContext();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getCharacter(details);
        if (res) {
          setPerson(res);
          setLoading(false);
        }
      } catch {
        console.error();
      }
    };
    fetchData();
  }, [details]);
  if (loading) {
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
        <img
          className={styles.image}
          src={person?.image}
          alt={person?.name}
        ></img>
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{person?.name}</h3>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <div className={styles.itemTitle}>Gender</div>
            <div className={styles.itemDescription}>{person?.gender}</div>
          </li>
          <li className={styles.listItem}>
            <div className={styles.itemTitle}>Status</div>
            <div className={styles.itemDescription}>{person?.status}</div>
          </li>
          <li className={styles.listItem}>
            <div className={styles.itemTitle}>Specie</div>
            <div className={styles.itemDescription}>{person?.species}</div>
          </li>
          <li className={styles.listItem}>
            <div className={styles.itemTitle}>Origin</div>
            <div className={styles.itemDescription}>{person?.origin.name}</div>
          </li>
          <li className={styles.listItem}>
            <div className={styles.itemTitle}>Type</div>
            <div className={styles.itemDescription}>
              {person?.type || 'unknown'}
            </div>
          </li>
          <li className={styles.listItem}>
            <div className={styles.itemTitle}>Location</div>
            <div className={styles.itemDescription}>
              {person?.location.name}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default DetailedCard;
