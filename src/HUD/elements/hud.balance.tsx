import CoinSvg from "@/assets/coin.svg";

interface HudBalanceProps {
  coins: number;
}

export default function HudBalance({ coins }: HudBalanceProps) {
  return <div className="balance">
    <p>{coins} x</p>
    <CoinSvg />
  </div>;
}
