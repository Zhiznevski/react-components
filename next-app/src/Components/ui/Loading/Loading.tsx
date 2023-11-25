import styles from './Loading.module.css';

const Loading: React.FC = () => {
  return (
    <div className={styles.loadingWrapper}>
      <div className={styles.loader}></div>
    </div>
  );
};
export default Loading;
