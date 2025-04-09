import Candle from "../../models/Candle";
import Clock from "../../models/Clock";
import Flowerpot from "../../models/Flowerpot";
import Popsicle from "../../models/Popsicle";
import Seashell from "../../models/Seashell";

const achievementsData = [
  { 
    id: 1, 
    position: [-19.953176, 6, 21.9437], 
    geometry: <Seashell scale={0.7} />, 
    collider: "ball",
    title: "Minijuego pensamientos positivos", 
    description: "Has encontrado la maceta que simboliza el crecimiento personal y la calma interior.",
    found: false,
    category: "pensamientos"
  },
  {  
    id: 2, 
    position: [-25.59708, 5, 21.04], 
    geometry: <Flowerpot scale={4} />, 
    collider: "ball",
    title: "Eco Tranquilo", 
    description: "Esta caracola resuena con sonidos relajantes, ayudando a calmar la mente en momentos de ansiedad. contiene los susurros de las olas. Escucha atentamente.",
    found: false,
    category: "mindfulness"
  },
  { 
    id: 3, 
    position: [-18, 6, 25.83], 
    geometry: <Flowerpot scale={4} />, 
    collider: "cuboid",
    title: "Caja de los Pensamientos", 
    description: "Un espacio para encerrar preocupaciones y dejarlas atrás, promoviendo un estado de relajación.",
    found: false,
    category: "mindfulness"
  },
  { 
    id: 4, 
    position: [-23.2536, 6, 25.40], 
    geometry: <Flowerpot scale={4} />, 
    collider: "ball",
    title: "Esfera del Control", 
    description: "Representa el equilibrio entre emociones y pensamientos, guiándote hacia la estabilidad emocional.",
    found: false,
    category: "mindfulness", 
  },
  { 
    id: 5, 
    position: [-14, 6, 27.4], 
    geometry: <Flowerpot scale={4} />, 
    collider: "cuboid",
    title: "Cofre del Autoconocimiento", 
    description: "Dentro de esta caja se encuentran herramientas para comprender mejor la ansiedad y afrontarla con serenidad. Dicen que quien posea esta caja tendrá el poder de cambiar su propio destino.",
    found: false,
    category: "mindfulness", 
  },
  { 
    id: 6, 
    position: [-10.6, 6,27.05], 
    geometry: <Flowerpot scale={4} />, 
    collider: "ball",
    title: "Melodía del Mar", 
    description: "Esta caracola contiene el eco de las olas, recordándote que la calma está en tu interior.",
    found: false,
    category: "mindfulness", 
  },
  { 
    id: 7, 
    position: [-26.177, 6,  23.469], 
    geometry: <Popsicle scale={2} />, 
    collider: "cuboid",
    title: "Raíces de Fortaleza", 
    description: "Un símbolo de crecimiento y resiliencia. Cada reto superado fortalece tus raíces.",
    found: false,
    category: "aprendizaje"
  },
  { 
    id: 8, 
    position: [-20.90,6, 26.5450057], 
    geometry: <Popsicle scale={2} />, 
    collider: "ball",
    title: "Susurro del Viento", 
    description: "Cuando la ansiedad te abrume, recuerda que el viento siempre encuentra su camino.",
    found: false,
    category: "aprendizaje"
  },
  { 
    id: 9, 
    position: [-16.084, 6, 27.87], 
    geometry: <Popsicle scale={2} />, 
    collider: "cuboid",
    title: "Semilla de la Esperanza", 
    description: "Cada pequeño esfuerzo que hagas crecerá con el tiempo. Nunca subestimes tu progreso.",
    found: false,
    category: "aprendizaje"
  },
  { 
    id: 10, 
    position: [-11.905, 6, 28.108], 
    geometry: <Popsicle scale={2} />, 
    collider: "ball",
    title: "Cántico del Océano", 
    description: "Sintoniza con la paz del océano y deja que sus sonidos disipen tus preocupaciones.",
    found: false,
    category: "aprendizaje"
  },
  { 
    id: 11, 
    position: [-7.525, 6, 26.83], 
    geometry: <Popsicle scale={2} />, 
    collider: "cuboid",
    title: "El Árbol del Equilibrio", 
    description: "Sus raíces profundas y ramas abiertas representan la armonía entre mente y cuerpo.",
    found: false,
    category: "aprendizaje"
  },
  { 
    id: 12, 
    position: [-11.190, 6, 24.53], 
    geometry: <Clock scale={0.21} rotation={[0, -3, 0]}/>, 
    collider: "ball",
    title: "Eco del Recuerdo", 
    description: "Esta caracola guarda los ecos de momentos felices. Escúchalos cuando necesites ánimo.",
    found: false,
    category: "aprendizaje"
  },
  { 
    id: 13, 
    position: [-13.682, 6, 24.87], 
    geometry: <Clock scale={0.21} rotation={[0, -3, 0]}/>, 
    collider: "cuboid",
    title: "Jardín Interior", 
    description: "Cultiva pensamientos positivos como si fueran flores. Con tiempo y paciencia, florecerán.",
    found: false,
    category: "aprendizaje"
  },
  { 
    id: 14, 
    position: [-18,  6, 24.2887], 
    geometry: <Clock scale={0.21} rotation={[0, -3, 0]}/>, 
    collider: "ball",
    title: "Armonía de las Mareas", 
    description: "El ritmo del mar nos enseña que todo en la vida tiene su flujo y reflujo. Confía en el proceso.",
    found: false,
    category: "aprendizaje"
  },
  { 
    id: 15, 
    position: [-22,  6, -22.703], 
    geometry: <Clock scale={0.21} rotation={[0, -3, 0]} />,  
    collider: "cuboid",
    title: "Raíz del Enfoque", 
    description: "Concéntrate en el presente y permite que tus pensamientos crezcan en la dirección correcta.",
    found: false,
    category: "aprendizaje"
  },
  { 
    id: 16, 
    position: [-22.993,  6, 22.962], 
    geometry: <Clock scale={0.21} rotation={[0, -3, 0]} />, 
    collider: "ball",
    title: "Jardín de la Serenidad", 
    description: "Has encontrado la maceta que simboliza el crecimiento personal y la calma interior.",
    found: false,
    category: "aprendizaje"
  },
  { 
    id: 17, 
    position: [-13.42, 5, 21.14], 
    geometry: <Candle scale={5} />, 
    collider: "ball",
    title: "Estrategias para la Calma", 
    description: "Has encontrado una vela, que representa la tecnica mindfulness para calmar la ansiedad",
    found: false,
    category: "iniciarMinfulness"
  },
];

export default achievementsData;
