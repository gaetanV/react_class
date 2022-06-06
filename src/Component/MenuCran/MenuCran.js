import { useCallback, useContext } from "react";
import { CranContext } from "../../Modules/Panel/Context/CranContext";
import styles from "./MenuCran.module.css";

export function MenuCran({ idCran }) {

  const cranContext = useContext(CranContext);
  const emitCran = cranContext?.emitCran;
  const cran = cranContext?.cranMemo?.[idCran];

  const handleClick = new useCallback((cran) => {
    emitCran(idCran, cran, "menu");
  });

  return (
    <>
      {
        {
          1: (
            <div
              className={
                `${styles.btn} ${styles.girl}` +
                (cran === 0 ? styles.active : "")
              }
              onClick={() => handleClick(0)}
            ></div>
          ),
          0: (
            <div
              className={
                `${styles.btn} ${styles.bear}` +
                (cran === 1 ? styles.active : "")
              }
              onClick={() => handleClick(1)}
            ></div>
          ),
        }[cran]
      }
    </>
  );
}
