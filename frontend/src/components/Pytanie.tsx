import { Grid, Group, SimpleGrid, Stack, Text } from "@mantine/core";

export default function Pytanie({ ktoOdpowiada, runda, nazwaKategorii, trescPytania, podpowiedzi, pokazPodpowiedzi = false, customClasses, customOpisClasses, customTrescPytaniaClasses, showOpis = true, customPodpowiedziClasses, pula, odpowiedz = '' }: { ktoOdpowiada: string, runda: number, nazwaKategorii: string, trescPytania: string, podpowiedzi?: string, pokazPodpowiedzi?: boolean, customClasses?: string, customOpisClasses?: string, customTrescPytaniaClasses?: string, showOpis?: boolean, customPodpowiedziClasses?: string, pula: number, odpowiedz: string }) {
  const podpowiedziArray = ([...((podpowiedzi?.split(',') || [])), odpowiedz]
    .map((s) => s.trim()))
    .sort(() => Math.random() - 0.5); //not an ideal implementation of shuffling, should be backend, but whatever omg it's FINE

  return (
    <Stack gap={0} w={"100%"} className={"Pytanie questrial-font " + customClasses + " " + ktoOdpowiada}>
      {showOpis && (
        <Group justify="between" px={"12px"} className={"opis " + customOpisClasses}>
          <Text>PYTANIE {runda}</Text>
          <div style={{flex: 1}}>
            <Text>{nazwaKategorii}</Text>
          </div>
          <Group gap={"md"}>
            <Text>DO WYGRANIA</Text>
            <Text fw={"bold"} pl={"sm"}>{pula}</Text>
            <Text>PKT</Text>
          </Group>
        </Group>
      )}
      <Stack h={"100%"} px={"28px"} py={"16px"} fz={"1.875rem"} lh={"calc(2.25 / 1.875)"} className={"tresc-pytania " + customTrescPytaniaClasses}>
        <Text fz={"1.75rem"} fw={"semibold"} fs="italic">{trescPytania}</Text>
        {(podpowiedzi && pokazPodpowiedzi) && (
          <SimpleGrid cols={4} spacing={"sm"} px={"50px"} className={"divide-slate-400 border-b border-slate-300" + customPodpowiedziClasses}>
            {podpowiedziArray?.map((podpowiedz) => (
              <Text style={{overflowWrap: "break-word"}} fz={"1.6rem"} key={podpowiedz}>
                {podpowiedz}
              </Text>
            ))}
          </SimpleGrid>
        )}
      </Stack>
    </Stack>
  );
}
