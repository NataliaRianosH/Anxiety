import Libro from "../../models/Achivements/Libro";
import Paleta from "../../models/Achivements/Paleta";
import Pastel from "../../models/Achivements/Patel";
import Perfume from "../../models/Achivements/Perfume";
import Reloj from "../../models/Achivements/Reloj";
import Candle from "../../models/Candle";
import Clock from "../../models/Clock";
import Popsicle from "../../models/Popsicle";
import Caracola from "../../models/Achivements/Caracola";
import Concha from "../../models/Achivements/Concha";
import CastilloArena from "../../models/Achivements/CastilloArena";
import EstrellaMar from "../../models/Achivements/EstrellaMar";
import Flores from "../../models/Achivements/Flores";
import Hoguera from "../../models/Achivements/Hoguera";
import Panal from "../../models/Achivements/Panal";
import Tea from "../../models/Achivements/Tea";
import Tronco from "../../models/Achivements/Tronco";
import Vela from "../../models/Achivements/Vela";

 
const achievementsData = [
  { 
    id: 1, 
    position: [19.442731, 1, 21.9437], 
    geometry: <Concha  />, 
    collider: "ball",
    title: "Minijuego pensamientos positivos", 
    description: "Has encontrado la maceta que simboliza el crecimiento personal y la calma interior.",
    found: false,
    category: "pensamientos"
  },
  // Mindfulness
  { 
    id: 2, 
    position: [6.425997, 0.2, -10.133847], 
    geometry: <Vela  />, 
    collider: "ball",
    title: "Estrategias para la Calma", 
    description: "Has encontrado una vela, que representa la tecnica mindfulness para calmar la ansiedad",
    found: false,
    category: "iniciarMinfulness"
  },
  {  
    id: 3, 
    position: [20.520877, 1, -2.891414], 
    geometry: <Libro scale={0.15} />, 
    collider: "ball",
    title: "Libro", 
    description: "Esta caracola resuena con sonidos relajantes, ayudando a calmar la mente en momentos de ansiedad. contiene los susurros de las olas. Escucha atentamente.",
    found: false,
    category: "mindfulness"
  },
  { 
    id: 4, 
    position: [17.22397, 1, -9.74974], 
    geometry: <Reloj  />, 
    collider: "cuboid",
    title: "Reloj", 
    description: "Un espacio para encerrar preocupaciones y dejarlas atrás, promoviendo un estado de relajación.",
    found: false,
    category: "mindfulness"
  },
  { 
    id: 5, 
    position: [13.76589, 1, -16.7694], 
    geometry: <Paleta  />, 
    collider: "ball",
    title: "Paleta", 
    description: "Representa el equilibrio entre emociones y pensamientos, guiándote hacia la estabilidad emocional.",
    found: false,
    category: "mindfulness", 
  },
  { 
    id: 6, 
    position: [-4.623, 1, -20.7439], 
    geometry: <Perfume  />, 
    collider: "cuboid",
    title: "Perfume", 
    description: "Dentro de esta caja se encuentran herramientas para comprender mejor la ansiedad y afrontarla con serenidad. Dicen que quien posea esta caja tendrá el poder de cambiar su propio destino.",
    found: false,
    category: "mindfulness", 
  },
  { 
    id: 7, 
    position: [-9.05008, 1,-18.4232], 
    geometry: <Pastel />, 
    collider: "ball",
    title: "Pastel", 
    description: "Esta caracola contiene el eco de las olas, recordándote que la calma está en tu interior.",
    found: false,
    category: "mindfulness", 
  },
  // Aprendizaje
  { 
    id: 8, 
    position: [-13.87709, 1,  -14.0770], 
    geometry: <EstrellaMar/>, 
    collider: "cuboid",
    title: " estella Raíces de Fortaleza", 
    description: "Un símbolo de crecimiento y resiliencia. Cada reto superado fortalece tus raíces.",
    found: false,
    category: "aprendizaje"
  },
  { 
    id: 9, 
    position: [-17.883,1, -10.3035], 
    geometry: <CastilloArena />, 
    collider: "ball",
    title: "Casrillo Susurro del Viento", 
    description: "Cuando la ansiedad te abrume, recuerda que el viento siempre encuentra su camino.",
    found: false,
    category: "aprendizaje"
  },
  { 
    id: 10, 
    position: [-18.3, 1, 6.36680], 
    geometry: <Hoguera />, 
    collider: "cuboid",
    title: "Hoguera Semilla de la Esperanza", 
    description: "Cada pequeño esfuerzo que hagas crecerá con el tiempo. Nunca subestimes tu progreso.",
    found: false,
    category: "aprendizaje"
  },
  { 
    id: 11, 
    position: [-14.532, 1, 9.7572], 
    geometry: <Panal/>, 
    collider: "ball",
    title: "Panal Cántico del Océano", 
    description: "Sintoniza con la paz del océano y deja que sus sonidos disipen tus preocupaciones.",
    found: false,
    category: "aprendizaje"
  },
  { 
    id: 12, 
    position: [-19.578943, 1, -7.555367], 
    geometry: <Tronco />, 
    collider: "cuboid",
    title: "Tronco El Árbol del Equilibrio", 
    description: "Sus raíces profundas y ramas abiertas representan la armonía entre mente y cuerpo.",
    found: false,
    category: "aprendizaje"
  },
  { 
    id: 13, 
    position: [-18.885187, 1, -1.993299], 
    //geometry: <Clock scale={0.21} rotation={[0, -3, 0]}/>, 
    geometry: <Tea/>, 
    collider: "ball",
    title: "Tea Eco del Recuerdo", 
    description: "Esta caracola guarda los ecos de momentos felices. Escúchalos cuando necesites ánimo.",
    found: false,
    category: "aprendizaje"
  },
  { 
    id: 14, 
    position: [-19.92068, 1, 4.1480641], 
    geometry: <Flores/>, 
    collider: "cuboid",
    title: "Flores Jardín Interior", 
    description: "Cultiva pensamientos positivos como si fueran flores. Con tiempo y paciencia, florecerán.",
    found: false,
    category: "aprendizaje"
  },
 
  
  
];

export default achievementsData;
