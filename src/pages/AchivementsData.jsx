import Flowerpot from "../models/Flowerpot";
import Seashell from "../models/Seashell";

const achievementsData = [
  { 
    id: 1, 
    position: [-38, -3, 19], 
    geometry: <Flowerpot scale={4} />, 
    collider: "ball",
    title: "Jardín de la Serenidad", 
    description: "Has encontrado la maceta que simboliza el crecimiento personal y la calma interior.",
    found: false
  },
  { 
    id: 2, 
    position: [-30, -4, 16], 
    geometry: <Seashell scale={0.7} />, 
    collider: "ball",
    title: "Eco Tranquilo", 
    description: "Esta caracola resuena con sonidos relajantes, ayudando a calmar la mente en momentos de ansiedad. contiene los susurros de las olas. Escucha atentamente.",
    found: false
  },
  { 
    id: 3, 
    position: [-15, 0, 11], 
    geometry: <Flowerpot scale={4} />, 
    collider: "cuboid",
    title: "Caja de los Pensamientos", 
    description: "Un espacio para encerrar preocupaciones y dejarlas atrás, promoviendo un estado de relajación.",
    found: false
  },
  { 
    id: 4, 
    position: [-6, 1, -3], 
    geometry: <Seashell scale={0.7} />, 
    collider: "ball",
    title: "Esfera del Control", 
    description: "Representa el equilibrio entre emociones y pensamientos, guiándote hacia la estabilidad emocional.",
    found: false
  },
  { 
    id: 5, 
    position: [-30, 0, -13], 
    geometry: <Flowerpot scale={4} />, 
    collider: "cuboid",
    title: "Cofre del Autoconocimiento", 
    description: "Dentro de esta caja se encuentran herramientas para comprender mejor la ansiedad y afrontarla con serenidad. Dicen que quien posea esta caja tendrá el poder de cambiar su propio destino.",
    found: false
  },
  { 
    id: 6, 
    position: [-20, -2, 8], 
    geometry: <Seashell scale={0.7} />, 
    collider: "ball",
    title: "Melodía del Mar", 
    description: "Esta caracola contiene el eco de las olas, recordándote que la calma está en tu interior.",
    found: false
  },
  { 
    id: 7, 
    position: [-12, -1, 14], 
    geometry: <Flowerpot scale={4} />, 
    collider: "cuboid",
    title: "Raíces de Fortaleza", 
    description: "Un símbolo de crecimiento y resiliencia. Cada reto superado fortalece tus raíces.",
    found: false
  },
  { 
    id: 8, 
    position: [-25, 1, -6], 
    geometry: <Seashell scale={0.7} />, 
    collider: "ball",
    title: "Susurro del Viento", 
    description: "Cuando la ansiedad te abrume, recuerda que el viento siempre encuentra su camino.",
    found: false
  },
  { 
    id: 9, 
    position: [-5, 3, 10], 
    geometry: <Flowerpot scale={4} />, 
    collider: "cuboid",
    title: "Semilla de la Esperanza", 
    description: "Cada pequeño esfuerzo que hagas crecerá con el tiempo. Nunca subestimes tu progreso.",
    found: false
  },
  { 
    id: 10, 
    position: [-18, -4, -12], 
    geometry: <Seashell scale={0.7} />, 
    collider: "ball",
    title: "Cántico del Océano", 
    description: "Sintoniza con la paz del océano y deja que sus sonidos disipen tus preocupaciones.",
    found: false
  },
  { 
    id: 11, 
    position: [-7, 2, -8], 
    geometry: <Flowerpot scale={4} />, 
    collider: "cuboid",
    title: "El Árbol del Equilibrio", 
    description: "Sus raíces profundas y ramas abiertas representan la armonía entre mente y cuerpo.",
    found: false
  },
  { 
    id: 12, 
    position: [-22, 0, 5], 
    geometry: <Seashell scale={0.7} />, 
    collider: "ball",
    title: "Eco del Recuerdo", 
    description: "Esta caracola guarda los ecos de momentos felices. Escúchalos cuando necesites ánimo.",
    found: false
  },
  { 
    id: 13, 
    position: [-3, -3, -15], 
    geometry: <Flowerpot scale={4} />, 
    collider: "cuboid",
    title: "Jardín Interior", 
    description: "Cultiva pensamientos positivos como si fueran flores. Con tiempo y paciencia, florecerán.",
    found: false
  },
  { 
    id: 14, 
    position: [-28, 2, 7], 
    geometry: <Seashell scale={0.7} />, 
    collider: "ball",
    title: "Armonía de las Mareas", 
    description: "El ritmo del mar nos enseña que todo en la vida tiene su flujo y reflujo. Confía en el proceso.",
    found: false
  },
  { 
    id: 15, 
    position: [-10, -1, -20], 
    geometry: <Flowerpot scale={4} />, 
    collider: "cuboid",
    title: "Raíz del Enfoque", 
    description: "Concéntrate en el presente y permite que tus pensamientos crezcan en la dirección correcta.",
    found: false
  }
];

export default achievementsData;
