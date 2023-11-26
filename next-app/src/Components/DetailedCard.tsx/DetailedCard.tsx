import styles from './DetailedCard.module.css';
import icon from '../../assets/close_btn.svg';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useGetPersonQuery } from '../../services/persons';
import reserveImg from '../../assets/pikachu.jpg';

type DetailsCardProps = {
  details: string;
};

const DetailedCard: React.FC<DetailsCardProps> = ({ details }) => {
  const router = useRouter();
  const { data } = useGetPersonQuery(details);
  function closeDetails() {
    router.push({
      query: {
        page: router.query.page,
        limit: router.query.limit,
        search: router.query.search,
      },
    });
  }
  return (
    <div data-testid="details" className={styles.wrapper}>
      <Image
        src={icon}
        alt="close-button"
        className={styles.closeBtn}
        width={20}
        height={20}
        onClick={closeDetails}
      ></Image>
      <div className={styles.imageWrapper}>
        <Image
          priority
          className={styles.image}
          src={data?.data.images.large || reserveImg}
          alt={data?.data.images.large || 'image'}
          width={300}
          height={500}
        ></Image>
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{data?.data.name}</h3>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <div className={styles.itemTitle}>Supertype</div>
            <div className={styles.itemDescription}>{data?.data.supertype}</div>
          </li>
          <li className={styles.listItem}>
            <div className={styles.itemTitle}>HP</div>
            <div className={styles.itemDescription}>{data?.data.hp}</div>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default DetailedCard;
