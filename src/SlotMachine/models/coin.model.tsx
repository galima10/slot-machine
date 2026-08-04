import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import type { GLTF } from "three-stdlib";
import { ThreeElements } from "@react-three/fiber";
import { useNodes } from "@/hooks/useNodes";
import { useMemo, useRef, type SetStateAction, type Dispatch } from "react";
import { useCoin } from "../hooks/useCoin";
import { useFrame } from "@react-three/fiber";

type CoinMachineModelProps = ThreeElements["group"] & {
  // dropping: boolean;
  // setIsCoinDropping: Dispatch<SetStateAction<boolean>>;
  coinInserted: (delta: number) => void;
};

export function CoinModel({ coinInserted, ...props }: CoinMachineModelProps) {
  const { nodes, materials } = useNodes("coin");
  useFrame((_, delta) => {
    coinInserted(delta);
  });
  return (
    <group {...props} dispose={null}>
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
