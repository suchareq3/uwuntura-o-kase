import LosowanieKategorii from "./LosowanieKategorii";
import StanyKont from "./StanyKont";

export default function OverlaySetter(data) {
  if (!data.stream_json.overlay || data.stream_json.overlay === "wylaczony") {
    return null;
  }
  return (
    <>
      <div className="OverlaySetter flex items-end justify-center">
        {/*<p className="truncate">{JSON.stringify(data)}</p>
        <p>{data.pula}</p>*/}
        {data.stream_json.overlay === "stany-kont" && 
          <StanyKont
            kwotaNiebiescy={data.pula_niebiescy}
            kwotaZieloni={data.pula_zieloni}
            kwotaZolci={data.pula_zolci}
            kwotaMistrzowie={data.pula_mistrzowie}
            pula={data.pula}
            czyGraNiebiescy={data.czy_gra_niebiescy}
            czyGraZieloni={data.czy_gra_zieloni}
            czyGraZolci={data.czy_gra_zolci}
            czyGraMistrzowie={data.czy_gra_mistrzowie}
            />}
        
      </div>
    </>
  );
}
