import { Divider, Group, SimpleGrid, Stack, Text } from "@mantine/core";
import Czas from "./Czas";

export default function Pytanie({ ktoOdpowiada, runda, nazwaKategorii, trescPytania, podpowiedzi, pokazPodpowiedzi = false, customClasses, customOpisClasses, customTrescPytaniaClasses, showOpis = true, customPodpowiedziClasses, pula, odpowiedz = '', isMobile = false, customOpisHeight, questionDeadline }: { ktoOdpowiada: string, runda: number, nazwaKategorii: string, trescPytania: string, podpowiedzi?: string, pokazPodpowiedzi?: boolean, customClasses?: string, customOpisClasses?: string, customTrescPytaniaClasses?: string, showOpis?: boolean, customPodpowiedziClasses?: string, pula?: number, odpowiedz: string, isMobile?: boolean, customOpisHeight?: string, questionDeadline?: Date }) {
  const podpowiedziArray = ([...((podpowiedzi?.split(',') || [])), odpowiedz]
    .map((s) => s.trim()))
    .sort(() => Math.random() - 0.5); //not an ideal implementation of shuffling, should be backend, but whatever omg it's FINE

  return (
    <Stack gap={0} w={"100%"} className={"Pytanie questrial-font " + customClasses + " " + ktoOdpowiada}>
      {showOpis && (
        <Group pos={"relative"} h={customOpisHeight ?? "auto"} justify={!isMobile ? "between" : ""} px={"12px"} className={"opis " + customOpisClasses}>
          <Text>PYTANIE {runda}</Text>
          {!isMobile && ( 
            <>
              <div style={{flex: 1}}>
                <Text>{nazwaKategorii}</Text>
              </div>
            
              <Group gap={"md"}>
                <Text>DO WYGRANIA</Text>
                <Text fw={"bold"} pl={"sm"}>{pula}</Text>
                <Text>PKT</Text>
              </Group>
            </>
            
          )}
          {isMobile && questionDeadline && <Czas date={questionDeadline} textSize="2rem" showBg={false}/>}

        </Group>
      )}
      <Stack gap={0} px={!isMobile ? "28px" : "12px"} py={!isMobile ? "16px" : "8px"} fz={!isMobile ? "1.875rem" : "1.25rem"} lh={"sm"} className={"tresc-pytania " + customTrescPytaniaClasses}>
        <Text fz={!isMobile ? "1.75rem" : "1.5rem"} fw={"semibold"} fs="italic" lh={"sm"}>{trescPytania}</Text>
        {(podpowiedzi && pokazPodpowiedzi) && (
          <>
            <Divider my="md"/>
            <SimpleGrid cols={!isMobile ? 4 : 2} spacing={"sm"} px={!isMobile ? "50px" : "0px"} className={"divide-slate-400 border-b border-slate-300" + customPodpowiedziClasses}>
              {podpowiedziArray?.map((podpowiedz) => (
                <Text style={{overflowWrap: "break-word"}} fz={!isMobile ? "1.6rem" : "1.4rem"} key={podpowiedz}>
                  {podpowiedz}
                </Text>
              ))}
            </SimpleGrid>
          </>
        )}
      </Stack>
    </Stack>
  );
}
