import LosowanieKategorii from "./LosowanieKategorii";
import StanyKont from "./StanyKont";
import Licytacja from "./Licytacja";

export default function OverlaySetter(data) {
  if (!data.stream_json.overlay || data.stream_json.overlay === "wylaczony") {
    return null;
  }

  const czyFinal = (data.runda >= 7)

  return (
    <>
      <div className="OverlaySetter flex flex-col justify-end">
        {/*<p className="truncate">{JSON.stringify(data)}</p>
        <p>{data.pula}</p>*/}
        {data.stream_json.overlay === "stany-kont" && (
          <StanyKont
            kwotaNiebiescy={data.pula_niebiescy}
            kwotaZieloni={data.pula_zieloni}
            kwotaZolci={data.pula_zolci}
            kwotaMistrzowie={data.pula_mistrzowie}
            pula={data.pula}
            czyGraNiebiescy={data.czy_gra_niebiescy}
            czyGraZieloni={data.czy_gra_zieloni}
            czyGraZolci={data.czy_gra_zolci}
            czyGraMistrzowie={czyFinal}
          />
        )}
        {data.stream_json.overlay === "licytacja" && (
          <>
            <Licytacja
              kwotaNiebiescy={data.pula_niebiescy_runda}
              kwotaZieloni={data.pula_zieloni_runda}
              kwotaZolci={data.pula_zolci_runda}
              kwotaMistrzowie={data.pula_mistrzowie_runda}
              czyGraNiebiescy={data.czy_gra_niebiescy}
              czyGraZieloni={data.czy_gra_zieloni}
              czyGraZolci={data.czy_gra_zolci}
              czyGraMistrzowie={czyFinal}
            />
            <StanyKont
              kwotaNiebiescy={data.pula_niebiescy}
              kwotaZieloni={data.pula_zieloni}
              kwotaZolci={data.pula_zolci}
              kwotaMistrzowie={data.pula_mistrzowie}
              czyGraNiebiescy={data.czy_gra_niebiescy}
              czyGraZieloni={data.czy_gra_zieloni}
              czyGraZolci={data.czy_gra_zolci}
              czyGraMistrzowie={czyFinal}
            />
          </>
        )}

        {data.stream_json.overlay === "losowanie-kategorii" && <></>}
      </div>
    </>
  );
}
