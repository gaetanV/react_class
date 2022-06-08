import react, { ReactNode, useCallback, useState } from "react";

let CranContext =  react.createContext({});

type  emitCranType = 
(
  id:string, cran:number, mess: string 
) => void

type mapNumber = {
  [key: string]: number,
 }

interface Props {
  children: ReactNode,
  synch: {
    [key:string]: string[]
  }
}

export type CranProviderType  = {
  cranMemo: mapNumber,
  emitCran: emitCranType
}

function CranProvider({ children, synch }:Props) {
  let [cranMemo, setCranMemo] = useState<mapNumber>({});

  let emitCran : emitCranType = useCallback(
    (id, cran, mess= "")  => {
      console.log(id, "emitCran", mess);

      setCranMemo((prevState) => {
        let r = { ...prevState, [id]: cran };
        if (synch[id]) {
          synch[id].forEach((idCible:string) => {
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
