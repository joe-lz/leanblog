import Head from "next/head";
import Link from "next/link";
import dayjs from "dayjs";

import styles from "./index.module.scss";

function Components(props) {
  return (
    <a className={styles.articles_item} target='_blank' href={`/_user/feature/articles/${props.item.id}`}>
      <div className={styles.articles_item_poster}
      style={{backgroundImage: `url(${props.item.attributes.poster})`}}
      ></div>
      <p className={styles.articles_item_title}>
        {props.item.attributes.title}
      </p>
      <div className={styles.articles_item_bottom}>
        <p className={styles.articles_item_author}>
          {props.item.attributes.author}
        </p>
        <p className={styles.articles_item_updateAt}>
          {dayjs(props.item.attributes.updatedAt).format("YYYY/MM/DD")}更新
        </p>
      </div>
    </a>
  );
}

export default Components;
