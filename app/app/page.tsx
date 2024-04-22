import Table from "@/app/components/Table";
import ImageBanner from "../components/ImageBanner";
import banner from "../../public/assets/bg/background.png";

export default function Home() {
  return (
    <>
      <ImageBanner
        image={banner}
        welcomText="Bienvenido a COPADO"
        title="¿QUERÉS MIRAR EL PARTIDO DESDE ADENTRO DE LA CANCHA?"
        subtitle="Entra a las subastas para participar"
        buttonText="VER MAS"
      />

      <Table />
    </>
  );
}
