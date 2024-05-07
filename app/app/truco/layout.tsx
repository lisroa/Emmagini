import { SeriesTrucoProvider } from "@/app/context/truco/SeriesTrucoProvider";



export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
   
    return (
      <SeriesTrucoProvider>
        {children}
      </SeriesTrucoProvider>
    );
  }
  