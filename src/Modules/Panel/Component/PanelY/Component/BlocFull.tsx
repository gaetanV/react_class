import { ReactNode } from "react";
import styles from "./BlocFull.module.css";
interface Props {
  children: ReactNode,
}

export function BlocFull({children}:Props) {
  return <div className={styles.container}>{children}</div>;
}
