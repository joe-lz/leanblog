import Head from "next/head";
import Link from "next/link";
import styles from "./index.module.scss";
import priorityArr from "src/lib/priority";

function Components(props) {
  let { curUser, userinfo } = props;
  curUser = JSON.parse(JSON.stringify(curUser));
  let priorityLabel = "";
  priorityArr.map((obj) => {
    if (userinfo && obj.value == userinfo.priority) {
      priorityLabel = obj.label;
    }
  });

  return (
    <header className={styles.header}>
      <nav>
        {/* <Link href="/_user/home">
          <img
            className={styles.logoimg}
            src="https://qiniu.jingdian.club/FpFCrbbNmg-GmFfVLdsxmmbPZFHw"
          ></img>
        </Link> */}
        <div className={styles.right}>
          <div className={styles.priority}>
            <span>{priorityLabel}</span>
          </div>
          {curUser && (
            <>
              <span className={styles.divider}>|</span>
              <div className={styles.link}>
                <div className={styles.btn}>
                  <span>{curUser.username}</span>
                  <i
                    className="iconfont icon-down"
                    style={{ fontSize: 12 }}
                  ></i>
                </div>
              </div>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Components;
