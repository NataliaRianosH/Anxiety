import Flowerpot from "../models/Flowerpot";
import Seashell from "../models/Seashell";

const achievementsData = [
  { 
    id: 1, 
    position: [-38, -3, 19], 
    geometry: <Flowerpot scale={4} />, 
    collider: "ball",
    title: "Jardín de la Serenidad", 
    description: "Has encontrado la maceta que simboliza el crecimiento personal y la calma interior."
  },
  { 
    id: 2, 
    position: [-30, -4, 16], 
    geometry: <Seashell scale={1} />, 
    collider: "ball",
    title: "Eco Tranquilo", 
    description: "Esta caracola resuena con sonidos relajantes, ayudando a calmar la mente en momentos de ansiedad. contiene los susurros de las olas. Escucha atentamente."
  },
  { 
    id: 3, 
    position: [-15, 0, 11], 
    geometry: <boxGeometry args={[2, 2, 2]} />, 
    collider: "cuboid",
    title: "Caja de los Pensamientos", 
    description: "Un espacio para encerrar preocupaciones y dejarlas atrás, promoviendo un estado de relajación."
  },
  { 
    id: 4, 
    position: [-6, 1, -3], 
    geometry: <sphereGeometry args={[1, 32, 32]} />, 
    collider: "ball",
    title: "Esfera del Control", 
    description: "Representa el equilibrio entre emociones y pensamientos, guiándote hacia la estabilidad emocional."
  },
  { 
    id: 5, 
    position: [-30, 0, -13], 
    geometry: <boxGeometry args={[2, 2, 2]} />, 
    collider: "cuboid",
    title: "Cofre del Autoconocimiento", 
    description: "Dentro de esta caja se encuentran herramientas para comprender mejor la ansiedad y afrontarla con serenidad. Dicen que quien posea esta caja tendrá el poder de cambiar su propio destino."
  },
];

export default achievementsData;
