import PulaTile from "./PulaTile";

export default function KupowaniePodpowiedzi({ ktoKupuje, kwotaPodpowiedzi }) {
  return (
    <div className="KupowaniePodpowiedzi">
      <PulaTile
        nazwaDruzyny={ktoKupuje}
        pula={kwotaPodpowiedzi}
        opis="PODPOWIEDZ"
      />
      <div className="space-waster"></div>
    </div>
  );
}
