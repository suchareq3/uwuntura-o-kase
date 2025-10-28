import { Group, Stack, Text } from "@mantine/core";

export default function PulaTile({ nazwaDruzyny = "", pula, opis, customWidth, customOpisHeight, pulaHeight = "100%", customOpisClasses, customKwotaFontSize, customClasses }: { nazwaDruzyny: string, pula: number, opis?: string, customWidth?: string, customOpisHeight?: string, pulaHeight?: string, customOpisClasses?: string, customKwotaFontSize?: string, customClasses?: string }) {
  if (nazwaDruzyny == "space-waster") {
    return <div className="space-waster"></div>;
  }

  const pulaWidth = customWidth ? customWidth : nazwaDruzyny === "ogolna" ? "28%" : "24%";

  return (
    <Stack classNames={{ root: [nazwaDruzyny, customClasses].join(" ") }} w={pulaWidth} h={pulaHeight} gap={0}>
      {opis && (
        <div
          className={"opis eurostile-font " + customOpisClasses}
          style={{ height: customOpisHeight ?? undefined, justifyContent: "center" }}
        >
          <Text lts={nazwaDruzyny === "ogolna" ? "4px" : undefined} fz={customKwotaFontSize ?? "1.25rem"}>{opis}</Text>
        </div>
      )}
      <Group classNames={{root: "awantura-font " + nazwaDruzyny + "-pula " }} flex={1} justify="center" align="center" gap={0}
        
      >
        <Text fz={customKwotaFontSize ?? "3rem"} lh={"initial"}>{pula}</Text>
      </Group>
    </Stack>
  );
}
