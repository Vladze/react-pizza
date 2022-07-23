import styles from './NotFoundBlock.module.scss';

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1 className={styles.header}>
        😕
        <br />
        <span>Ничего не найдено</span>
      </h1>
      <p className={styles.desc}>К сожалению данная страница отсутвует в нашем интернет-магазине</p>
    </div>
  );
};

export default NotFoundBlock;
