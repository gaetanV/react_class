import react, { useCallback, useState } from "react";

let CranContext = new react.createContext();

function CranProvider({ children, synch }) {
  let [cranMemo, setCranMemo] = useState();

  let emitCran = useCallback(
    (id, cran, mess = "") => {
      console.log(id, "emitCran", mess);

      setCranMemo((prevState) => {
        let r = { ...prevState, [id]: cran };
        if (synch[id]) {
          synch[id].forEach((idCible) => {
            r[idCible] = r[id];
          });
        }
        return r;
      });
    },
    [synch]
  );

  return (
    <CranContext.Provider value={{ cranMemo, emitCran }}>
      {children}
    </CranContext.Provider>
  );
}

export { CranContext, CranProvider };
