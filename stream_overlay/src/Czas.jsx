import { useState } from "react";
import Countdown, { zeroPad} from "react-countdown";

export default function Czas() {
  const [date, setDate] = useState(Date.now() + 60000);

  const renderer = ({ minutes, seconds }) => {
    // Render a countdown
    return (
      <p className="awantura-font">
        {minutes}:{zeroPad(seconds)}
      </p>
    );
  };

  return <Countdown renderer={renderer} date={date}/>;
}
