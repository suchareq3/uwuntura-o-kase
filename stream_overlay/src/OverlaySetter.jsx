import LosowanieKategorii from "./LosowanieKategorii";
import StanyKont from "./StanyKont";

export default function OverlaySetter(data) {
  return (
    <>
      <div className="OverlaySetter flex items-end justify-center">
        {/*<p className="truncate">{JSON.stringify(data)}</p>
        <p>{data.pula}</p>*/}
        <StanyKont
          kwotaNiebiescy={data.pula_niebiescy}
          kwotaZieloni={data.pula_zieloni}
          kwotaZolci={data.pula_zolci}
          kwotaMistrzowie={data.pula_mistrzowie}
          pula={data.pula}
        />
      </div>
    </>
  );
}
