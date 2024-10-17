import LosowanieKategorii from "./LosowanieKategorii";
import StanyKont from "./StanyKont";
import Licytacja from "./Licytacja";
import KupowaniePodpowiedzi from "./KupowaniePodpowiedzi";

export default function OverlaySetter(data) {
  if (!data.stream_json.overlay || data.stream_json.overlay === "wylaczony") {
    return null;
  }

  const czyFinal = data.runda >= 7;

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
            czyActiveNiebiescy={data.czy_gra_niebiescy}
            czyActiveZieloni={data.czy_gra_zieloni}
            czyActiveZolci={data.czy_gra_zolci}
            czyActiveMistrzowie={czyFinal}
          />
        )}
        {data.stream_json.overlay === "licytacja" && (
          <>
            <Licytacja
              kwotaNiebiescy={data.pula_niebiescy_runda}
              kwotaZieloni={data.pula_zieloni_runda}
              kwotaZolci={data.pula_zolci_runda}
              kwotaMistrzowie={data.pula_mistrzowie_runda}
              czyActiveNiebiescy={data.czy_gra_niebiescy}
              czyActiveZieloni={data.czy_gra_zieloni}
              czyActiveZolci={data.czy_gra_zolci}
              czyActiveMistrzowie={czyFinal}
            />
            <StanyKont
              kwotaNiebiescy={data.pula_niebiescy}
              kwotaZieloni={data.pula_zieloni}
              kwotaZolci={data.pula_zolci}
              kwotaMistrzowie={data.pula_mistrzowie}
              pula={data.pula}
              czyActiveNiebiescy={data.czy_gra_niebiescy}
              czyActiveZieloni={data.czy_gra_zieloni}
              czyActiveZolci={data.czy_gra_zolci}
              czyActiveMistrzowie={czyFinal}
            />
          </>
        )}
        {/*TODO: poprawic zeby odbieralo dane z backendu*/}
        {data.stream_json.overlay === "kupowanie-podpowiedzi" && (
          <>
            <KupowaniePodpowiedzi ktoKupuje={"zolci"} kwotaPodpowiedzi={1000}/>
            <StanyKont
              kwotaNiebiescy={data.pula_niebiescy}
              kwotaZieloni={data.pula_zieloni}
              kwotaZolci={data.pula_zolci}
              kwotaMistrzowie={data.pula_mistrzowie}
              pula={data.pula}
              czyActiveNiebiescy={false}
              czyActiveZieloni={false}
              czyActiveZolci={true}
              czyActiveMistrzowie={false}
            />
          </>
        )}
        {data.stream_json.overlay === "losowanie-kategorii" && <></>}
      </div>
    </>
  );
}
