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
    position: [-0.024, 3.085684,-10.5266], 
    geometry: <Concha  />, 
    collider: "ball",
    title: "Minijuego pensamientos positivos", 
    description: "Has encontrado la maceta que simboliza el crecimiento personal y la calma interior.",
    found: false,
    category: "pensamientos",
    shouldFloat: true,

  },
  // Mindfulness
  { 
    id: 2, 
    position: [8.714675903320312, 5, 18.952714], 
    geometry: <Vela  />, 
    collider: "ball",
    title: "Estrategias para la Calma", 
    description: "Has encontrado una vela, que representa la tecnica mindfulness para calmar la ansiedad",
    found: false,
    category: "iniciarMinfulness",
    shouldFloat: true,

  },
  {  
    id: 3, 
    position: [1, 5, 20], 
    geometry: <Libro scale={0.15} />, 
    collider: "ball",
    title: "Libro", 
    description: "Este libro resuena con sonidos relajantes, ayudando a calmar la mente en momentos de ansiedad. contiene los susurros de las olas. Escucha atentamente.",
    found: false,
    category: "mindfulness",
    shouldFloat: true,
  },
  { 
    id: 4, 
    position: [17.22397, 1, -9.74974], 
    geometry: <Reloj  />, 
    collider: "cuboid",
    title: "Reloj", 
    description: "Un espacio para encerrar preocupaciones y dejarlas atrás, promoviendo un estado de relajación.",
    found: false,
    category: "mindfulness",
    shouldFloat: true,
  },
  { 
    id: 5,
    position: [15.56363868713378,4.968834, 11.968585968], 
    geometry: <Paleta />, 
    collider: "ball",
    title: "Paleta", 
    description: "Representa el equilibrio entre emociones y pensamientos, guiándote hacia la estabilidad emocional.",
    found: false,
    category: "mindfulness", 
    shouldFloat: true,
  },
  { 
    id: 6,
    position: [11.1710987091064, 1.916135, -13.37], 
    geometry: <Perfume  />, 
    collider: "cuboid",
    title: "Perfume", 
    description: "Dentro de esta caja se encuentran herramientas para comprender mejor la ansiedad y afrontarla con serenidad. Dicen que quien posea esta caja tendrá el poder de cambiar su propio destino.",
    found: false,
    category: "mindfulness", 
    shouldFloat: true,

  },
  { 
    id: 7,
    position: [-9.3568725, 2,-10.492850], 
    geometry: <Pastel />, 
    collider: "ball",
    title: "Pastel", 
    description: "Esta caracola contiene el eco de las olas, recordándote que la calma está en tu interior.",
    found: false,
    category: "mindfulness", 
    shouldFloat: true,

  },
  // aprendizaje
  { 
    id: 8, 
    position: [-20.1863,2.354596, 3.541252], 
    geometry: <Caracola/>, 
    collider: "cuboid",
    title: " estella Raíces de Fortaleza", 
    description: "Un símbolo de crecimiento y resiliencia. Cada reto superado fortalece tus raíces.",
    found: false,
    category: "aprendizaje",
    shouldFloat: true
  },
  { 
    id: 9, //x=8.623517036437988,y=2.146864891052246, z=-13.182964324951172
    position: [8.6235170, 0.8, -13.1829], 
    geometry: <CastilloArena />, 
    collider: "ball",
    title: "Casrillo Susurro del Viento", 
    description: "Cuando la ansiedad te abrume, recuerda que el viento siempre encuentra su camino.",
    found: false,
    category: "aprendizaje",
    shouldFloat: false
  },
  { 
  
    id: 10, 
    position: [-14.781462669372559, 1, -6.732724666595459], 
    geometry: <Hoguera />, 
    collider: "cuboid",
    title: "Hoguera Semilla de la Esperanza", 
    description: "Cada pequeño esfuerzo que hagas crecerá con el tiempo. Nunca subestimes tu progreso.",
    found: false,
    category: "aprendizaje",
    shouldFloat: false,
  },
  { 
    id: 11, 
    position: [-14.532, 4, 9.7572], 
    geometry: <Panal/>, 
    collider: "ball",
    title: "Panal Cántico del Océano", 
    description: "Sintoniza con la paz del océano y deja que sus sonidos disipen tus preocupaciones.",
    found: false,
    category: "aprendizaje",
    shouldFloat: true
  },
  { 
    position: [-24.34409332, 0.02, 6.21187], 
    geometry: <Tronco />, 
    collider: "cuboid",
    title: "Tronco El Árbol del Equilibrio", 
    description: "Sus raíces profundas y ramas abiertas representan la armonía entre mente y cuerpo.",
    found: false,
    category: "aprendizaje",
    shouldFloat: false,
  },
  { 
    id: 13, 

    position: [-4.435, 8.04, 16.985], 
    //geometry: <Clock scale={0.21} rotation={[0, -3, 0]}/>, -6.622974872589111,y=2.7990477085113525, z=23.111196517944336
    geometry: <Tea/>, 
    collider: "ball",
    title: "Tea Eco del Recuerdo", 
    description: "Esta caracola guarda los ecos de momentos felices. Escúchalos cuando necesites ánimo.",
    found: false,
    category: "aprendizaje",
    shouldFloat: true,
  },
  { 
    id: 14, 
    position: [-10, 9, 5], 
    geometry: <Flores/>, 
    collider: "cuboid",
    title: "Flores Jardín Interior", 
    description: "Cultiva pensamientos positivos como si fueran flores. Con tiempo y paciencia, florecerán.",
    found: false,
    category: "aprendizaje",
    shouldFloat: true,

  },
 
  
  
];

export default achievementsData;
