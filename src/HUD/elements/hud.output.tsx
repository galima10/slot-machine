interface HudOutputProps {
    output: string[]
}

export default function HudOutput({ output }: HudOutputProps) {
  return <ul className="output">
    {output.map((symbol, index) => {
        return <li key={index}>{symbol}</li>
    })}
  </ul>;
}
