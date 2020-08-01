import Head from "next/head";
import Link from "next/link";
import styles from "./index.module.scss";

function Components(props) {
  let { curUser } = props;
  curUser = JSON.parse(JSON.stringify(curUser));

  return (
    <header className={styles.header}>
      <nav>
        {/* <div
          className={styles.logo}
          style={{
            backgroundImage:
              'url("https://qiniu.jingdian.club/FpFCrbbNmg-GmFfVLdsxmmbPZFHw")',
          }}
        ></div> */}
        {/* <Link href="/_user/home"> */}
        <Link href="/_user/home">
          <img
            className={styles.logoimg}
            src="https://qiniu.jingdian.club/FpFCrbbNmg-GmFfVLdsxmmbPZFHw"
          ></img>
        </Link>
        <div className={styles.right}>
          {/* {props.type === "login" && (
            <Link href="/_user/register">
              <div className={styles.link}>
                <div className={styles.btn}>
                  <i className="iconfont icon-zhuce"></i>
                  <span>立即注册</span>
                </div>
              </div>
            </Link>
          )}
          {props.type === "register" && (
            <Link href="/_user/home">
              <div className={styles.link}>
                <div className={styles.btn}>
                  <i className="iconfont icon-md-log-in"></i>
                  <span>登录</span>
                </div>
              </div>
            </Link>
          )} */}
          <a href="https://www.jingdian.club" target="_blank">
            <div className={styles.link_active}>
              <div className={styles.btn}>
                {/* <i className="iconfont icon-Link2-copy"></i> */}
                <span>鲸典官网</span>
              </div>
            </div>
          </a>
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
