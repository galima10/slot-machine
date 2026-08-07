interface HudOutputProps {
  output: string[];
  isWinning: boolean;
}

export default function HudOutput({ output, isWinning }: HudOutputProps) {
  return (
    <ul className={`output ${isWinning ? "win" : null}`}>
      {output.map((symbol, index) => {
        return <li key={index}>{symbol}</li>;
      })}
    </ul>
  );
}
