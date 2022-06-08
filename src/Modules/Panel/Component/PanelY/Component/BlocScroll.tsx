
import { ReactNode } from "react";

interface Props {
  children: ReactNode,
}

export function BlocScroll({children}:Props) { 
  return <div>{children}</div>;
}
