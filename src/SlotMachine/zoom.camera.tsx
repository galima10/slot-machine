import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

interface CameraZoomProps {
  gameStarted: boolean;
}

export function CameraZoom({ gameStarted }: CameraZoomProps) {
  const { camera } = useThree();

  const targetPosition = useRef(new THREE.Vector3(0, 2, 5));
  const hasZoomed = useRef(false);

  function zoom(delta: number) {
    if (!gameStarted || hasZoomed.current) return;

    camera.position.lerp(targetPosition.current, delta * 2);

    if (camera.position.distanceTo(targetPosition.current) < 0.01) {
      camera.position.copy(targetPosition.current);
      hasZoomed.current = true;
      console.log("zoom")
    }
  }

  useFrame((_, delta) => {
    zoom(delta);
  });

  return null;
}
