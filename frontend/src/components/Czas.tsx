import { Box, Text } from "@mantine/core";
import Countdown, { zeroPad} from "react-countdown";

export default function Czas({date, textSize="4rem", showBg=true}: {date: Date, textSize?: string, showBg?: boolean}) {

  const renderer = ({ minutes, seconds }: { minutes: number; seconds: number }) => {
    return (
      <Box bg={showBg ? "rgba(0,0,0,0.3)" : "transparent"} pos="absolute" top="0px" right="0px" px="8px" className="mistrzowie-info czas">
        <Text fz={textSize} className="awantura-font">
          {minutes}:{zeroPad(seconds)}
        </Text>
      </Box>
    );
  };

  return <Countdown renderer={renderer} date={date}/>;
}
