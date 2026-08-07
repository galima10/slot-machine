import { payouts, symbols } from "@/SlotMachine/constants/symbols";

interface Payout {
  coins: number;
}

export default function HudPayouts() {
  return (
    <div className="payouts">
      <p className="payouts-title">Gains</p>
      <ul>
        {(Object.entries(payouts) as [string, Payout][]).map(
          ([line, payout], index) => {
            const arrLine = line.split(",").map((symbol) => symbols[symbol]);
            return (
              <li key={index}>
                <p>{arrLine.join("")} -</p>
                <p className="coins">{payout.coins} pc</p>
              </li>
            );
          },
        )}
      </ul>
    </div>
  );
}
