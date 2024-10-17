import PulaTile from "./PulaTile";

export default function KupowaniePodpowiedzi({
  ktoKupuje,
  kwotaPodpowiedzi,
}) {
  return (
    <PulaTile
      nazwaDruzyny={ktoKupuje}
      pula={kwotaPodpowiedzi}
      opis="PODPOWIEDZ"
    />
  );
}
