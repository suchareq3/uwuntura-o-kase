import PulaTile from "./PulaTile";

export default function WykupienieZadownika({ ktoKupuje, kwotaDruzyny, kwotaMistrzowie}) {
  return (
    <div className="WykupienieZawodnika flex flex-col">
      <div className="flex w-full justify-center ">
        <div
          className="opis"
          style={{ width: "48%" }}
        >
          <p>WYKUPIENIE ZAWODNIKA</p>
        </div>
      </div>
      <div className="flex w-full h-full justify-center">
        <PulaTile
          nazwaDruzyny={ktoKupuje}
          pula={kwotaDruzyny}
        />
        <PulaTile
          nazwaDruzyny="mistrzowie"
          pula={kwotaMistrzowie}
        />
      </div>
    </div>
  );
}
