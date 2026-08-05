import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import type { GLTF } from "three-stdlib";
import { ThreeElements } from "@react-three/fiber";
import { useNodes } from "@/hooks/useNodes";
import {
  useMemo,
  useRef,
  type SetStateAction,
  type Dispatch,
  RefObject,
} from "react";
import { useCoin } from "../hooks/useCoin";
import { useFrame } from "@react-three/fiber";

type CoinMachineModelProps = ThreeElements["group"] & {
  coinDropping: RefObject<boolean>;
  coinRef: RefObject<THREE.Group>;
};

export function CoinModel({
  coinDropping,
  coinRef,
  ...props
}: CoinMachineModelProps) {
  const { nodes, materials } = useNodes("coin");

  useCoin(coinDropping, coinRef);
  return (
    <group {...props} dispose={null} ref={coinRef}>
      <mesh
        geometry={nodes.Coin.geometry}
        material={materials.Material}
        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
        scale={[0.092, 0.015, 0.092]}
      />
    </group>
  );
}

useGLTF.preload("/coin.glb");
