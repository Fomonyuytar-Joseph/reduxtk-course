import React from "react";
import { Link } from "react-router-dom";
import styles from "./CartLink.module.css";
import { getNumItems ,getMemiozedNumItems} from "./cartSlice"; 
import { useAppSelector } from "../../app/hooks";

export function CartLink() {

  const numItems=useAppSelector(getMemiozedNumItems)
  return (
    <Link to="/cart" className={styles.link}>
      <span className={styles.text}>🛒&nbsp;&nbsp;{
        numItems? numItems :"cart"
      }</span>
    </Link>
  );
}
