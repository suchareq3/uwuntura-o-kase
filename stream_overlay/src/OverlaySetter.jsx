import StanyKont from "./StanyKont";
import Licytacja from "./Licytacja";
import Pytanie from "./Pytanie";
import Czas from "./Czas";

export default function OverlaySetter(props) {

  const data = props; // wszystko z '...data'
  
  if (!data.stream_json.overlay || data.stream_json.overlay === "wylaczony") {
    return null;
  }

  const czyFinal = data.runda >= 7;

  return (
    <>
      
      <div className="OverlaySetter flex flex-col justify-end relative">
        {/*<p className="truncate">{JSON.stringify(data)}</p>
        <p>{data.pula}</p>*/}
        {data.stream_json.czas && <div className="absolute top-0 right-0 p-2 text-6xl mistrzowie-info czas"><Czas/></div>}
        {data.stream_json.overlay === "stany-kont" && <StanyKont kwotaNiebiescy={data.pula_niebiescy} kwotaZieloni={data.pula_zieloni} kwotaZolci={data.pula_zolci} kwotaMistrzowie={data.pula_mistrzowie} pula={data.pula} czyActiveNiebiescy={data.czy_gra_niebiescy} czyActiveZieloni={data.czy_gra_zieloni} czyActiveZolci={data.czy_gra_zolci} czyActiveMistrzowie={czyFinal} />}
        {data.stream_json.overlay === "licytacja" && (
          <>
            <Licytacja kwotaNiebiescy={data.pula_niebiescy_runda} kwotaZieloni={data.pula_zieloni_runda} kwotaZolci={data.pula_zolci_runda} kwotaMistrzowie={data.pula_mistrzowie_runda} czyActiveNiebiescy={data.czy_gra_niebiescy} czyActiveZieloni={data.czy_gra_zieloni} czyActiveZolci={data.czy_gra_zolci} czyActiveMistrzowie={czyFinal} />
            <StanyKont kwotaNiebiescy={data.pula_niebiescy} kwotaZieloni={data.pula_zieloni} kwotaZolci={data.pula_zolci} kwotaMistrzowie={data.pula_mistrzowie} pula={data.pula} czyActiveNiebiescy={data.czy_gra_niebiescy} czyActiveZieloni={data.czy_gra_zieloni} czyActiveZolci={data.czy_gra_zolci} czyActiveMistrzowie={czyFinal} />
          </>
        )}
        {data.stream_json.overlay === "pytanie" && (
          <>
            <Pytanie runda={data.runda} nazwaKategorii={data.kategoria} trescPytania={data.tresc_pytania} ktoOdpowiada={data.wygral_licytacje} pula={data.pula} />
          </>
        )}
        {data.stream_json.overlay === "pytanie-podpowiedzi" && (
          <>
            <Pytanie runda={data.runda} nazwaKategorii={data.kategoria} trescPytania={data.tresc_pytania} ktoOdpowiada={data.wygral_licytacje} pula={data.pula} podpowiedzi={data.podpowiedz} pokazPodpowiedzi={true} />
          </>
        )}
      </div>
    </>
  );
}
