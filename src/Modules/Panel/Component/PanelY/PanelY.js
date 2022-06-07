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
const ERROR_TYPE_BLOC = " not allow in PanelYChild set BLocFull or BlocScroll";

export function PanelY({ children, id }) {
  const cranContext = useContext(CranContext);

  const emitCran = cranContext?.emitCran;
  const cranMemo = cranContext?.cranMemo?.[id];

  const [childrenDomHeights, setchildrenDomHeights] = useState([]);

  const [cran, setCran] = useState(CRAN_INIT);

  const inner = useRef(null);
  const container = useRef(null);
  const [height, setHeight] = useState(0);

  let listChildren = useMemo(() => {
    Children.toArray(children).forEach((a) => {
      if (a.type !== BlocFull && a.type !== BlocScroll) {
        throw new Error(a.type + ERROR_TYPE_BLOC);
      }
    });
    return Children.map(children, (child) => child);
  }, [children]);

  const emitCranIfNecesary = useCallback(
    (newCran, message = "y") => {
      if (cranMemo !== undefined && emitCran && id && cranMemo !== newCran) {
        emitCran(id, newCran, message);
      }
    },
    [cranMemo, id, emitCran]
  );

  const setCranAndMove = useCallback(
    (newCran) => {
      setCran(newCran);

      let distance = 0;
      for (let i = 0; i < newCran; i++) {
        distance += childrenDomHeights[i];
      }

      inner.current.style.top = `-${distance}px`;
    },
    [childrenDomHeights]
  );

  const getElementIdAndRemainingByDistance = useCallback(
    (distanceY) => {
      const idElement = childrenDomHeights.findIndex((elementWidth) => {
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
    [childrenDomHeights]
  );

  const moveSpeedGesture = useCallback(
    (idElement, sens) => {
      if (sens > 0 && idElement !== childrenDomHeights.length - 1) {
        idElement++;
      }
      setCranAndMove(idElement);
      emitCranIfNecesary(idElement, "moveSpeedGesture");
    },
    [childrenDomHeights, setCranAndMove, emitCranIfNecesary]
  );

  const moveBlocFull = useCallback(
    (idElement, remainingDistance) => {
      if (
        idElement !== childrenDomHeights.length - 1 &&
        remainingDistance > childrenDomHeights[idElement] / 2
      ) {
        idElement++;
      }
      setCranAndMove(idElement);
      emitCranIfNecesary(idElement, "moveBlocFull");
    },
    [childrenDomHeights, setCranAndMove, emitCranIfNecesary]
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
        if (childrenDomHeights[idElement] - remainingDistance < 100) {
          idElement++;
          setCranAndMove(idElement);
          emitCranIfNecesary(idElement, "moveBlocScroll next");
        } else if (remainingDistance < 100) {
          setCranAndMove(idElement);
          emitCranIfNecesary(idElement, "moveBlocScroll NEXT");
        } else {
          let delta = (posYStart - posYEnd) * speedGestureY;
          moveSwitch(posYStart, posYEnd - delta, 0);
        }
      } else {
        inner.current.style.top = `-${-posYEnd}px`;
        if (idElement !== cran) {
          setCran(idElement);
          emitCranIfNecesary(idElement, "y moveBlocScroll IN");
        }
      }
    },
    [childrenDomHeights, cran, emitCranIfNecesary, setCranAndMove]
  );

  const moveSwitch = useCallback(
    (posYStart, posYEnd, speedGestureY) => {
      let { idElement, remainingDistance } = getElementIdAndRemainingByDistance(
        -posYEnd
      );

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
            throw new Error(listChildren[idElement].type + ERROR_TYPE_BLOC);
        }
      }
    },
    [
      listChildren,
      getElementIdAndRemainingByDistance,
      moveSpeedGesture,
      moveBlocFull,
      moveBlocScroll,
    ]
  );

  useEffect(() => {
    cran !== undefined &&
      cranMemo !== undefined &&
      cranMemo !== cran &&
      setCranAndMove(cranMemo);
  }, [cranMemo, cran, setCranAndMove]);

  let moveToAfterResize = useCallback(
    (domHeightsFromChildren) => {
      let response = 0;
      let distance = 0;
      for (let i = 0; i < cran; i++) {
        distance += domHeightsFromChildren[i];
      }

      switch (listChildren[cran].type) {
        case BlocFull:
          response = distance;
          break;
        case BlocScroll:
          let olddistance = 0;
          for (let i = 0; i < cran; i++) {
            olddistance += childrenDomHeights[i];
          }

          const oldPos = -parseInt(inner.current.style.top);
          const oldSize = childrenDomHeights[cran];
          const newSize = domHeightsFromChildren[cran];
          let diff = oldPos - olddistance;

          response = distance + (diff * newSize) / oldSize;
          break;
        default:
          throw new Error(listChildren[cran].type + ERROR_TYPE_BLOC);
      }
      return response;
    },
    [listChildren, childrenDomHeights, cran]
  );

  useEffect(() => {
    let getDomHeightsFromChildren = () => {
      return Array.from(inner.current.children).map((childDom) => {
        return childDom.offsetHeight;
      });
    };

    let observeDomChange;

    const changeHeight = () => {
      const domHeightsFromChildren = getDomHeightsFromChildren();
      const oldSum = domHeightsFromChildren.reduce((a, b) => a + b, 0);

      if (oldSum !== height) {
        clearInterval(observeDomChange);

        // wait if something have change after 100 ms
        setTimeout(() => {
          if (
            JSON.stringify(getDomHeightsFromChildren()) ===
            JSON.stringify(domHeightsFromChildren)
          ) {
            inner.current.style.top = `-${moveToAfterResize(
              domHeightsFromChildren
            )}px`;

            setHeight(oldSum);
            setchildrenDomHeights(domHeightsFromChildren);
          }
          observeDomChange = setInterval(
            () => changeHeight(observeDomChange),
            100
          );
        }, 100);
      }
    };

    observeDomChange = setInterval(changeHeight, 100);

    return () => {
      clearInterval(observeDomChange);
    };
  }, [height, setCranAndMove, moveToAfterResize]);

  useEffect(() => {
    const iInner = inner.current;

    inner.current.touchevent("touchY", () => {
      inner.current.move("y", 1, (dom) => {
        if (-dom.pos.end.y < 0) {
          emitCranIfNecesary(0, "setCranAndMoveAndEmit");
          setCranAndMove(0);
        } else {
          moveSwitch(dom.pos.start.y, dom.pos.end.y, dom.vitesse.y);
        }
      });
    });

    return () => {
      iInner["data-touchevent"] = {};
    };
  }, [moveSwitch, emitCranIfNecesary, setCranAndMove]);

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
