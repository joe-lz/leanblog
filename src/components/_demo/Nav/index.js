import Head from "next/head";
import Link from "next/link";
import AV from "leancloud-storage";
import dayjs from "dayjs";

import React, { useState, useEffect } from "react";

import styles from "./index.module.scss";

function Components(props) {
  const [modalShow, setmodalShow] = useState(false);

  useEffect(() => {}, []);

  return (
    <div className={styles.container}>
    nav
    </div>
  );
}

export default Components;
