import { useState } from "react";

export default function Cube() {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isHover, setIsHover] = useState<boolean>(false)
  return (
    <mesh onClick={() => setIsClicked(!isClicked)} onPointerOver={() => setIsHover(true)} onPointerOut={() => setIsHover(false)}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={isHover ? "green" : "orange"} />
    </mesh>
  );
}
