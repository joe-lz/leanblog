import Head from "next/head";
import Link from "next/link";
import Particles from "react-particles-js";
import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";

import styles from "./index.module.scss";
import particlesParams from "./particlesParams";

function Components(props) {
  const [isLogin, setisLogin] = useState(0);

  return (
    <div className={styles.banner}>
      <div className={styles.banner_content}>
        <img
          className={styles.logobg}
          src="https://qiniu.jingdian.club/FtFSZANFUxt2J5ER9ESY4llFWlNb"
        ></img>
        {particlesParams && (
          <Particles
            className={styles.tsparticles}
            params={particlesParams.nasa}
          />
        )}
        {/* <ReactCardFlip
          isFlipped={this.state.isFlipped}
          flipDirection="vertical"
        >
          <YOUR_FRONT_CCOMPONENT>
            This is the front of the card.
            <button onClick={this.handleClick}>Click to flip</button>
          </YOUR_FRONT_CCOMPONENT>

          <YOUR_BACK_COMPONENT>
            This is the back of the card.
            <button onClick={this.handleClick}>Click to flip</button>
          </YOUR_BACK_COMPONENT>
        </ReactCardFlip> */}
        {isLogin ? (
          <div className={styles.banner_body}>
            <div className={styles.banner_body_content}>
              <p className={styles.banner_body_title}>登录</p>
              <div className={styles.banner_body_input}>
                <input placeholder="邮箱"></input>
              </div>
              <div className={styles.banner_body_input}>
                <input placeholder="密码"></input>
              </div>
              <div className={styles.banner_body_input}>
                <button onClick={() => {}}>确定</button>
              </div>
              <div className={styles.banner_body_input}>
                <button
                  className={styles.banner_body_btn_primary}
                  onClick={() => {
                    setisLogin(false);
                  }}
                >
                  还没有账户？立即注册
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.banner_body}>
            <div className={styles.banner_body_content}>
              <p className={styles.banner_body_title}>登录</p>
              <div className={styles.banner_body_input}>
                <input placeholder="邮箱"></input>
              </div>
              <div className={styles.banner_body_input}>
                <input placeholder="密码"></input>
              </div>
              <div className={styles.banner_body_input}>
                <button onClick={() => {}}>确定</button>
              </div>
              <div className={styles.banner_body_input}>
                <button
                  className={styles.banner_body_btn_primary}
                  onClick={() => {
                    setisLogin(true);
                  }}
                >
                  已有账户？立即登录
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Components;
