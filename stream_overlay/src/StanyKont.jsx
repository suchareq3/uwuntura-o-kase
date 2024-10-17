import PulaTile from "./PulaTile"

export default function StanyKont({
  kwotaZolci,
  kwotaZieloni,
  kwotaNiebiescy,
  kwotaMistrzowie,
  pula,
  czyActiveNiebiescy = true,
  czyActiveZieloni = true,
  czyActiveZolci = true,
  czyActiveMistrzowie = false,
}) {
  return (
    <div className="StanyKont flex awantura-font">
      {czyActiveNiebiescy && !czyActiveMistrzowie && (
        <PulaTile nazwaDruzyny="niebiescy" pula={kwotaNiebiescy} opis="STAN KONTA"/>
      )}

      {czyActiveZieloni && !czyActiveMistrzowie && (
        <PulaTile nazwaDruzyny="zieloni" pula={kwotaZieloni} opis="STAN KONTA"/>
      )}

      {czyActiveZolci && !czyActiveMistrzowie && (
        <PulaTile nazwaDruzyny="zolci" pula={kwotaZolci} opis="STAN KONTA"/>
      )}

      {czyActiveMistrzowie && (
        <PulaTile nazwaDruzyny="mistrzowie" pula={kwotaMistrzowie} opis="STAN KONTA"/>
      )}

      <PulaTile nazwaDruzyny="ogolna" pula={pula} opis="PULA"/>

    </div>
  );
}
