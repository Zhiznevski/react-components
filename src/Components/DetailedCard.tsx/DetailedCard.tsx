import { useEffect, useState } from 'react';
import Person from '../../types/Person';
import styles from './DetailedCard.module.css';
import { API_URL } from '../../Constants/constants';
import { useOutletContext } from 'react-router-dom';
import './../../App.css';

const DetailedCard: React.FC = () => {
  const [person, setPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState(false);
  const details: string = useOutletContext();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch(`${API_URL}/${details}`);
      const data: Person = await res.json();
      setPerson(data);
      setLoading(false);
      console.log(data);
    };
    fetchData();
  }, [details]);
  return (
    <div className={styles.wrapper}>
      {loading ? (
        <div className="loader"></div>
      ) : (
        <>
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
                <div className={styles.itemDescription}>
                  {person?.origin.name}
                </div>
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
        </>
      )}
    </div>
  );
};
export default DetailedCard;
