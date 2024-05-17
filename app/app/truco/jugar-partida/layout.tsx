import {PartidasTrucoProvider} from "@/app/context/truco/PartidasTrucoProvider"
import { SeriesTrucoProvider } from "@/app/context/truco/SeriesTrucoProvider";


export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
   
    return (
     <SeriesTrucoProvider>
       <PartidasTrucoProvider>
        {children}
      </PartidasTrucoProvider>
     </SeriesTrucoProvider>
    );
  }