import {
  Children,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { CranContext } from "../../Context/CranContext";
import styles from "./PanelX.module.css";

const CRAN_INIT = 0;

export function PanelX({ children, id }) {
  const cranContext = useContext(CranContext);

  const emitCran = cranContext?.emitCran;
  const cranMemo = cranContext?.cranMemo?.[id];

  const [width, setWidth] = useState(0);
  const [cran, setCran] = useState(CRAN_INIT);

  const [nbElement] = useState(Children.count(children));

  const container = useRef(null);
  const inner = useRef(null);

  const moveToCran = useCallback(
    (newCran) => {
      setCran(newCran);
      inner.current.style.transitionDuration = "0.5s";
      setTimeout(() => {
        inner.current.style.transitionDuration = "0.0s";
      }, 500);
      inner.current.style.left = `-${newCran * width}px`;
    },
    [width]
  );

  useEffect(() => {
    if (cranMemo !== undefined && cranMemo !== cran) {
      moveToCran(cranMemo);
    }
  }, [cranMemo, cran, moveToCran]);

  const getCranFromMove = useCallback(
    (speedGestureX, posXStart, posXEnd) => {
      let newCran;
      if (speedGestureX > 1.5) {
        newCran =
          posXStart - posXEnd > 0
            ? Math.ceil(-posXEnd / width)
            : Math.floor(-posXEnd / width);
      } else {
        newCran = Math.round(-posXEnd / width);
      }
      if (newCran < 0) {
        newCran = 0;
      } else {
        if (newCran > nbElement - 1) {
          newCran = nbElement - 1;
        }
      }
      return newCran;
    },
    [width, nbElement]
  );

  useEffect(() => {
    const iInner = inner.current;
    inner.current.touchevent("touchX", () => {
      inner.current.move("x", 1, (dom) => {
        let newCran = getCranFromMove(
          dom.vitesse.x,
          dom.pos.start.x,
          dom.pos.end.x
        );
        moveToCran(newCran);
        if (emitCran && id && newCran !== cran) {
          emitCran(id, newCran, "x");
        }
      });
    });
    return () => {
      iInner["data-touchevent"] = {};
    };
  }, [width, cran, moveToCran, emitCran, id, getCranFromMove]);

  useEffect(() => {
    if (emitCran && id) {
      emitCran(id, CRAN_INIT, "xinit");
    }
  }, [id, emitCran]);

  useEffect(() => {
    let changeWidth = () => {
      if (container.current.offsetWidth !== width) {
        setWidth(container.current.offsetWidth);
        inner.current.style.left = `-${cran * container.current.offsetWidth}px`;
      }
    };
    changeWidth();
    let observeDomChange = setInterval(changeWidth, 100);

    return () => {
      clearInterval(observeDomChange);
    };
  }, [width, cran]);

  return (
    <div ref={container} className={styles.container}>
      <div
        ref={inner}
        className={styles.inner}
        style={{ width: width * nbElement }}
      >
        {Children.map(children, (child) => (
          <div>{child}</div>
        ))}
      </div>
    </div>
  );
}
