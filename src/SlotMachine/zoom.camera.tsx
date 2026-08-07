import { useFrame, useThree } from "@react-three/fiber";
import {
  useRef,
  type RefObject,
  type Dispatch,
  type SetStateAction,
} from "react";
import * as THREE from "three";

interface CameraZoomProps {
  gameStarted: boolean;
  setCanPlay: Dispatch<SetStateAction<boolean>>;
}

export function CameraZoom({ gameStarted, setCanPlay }: CameraZoomProps) {
  const { camera } = useThree();

  const targetPosition = useRef(new THREE.Vector3(0, 0.4, 5));
  const hasZoomed = useRef(false);

  function zoom(delta: number) {
    if (!gameStarted || hasZoomed.current) return;

    camera.position.lerp(targetPosition.current, delta * 2);

    if (camera.position.distanceTo(targetPosition.current) < 0.01) {
      camera.position.copy(targetPosition.current);
      hasZoomed.current = true;
      setCanPlay(true);
    }
  }

  useFrame((_, delta) => {
    zoom(delta);
  });

  return null;
}
