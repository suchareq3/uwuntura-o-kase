import { Stack, Text } from "@mantine/core";
import type { Category } from "../lib/types";

function JedenNaJedenOverlay({ wszystkieKategorie, wybraneKategorie }: { wszystkieKategorie: Category[]; wybraneKategorie: Category[] }) {
    const selectedIds = new Set(wybraneKategorie.map(k => k.id));

    return (
        <Stack color="dark.1" bg="dark.9" w={"100%"} h={"100%"} align="start" justify="space-between" px={"4rem"} py={"4.0rem"}>
            {wszystkieKategorie.map((kategoria) => (
                <Text 
                    className="vt323-font"
                    size="4.4rem"
                    key={kategoria.id}
                    c={selectedIds.has(kategoria.id) ? 'dark.5' : 'dark.1'}
                    pos={"relative"}
                    top={"-0.8rem"}
                >
                    {kategoria.name}
                </Text>
            ))}
        </Stack>
    );
}

export default JedenNaJedenOverlay;
