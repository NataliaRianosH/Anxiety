import Flowerpot from "../models/Flowerpot";
import Seashell from "../models/Seashell";

const achievementsData = [
  { 
    id: 1, 
    position: [-38, -3, 19], 
    geometry: <Flowerpot scale={4} />, 
    collider: "ball",
    title: "Jardinero Legendario", 
    description: "Has encontrado la maceta sagrada que da vida a los jardines olvidados."
  },
  { 
    id: 2, 
    position: [-30, -4, 16], 
    geometry: <Seashell scale={1} />, 
    collider: "ball",
    title: "Voz del Océano", 
    description: "Esta caracola contiene los susurros de las olas. Escucha atentamente."
  },
  { 
    id: 3, 
    position: [-15, 0, 11], 
    geometry: <boxGeometry args={[2, 2, 2]} />, 
    collider: "cuboid",
    title: "El Cubo del Misterio", 
    description: "Un extraño cubo de origen desconocido. Tal vez contenga secretos antiguos."
  },
  { 
    id: 4, 
    position: [-6, 1, -3], 
    geometry: <sphereGeometry args={[1, 32, 32]} />, 
    collider: "ball",
    title: "Esfera del Equilibrio", 
    description: "Una esfera perfecta que simboliza el balance en el universo."
  },
  { 
    id: 5, 
    position: [-30, 0, -13], 
    geometry: <boxGeometry args={[2, 2, 2]} />, 
    collider: "cuboid",
    title: "Caja del Destino", 
    description: "Dicen que quien posea esta caja tendrá el poder de cambiar su propio destino."
  },
];

export default achievementsData;
