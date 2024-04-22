"use client";
import Card from "./Card";
import { useDataContext } from "../context/GameDataProvider";
import imageCard from "../../public/assets/cards/imageCard.png";

function Table() {
  const { infoGames } = useDataContext();

  const cardsData = [
    "Muro",
    "Memoria",
    "QR Scanner",
    "Parejas",
    "Subastas",
    "Muro",
    "Muro",
    "Muro",
    "Muro",
    "Muro",
    "Muro",
    "Muro",
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8  p-10 mb-32">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {infoGames &&
          Object.values(infoGames).map((game) => (
            <div key={game.id} className="flex justify-center">
              <Card
                text={game.titulo}
                imageCard={
                  game.image || game.imagen || game.imagen_1 || game.imagen_0
                }
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default Table;
