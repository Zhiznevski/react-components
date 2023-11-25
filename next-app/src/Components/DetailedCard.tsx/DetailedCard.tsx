import styles from './DetailedCard.module.css';
import icon from '../../assets/close_btn.svg';
import { useAppSelector } from '../../hooks/reduxHooks';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Pokemon } from '@/types/Pokemon';

type DetailsCardProps = {
  page: string;
  detailsData: Pokemon | undefined;
};

const DetailedCard: React.FC<DetailsCardProps> = ({ page, detailsData }) => {
  const router = useRouter();
  // const { data } = useGetPersonQuery(details);
  const isLoading = useAppSelector(
    (state) => state.detailsLoading.isDetailsLoading
  );

  if (isLoading) {
    return (
      <div className={styles.loaderWrapper}>
        <div data-testid="loader" className="loader"></div>
      </div>
    );
  } else
    return (
      <div data-testid="details" className={styles.wrapper}>
        <Image
          src={icon}
          alt="close-button"
          className={styles.closeBtn}
          width={20}
          height={20}
          onClick={() => {
            router.push({ query: { page: page } });
          }}
        ></Image>
        <div className={styles.imageWrapper}>
          <Image
            priority
            className={styles.image}
            src={detailsData?.images.large || '.'}
            alt={detailsData?.images.large || 'image'}
            width={300}
            height={500}
          ></Image>
        </div>
        <div className={styles.body}>
          <h3 className={styles.title}>{detailsData?.name}</h3>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <div className={styles.itemTitle}>Supertype</div>
              <div className={styles.itemDescription}>
                {detailsData?.supertype}
              </div>
            </li>
            <li className={styles.listItem}>
              <div className={styles.itemTitle}>HP</div>
              <div className={styles.itemDescription}>{detailsData?.hp}</div>
            </li>
          </ul>
        </div>
      </div>
    );
};
export default DetailedCard;
