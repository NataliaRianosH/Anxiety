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

//Imagenes 2d
import velaImg from "../../assets/images/Achivements2D/vela.png";
import conchaImg from "../../assets/images/Achivements2D/concha.png";
import caracolaImg from "../../assets/images/Achivements2D/caracola.png";
import floresImg from "../../assets/images/Achivements2D/flores.png";
import castilloArenaImg from "../../assets/images/Achivements2D/castillo.png";
import hogueraImg from "../../assets/images/Achivements2D/hoguera.png";
import panalImg from "../../assets/images/Achivements2D/panal.png";
import teaImg from "../../assets/images/Achivements2D/tea.png";
import troncoImg from "../../assets/images/Achivements2D/tronco.png";
import paletaImg from "../../assets/images/Achivements2D/paleta.png";
import pastelImg from "../../assets/images/Achivements2D/pastel.png";
import perfumeImg from "../../assets/images/Achivements2D/perfume.png";
import libroImg from "../../assets/images/Achivements2D/libro.png";
import relojImg from "../../assets/images/Achivements2D/reloj.png";


const achievementsData = [
  { 
  
    id: 1, 
    position: [-0.024, 3.085684,-10.5266], 
    geometry: <Concha  />, 
    collider: "ball",
    title: "Minijuego Pensamientos Positivos", 
    description: "Este símbolo representa tu capacidad para transformar pensamientos negativos en mensajes de apoyo y crecimiento personal.",
    found: false,
    category: "pensamientos",
    shouldFloat: true,
    image: conchaImg,

  },
  // Mindfulness
  { 
    id: 2, 
    position: [8.714675903320312, 5, 18.952714], 
    geometry: <Vela  />, 
    collider: "ball",
    title: "Vela", 
    description: "Esta vela guía tu atención al presente a través de la respiración consciente. Ideal para comenzar tu práctica de mindfulness.",
    found: false,
    category: "iniciarMinfulness",
    shouldFloat: true,
    image: velaImg,

  },
  {  
    id: 3, 
    position: [1, 5, 20], 
    geometry: <Libro scale={0.15} />, 
    collider: "ball",
    title: "Libro", 
    description: "Un libro lleno de técnicas y reflexiones que calman la mente y fortalecen tu equilibrio emocional.",
    found: false,
    category: "mindfulness",
    shouldFloat: true,
    image: libroImg,
  },
  { 
    id: 4, 
    position: [-21.6476, 1.2762, -1.383], 
    geometry: <Reloj  />, 
    collider: "cuboid",
    title: "Reloj", 
    description: "Deja atrás las preocupaciones del pasado y del futuro. Este reloj te invita a vivir el presente.",
    found: false,
    category: "mindfulness",
    shouldFloat: true,
    image: relojImg,
  },
  { 
    id: 5,
    position: [14.930821418762207,2.37665295, -1.868562], 
    geometry: <Paleta />, 
    collider: "ball",
    title: "Paleta", 
    description: "Saborea este símbolo de balance emocional, donde cada color representa una emoción transformada en calma.",
    found: false,
    category: "mindfulness", 
    shouldFloat: true,
    image: paletaImg,
  },
  { 
    id: 6,
    position: [11.1710987091064, 1.916135, -13.37], 
    geometry: <Perfume  />, 
    collider: "cuboid",
    title: "Perfume", 
    description: "Este perfume contiene aromas que evocan tranquilidad. Úsalo para reconectar con tu centro.",
    found: false,
    category: "mindfulness", 
    shouldFloat: true,
    image: perfumeImg,

  },
  { 
    id: 7,
    position: [-9.3568725, 2,-10.492850], 
    geometry: <Pastel />, 
    collider: "ball",
    title: "Pastel", 
    description: "Celebra tus avances. Este pastel representa el autocuidado y la recompensa por tu esfuerzo emocional.",
    found: false,
    category: "mindfulness", 
    shouldFloat: true,
    image: pastelImg,

  },
  // aprendizaje
  { 
    id: 8, 
    position: [-20.1863,2.354596, 3.541252], 
    geometry: <Caracola/>, 
    collider: "cuboid",
    title: " Caracola ", 
    description: "Esta caracola te recuerda el motivo por el que iniciaste este viaje de autoconocimiento y calma.",
    found: false,
    category: "aprendizaje",
    shouldFloat: true,
    image: caracolaImg,
  },
  { 
    id: 9, //x=8.623517036437988,y=2.146864891052246, z=-13.182964324951172
    position: [8.6235170, 0.8, -13.1829], 
    geometry: <CastilloArena />, 
    collider: "ball",
    title: "Castillo de Arena", 
    description: "Cada grano de arena representa una pequeña victoria. Con paciencia, puedes construir estabilidad.",
    found: false,
    category: "aprendizaje",
    shouldFloat: false,
    image: castilloArenaImg,
  },
  { 
  
    id: 10, 
    position: [-14.781462669372559, 1, -6.732724666595459], 
    geometry: <Hoguera />, 
    collider: "cuboid",
    title: "Hoguera", 
    description: "Las llamas simbolizan el poder transformador de tu esfuerzo. Cada chispa es un paso hacia tu bienestar.",
    found: false,
    category: "aprendizaje",
    shouldFloat: false,
    image: hogueraImg,
  },
  { 
    id: 11,
    position: [-17.948444366455078, 4, 9.301053047180176 ], 
    geometry: <Panal/>, 
    collider: "ball",
    title: "Panal de Abejas", 
    description: "Como las abejas, tú también puedes encontrar armonía en el trabajo en equipo entre mente, cuerpo y emociones.",
    found: false,
    category: "aprendizaje",
    shouldFloat: true,
    image: panalImg,
  },
  { 
    id: 12, 
    position: [-10.844362258911133, 3, 21.06035614013672], 
    geometry: <Tronco />, 
    collider: "cuboid",
    title: "Tronco de Árbol", 
    description: "Este tronco firme representa la base emocional que estás cultivando para sentirte en paz.",
    found: false,
    category: "aprendizaje",
    shouldFloat: false,
    image: troncoImg,
  },
  { 
    id: 13, 

    position: [-4.435, 8.04, 16.985], 
    //geometry: <Clock scale={0.21} rotation={[0, -3, 0]}/>, -6.622974872589111,y=2.7990477085113525, z=23.111196517944336
    geometry: <Tea/>, 
    collider: "ball",
    title: "Taza de Té", 
    description: "Un objeto para reconectar con momentos que te han hecho sentir seguro y en calma.",
    found: false,
    category: "aprendizaje",
    shouldFloat: true,
    image: teaImg,
  },
  { 
    id: 14, 
    position: [-10, 9, 5], 
    geometry: <Flores/>, 
    collider: "cuboid",
    title: "Cesta de flores", 
    description: "Estas flores florecen cuando practicas pensamientos compasivos y acciones conscientes.",
    found: false,
    category: "aprendizaje",
    shouldFloat: true,
    image: floresImg,

  },
 
  
  
];

export default achievementsData;
