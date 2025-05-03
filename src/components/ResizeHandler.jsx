import { useEffect } from "react";
import { useThree } from "@react-three/fiber";

const ResizeHandler = () => {
  const { gl } = useThree();

  useEffect(() => {
    const handleResize = () => {
      gl.setSize(window.innerWidth, window.innerHeight);
      gl.setPixelRatio(window.devicePixelRatio);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [gl]);

  return null;
};

export default ResizeHandler;
