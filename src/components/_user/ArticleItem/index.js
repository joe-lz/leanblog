import Head from "next/head";
import Link from "next/link";

import styles from "./index.module.scss";

function Components(props) {
  return (
    <div className={styles.articles_item}>
      <div className={styles.articles_item_poster}></div>
      <p className={styles.articles_item_title}>
        爱自己，我不需要其他人
      </p>
      <div className={styles.articles_item_bottom}>
        <p className={styles.articles_item_author}>陈先生</p>
        <p className={styles.articles_item_updateAt}>2020年5月5号</p>
      </div>
    </div>
  );
}

export default Components;
