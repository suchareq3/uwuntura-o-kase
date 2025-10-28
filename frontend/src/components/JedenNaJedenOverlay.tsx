import { Stack, Text } from "@mantine/core";
import type { Category } from "../lib/types";

function JedenNaJedenOverlay({ wszystkieKategorie, wybraneKategorie, isMobile=false }: { wszystkieKategorie: Category[]; wybraneKategorie: Category[]; isMobile?: boolean }) {
    const selectedIds = new Set(wybraneKategorie.map(k => k.id));

    return (
        <Stack color="dark.1" bg="dark.9" w={"100%"} gap={isMobile ? "sm" : "md"} h={isMobile ? "auto" : "100%"} align="start" justify="space-between" px={isMobile ? "1.2rem" : "4rem"} py={isMobile ? "1.5rem" : "4rem"}>
            {wszystkieKategorie.map((kategoria) => (
                <Text 
                    className="vt323-font"
                    size={isMobile ? "2.5rem" : "4.4rem"}
                    key={kategoria.id}
                    c={selectedIds.has(kategoria.id) ? 'dark.5' : 'dark.1'}
                    pos={"relative"}
                    top={isMobile ? "0rem" : "-0.8rem"}
                    truncate
                >
                    {kategoria.name}
                </Text>
            ))}
        </Stack>
    );
}

export default JedenNaJedenOverlay;
