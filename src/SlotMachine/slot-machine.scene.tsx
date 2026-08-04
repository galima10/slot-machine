import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { SlotMachineModel } from "@/SlotMachine/models/machine.model";
import { CoinModel } from "@/SlotMachine/models/coin.model";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

import { useState, useRef } from "react";

export interface MouseActionState {
  dragging: boolean;
}

export interface SlotMachineHover {
  handle: boolean;
  coinEntry: boolean;
}

export default function SlotMachineScene() {
  const [mouseAction, setMouseAction] = useState<MouseActionState>({
    dragging: false,
  });
  const [machineReady, setMachineReady] = useState<boolean>(false);
  const coinDropping = useRef(false);
  const coinRef = useRef<THREE.Group>(null);
  const [isHover, setIsHover] = useState<SlotMachineHover>({
    handle: false,
    coinEntry: false,
  });
  function insertCoin() {
    if (machineReady) return;
    console.log("pièce insérée !");
    coinRef.current.position.set(-0.72, 2.15, -0.15);

    setIsHover((prev) => ({
      ...prev,
      coinEntry: false,
    }));
    coinRef.current.visible = true;

    setTimeout(() => {
      setMachineReady(true);

      coinDropping.current = true;
    }, 200);
  }

  function coinInserted(delta: number) {
    if (!coinDropping.current || !coinRef.current) return;

    const minY = 1.4;

    coinRef.current.position.y = THREE.MathUtils.damp(
      coinRef.current.position.y,
      minY,
      8,
      delta,
    );

    if (Math.abs(coinRef.current.position.y - minY) < 0.001) {
      coinRef.current.position.y = minY;
      coinDropping.current = false;
    }
  }

  function usingCoin() {
    coinRef.current.visible = false;
  }

  return (
    <Canvas shadows onContextMenu={(e) => e.preventDefault()}>
      {!Object.values(mouseAction).some(Boolean) && (
        <OrbitControls
          enablePan={false}
          mouseButtons={{
            LEFT: THREE.MOUSE.PAN,
            MIDDLE: THREE.MOUSE.DOLLY,
            RIGHT: THREE.MOUSE.ROTATE,
          }}
        />
      )}

      <Environment preset="warehouse" />
      <ambientLight intensity={3} />

      <directionalLight position={[5, 10, 5]} intensity={2} castShadow />
      <group position={[0, -1.75, 0]}>
        <CoinModel
          position={[-0.715, 2.15, -0.1325]}
          visible={false}
          ref={coinRef}
          coinInserted={coinInserted}
        />
        <SlotMachineModel
          setMouseAction={setMouseAction}
          mouseAction={mouseAction}
          setMachineReady={setMachineReady}
          machineReady={machineReady}
          insertCoin={insertCoin}
          isHover={isHover}
          setIsHover={setIsHover}
          usingCoin={usingCoin}
        />
      </group>
    </Canvas>
  );
}
