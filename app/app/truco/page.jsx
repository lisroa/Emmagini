
import CardGames from "../../components/cards/CardMuro"
import tester from "../../../public/assets/cards/imageCard.png"



  // TODO: Hay que agregar logica que ordene los torneos por activos, proximos o anteriores segun la fecha o algun parametro que venga por API.
    // TODO: Adaptar a pantallas mas grandes segun el disenio que armen proximamente.



function TrucoHome () { 

 return (

        <div className="flex justify-center items-center mt-32">
        <div className="">
            <h1 className="text-black font-bold text-2xl text-center">TORNEOS DE TRUCO</h1>

            <h2 className="text-black ml-4 mb-6 font-semibold">Activos</h2>
            <div>
            <CardGames
                image= {tester}
                title= "Titulo del torneo"
                description= "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero consequatur, dolor dolore officia quae iusto ratione quia ducimus itaque nulla sit atque, eligendi animi."
                subtitle= "Primer premio"
                text= "Entrada al proximo partido"
                link= "/app/truco/torneo-activo"
                buttonText= "Entrar"
                textSpan= "Fecha sorteo: 27/04/2024"
                buttonClassName= "w-52 h-9 bg-blueEmmagini border-4 border-gray-200"
                type="button" 
            
            />
            </div>


            <h2 className="text-black ml-4 mt-10 mb-6 font-semibold">Proximos</h2>
            <div>
            <CardGames
                image= {tester}
                title= "Titulo del torneo"
                description= "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero consequatur, dolor dolore officia quae iusto ratione quia ducimus itaque nulla sit atque, eligendi animi."
                subtitle= "Primer premio"
                text= "Entrada al proximo partido"
                link= "/app/truco/proximo-torneo"
                buttonText= "Anotarse"
                textSpan= "Fecha sorteo: 30/06/2024"
                buttonClassName= "w-52 h-9 bg-blueEmmagini border-4 border-gray-200"
                type="button" 
            
            />
            </div>
            <h2 className="text-black ml-4 mt-10 mb-6 font-semibold">Anteriores</h2>
            <div>
            <CardGames
                image= {tester}
                title= "Titulo del torneo"
                description= "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero consequatur, dolor dolore officia quae iusto ratione quia ducimus itaque nulla sit atque, eligendi animi."
                subtitle= "Ganador"
                text= "Nombre del usuario"
                link="/app/truco/torneo-finalizado"
                buttonText="Ver sorteo"
                altText= "6000 monedas"
                textSpan= "Fecha de cierre: 27/03/2024"
                buttonClassName= "w-52 h-9 bg-blueEmmagini border-4 border-gray-200"
                type="button" 
            
            />
            </div>
            
        </div>
        </div>
       
    )
}


export default TrucoHome;

