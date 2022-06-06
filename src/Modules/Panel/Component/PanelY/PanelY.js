import {
  Children,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { BlocScroll } from "./Component/BlocScroll";
import { BlocFull } from "./Component/BlocFull";
import { CranContext } from "../../Context/CranContext";

import styles from "./PanelY.module.css";

const CRAN_INIT = 0;

export function PanelY({children,id}) {
  const cranContext = useContext(CranContext);

  const emitCran = cranContext?.emitCran;
  const cranMemo = cranContext?.cranMemo?.[id];

  const [elementLength, setElementLength] = useState([]);

  const [cran, setCran] = useState(CRAN_INIT);

  const inner = useRef(null);
  const container = useRef(null);
  const [height, setHeight] = useState(0);

  let listChildren = useMemo(() => {
    Children.toArray(children).forEach((a) => {
      if (a.type !== BlocFull && a.type !== BlocScroll) {
        throw new Error(
          a.type + " not allow in PanelYChild set BLocFull or BlocScroll"
        );
      }
    });
    return Children.map(children, (child) => child);
  }, [children]);

  const moveToCran = useCallback(
    (newCran) => {
      setCran(newCran);
      let distance = 0;
      for (let i = 0; i < newCran; i++) {
        distance += elementLength[i];
      }
      inner.current.style.top = `-${distance}px`;
    },
    [elementLength]
  );

  const moveToCranAndEmit = useCallback(
    (newCran) => {
      if (emitCran && id) {
        emitCran(id, newCran, "y");
      }
      moveToCran(newCran);
    },
    [id, moveToCran, emitCran]
  );

  const getElementInfoAndRemainingByDistance = useCallback(
    (distanceY) => {
      const idElement = elementLength.findIndex((elementWidth) => {
        if (elementWidth < distanceY) {
          distanceY = distanceY - elementWidth;
          return false;
        } else {
          return true;
        }
      });
      return {
        idElement: idElement,
        remainingDistance: distanceY,
      };
    },
    [elementLength]
  );

  const moveSpeedGesture = useCallback(
    (idElement, sens) => {
      if (sens > 0 && idElement !== elementLength.length - 1) {
        idElement++;
      }
      moveToCranAndEmit(idElement);
    },
    [elementLength, moveToCranAndEmit]
  );

  const moveBlocFull = useCallback(
    (idElement, remainingDistance) => {
      if (
        idElement !== elementLength.length - 1 &&
        remainingDistance > elementLength[idElement] / 2
      ) {
        idElement++;
      }
      moveToCranAndEmit(idElement);
    },
    [elementLength, moveToCranAndEmit]
  );

  const moveBlocScroll = useCallback(
    (
      posYStart,
      posYEnd,
      speedGestureY,
      moveSwitch,
      idElement,
      remainingDistance
    ) => {
      if (speedGestureY > 0) {
        if (elementLength[idElement] - remainingDistance < 100) {
          idElement++;
          moveToCranAndEmit(idElement);
        } else if (remainingDistance < 100) {
          moveToCranAndEmit(idElement);
        } else {
          let delta = (posYStart - posYEnd) * speedGestureY;
          moveSwitch(posYStart, posYEnd - delta, 0);
        }
      } else {
        inner.current.style.top = `-${-posYEnd}px`;
        if (idElement !== cran) {
          setCran(idElement);
          emitCran(id, idElement, "y");
        }
      }
    },
    [elementLength, cran, id, emitCran, moveToCranAndEmit]
  );

  const moveSwitch = useCallback(
    (posYStart, posYEnd, speedGestureY) => {
      let { idElement, remainingDistance } =
        getElementInfoAndRemainingByDistance(-posYEnd);

      if (speedGestureY > 1.5) {
        moveSpeedGesture(idElement, posYStart - posYEnd);
      } else {
        switch (listChildren[idElement].type) {
          case BlocFull:
            moveBlocFull(idElement, remainingDistance);
            break;
          case BlocScroll:
            moveBlocScroll(
              posYStart,
              posYEnd,
              speedGestureY,
              moveSwitch,
              idElement,
              remainingDistance
            );
            break;
          default:
            throw new Error(
              listChildren[idElement].type +
                " not allow in PanelYChild set BLocFull or BlocScroll"
            );
        }
      }
    },
    [
      listChildren,
      getElementInfoAndRemainingByDistance,
      moveSpeedGesture,
      moveBlocFull,
      moveBlocScroll,
    ]
  );

  const onMoveEnd = useCallback(
    (dom) => {
      if (-dom.pos.end.y < 0) {
        moveToCranAndEmit(0);
      } else {
        moveSwitch(dom.pos.start.y, dom.pos.end.y, dom.vitesse.y);
      }
    },
    [moveSwitch, moveToCranAndEmit]
  );

  useEffect(() => {
    if (cranMemo !== undefined && cranMemo !== cran && id) {
      moveToCran(cranMemo);
    }
  }, [cranMemo, cran, id, moveToCran]);

  useEffect(() => {
    let changeHeight = () => {
      let offset = Array.from(inner.current.children).map((a) => {
        return a.offsetHeight;
      });
      let sum = offset.reduce((a, b) => a + b, 0);
      if (sum !== height) {
        setHeight(sum);
        setElementLength(offset);
      }
    };
    changeHeight();
    let observeDomChange = setInterval(changeHeight, 100);

    return () => {
      clearInterval(observeDomChange);
    };
  }, [height, cran]);

  useEffect(() => {
    const iInner = inner.current;

    inner.current.touchevent("touchY", () => {
      inner.current.move("y", 1, onMoveEnd);
    });

    return () => {
      iInner["data-touchevent"] = {};
    };
  }, [onMoveEnd]);

  useEffect(() => {
    if (emitCran && id) {
      emitCran(id, CRAN_INIT, "yinit");
    }
  }, [id, emitCran]);

  return (
    <div ref={container} className={styles.container}>
      <div className={styles.inner} ref={inner}>
        {Children.map(children, (child) => child)}
      </div>
    </div>
  );
}
