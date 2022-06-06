import styles from "./BlocFull.module.css";

export function BlocFull(props) {
  return <div className={styles.container}>{props.children}</div>;
}
