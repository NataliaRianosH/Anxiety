import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Character from '../models/Character';
import Man from '../models/Man';
import Alternative from '../models/Alternative';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';


const AvatarView = () => {
  const [animation, setAnimation] = useState('Female_Idle');
  const avatarRef = useRef();
  const [rotationY, setRotationY] = useState(0);
  const { user, partida } = useAuth();
  const avatarSkin = partida?.avatar_skin || "Female";

  const isDragging = useRef(false);
  const lastX = useRef(0);

  useEffect(() => {
   // console.log(animation);
  }, []);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    lastX.current = e.clientX; // Guardar la posición inicial
  };  

  const handleMouseUp = () => {
    isDragging.current = false;
  };
  

  const handleMouseMove = (e) => {
    if (!isDragging.current) return; // Si no está arrastrando, no hace nada
  
    const deltaX = e.clientX - lastX.current; // Diferencia entre la posición anterior y la nueva
    lastX.current = e.clientX; // Actualizar la última posición del cursor
  
    setRotationY((prev) => prev + deltaX * 0.01); // Sumar el cambio al ángulo de rotación
  };
  

  const handleClick = () => {
    if (avatarSkin === "Female" || avatarSkin === "Alternative") {
      setAnimation("Female_Jump");
    } else {
      setAnimation("HumanArmature|Man_Jump");
    }
  
    setTimeout(() => {
      setAnimation(avatarSkin === "Female" || avatarSkin === "Alternative" ? "Female_Idle" : "Man_Idle");
    }, 1000);
  };

  return (
    <div className="avatar-placeholder" onDoubleClick={handleClick} onMouseDown={handleMouseDown} 
    onMouseMove={handleMouseMove} 
    onMouseUp={handleMouseUp}>
      <Canvas camera={{ position: [0, 0, 5], fov: 40 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[0, 10, 0]} angle={0.15} intensity={1} />
        
        <group ref={avatarRef}>
          {avatarSkin === 'Female' && <Character animation={animation} position={[0, -2.6, -3.5]} rotation={[0.2, rotationY, 0]} />}
          {avatarSkin === 'Alternative' && <Alternative animation={animation} position={[0, -2.6, -3.5]} rotation={[0.2, rotationY, 0]} />}
          {avatarSkin === 'Man' && <Man animation={animation} position={[0, -2.6, -3.5]} rotation={[0.2, rotationY, 0]} />}
        </group>

        
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  );
};

export default AvatarView;
