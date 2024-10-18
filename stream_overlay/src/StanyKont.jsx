import PulaTile from "./PulaTile";

export default function StanyKont({ kwotaZolci, kwotaZieloni, kwotaNiebiescy, kwotaMistrzowie, pula, czyActiveNiebiescy = true, czyActiveZieloni = true, czyActiveZolci = true, czyActiveMistrzowie = false, czyPokazacPule = true }) {
  return (
    <div className="StanyKont flex">
      {czyActiveNiebiescy && (
        <PulaTile
          nazwaDruzyny="niebiescy"
          pula={kwotaNiebiescy}
          opis="STAN KONTA"
        />
      )}

      {czyActiveZieloni && (
        <PulaTile
          nazwaDruzyny="zieloni"
          pula={kwotaZieloni}
          opis="STAN KONTA"
        />
      )}

      {czyActiveZolci && (
        <PulaTile
          nazwaDruzyny="zolci"
          pula={kwotaZolci}
          opis="STAN KONTA"
        />
      )}

      {czyActiveMistrzowie && (
        <PulaTile
          nazwaDruzyny="mistrzowie"
          pula={kwotaMistrzowie}
          opis="STAN KONTA"
        />
      )}
      
      {czyPokazacPule && (
        <PulaTile
          nazwaDruzyny="ogolna"
          pula={pula}
          opis="PULA"
        />
      )}
    </div>
  );
}
