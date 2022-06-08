import { useCallback, useContext } from "react";
import { CranContext, CranProviderType } from "../../Modules/Panel/Context/CranContext";
import styles from "./MenuCran.module.css";

interface Props {
  idCran: string,
}

export function MenuCran({ idCran }:Props) {

  const cranContext = useContext(CranContext) as CranProviderType;
  const emitCran = cranContext?.emitCran;
  const cran = cranContext?.cranMemo?.[idCran];

  const handleClick = useCallback((newcran:number) : void => {
    emitCran(idCran, newcran, "menu");
  },[emitCran,idCran]);

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
