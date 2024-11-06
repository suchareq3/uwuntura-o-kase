import Czas from "./Czas";
import PulaTile from "./PulaTile";
import Pytanie from "./Pytanie";

export default function PlayerInfo({ kwotaZolci, kwotaZieloni, kwotaNiebiescy, kwotaMistrzowie, kwotaMistrzowieLicytacja, kwotaZieloniLicytacja, kwotaZolciLicytacja, kwotaNiebiescyLicytacja, pula, trescPytania, podpowiedzi, pokazPodpowiedzi, pokazCzas, runda, kategoria, route, odpowiedz, ktoOdpowiada }) {
  return (

    
    <div className="PlayerInfo h-full flex flex-col p-3 gap-3">
      <div className="flex md:h-[24%] justify-between flex-wrap gap-y-1">
        {/* pule */}
        <PulaTile nazwaDruzyny="niebiescy" opis="STAN KONTA" pula={kwotaNiebiescy} customOpisClasses={"text-xl md:text-2xl !py-3 md:!py-4 "} customKwotaFontSize={"!text-4xl  md:!text-5xl lg:!text-6xl py-3"} customClasses={"!w-[49%] sm:!w-[24%]"} />
        <PulaTile nazwaDruzyny="zieloni" opis="STAN KONTA" pula={kwotaZieloni} customOpisClasses={"text-xl md:text-2xl !py-3 md:!py-4"} customKwotaFontSize={"!text-4xl md:!text-5xl lg:!text-6xl py-3"} customClasses={"!w-[49%] sm:!w-[24%]"} />
        <PulaTile nazwaDruzyny="zolci" opis="STAN KONTA" pula={kwotaZolci} customOpisClasses={"text-xl md:text-2xl !py-3 md:!py-4 "} customKwotaFontSize={"!text-4xl  md:!text-5xl lg:!text-6xl py-3"} customClasses={"!w-[49%] sm:!w-[24%]"} />
        <PulaTile nazwaDruzyny="mistrzowie" opis="STAN KONTA" pula={kwotaMistrzowie} customOpisClasses={"text-xl md:text-2xl !py-3 md:!py-4 "} customKwotaFontSize={"!text-4xl  md:!text-5xl lg:!text-6xl py-3"} customClasses={"!w-[49%] sm:!w-[24%]"} />
      </div>
      <div className="flex gap-1 sm:gap-3 md:gap-3 lg:gap-5">
        {/* licytacja */}
        <div className="flex flex-col w-[62%] sm:w-[70%]">
          <div className="opis py-4 text-xl sm:text-2xl tracking-[0.3rem] sm:tracking-[0.5rem]  md:tracking-[0.7rem]">
            <p>LICYTACJA</p>
          </div>
          <div className="flex h-full justify-between flex-wrap">
            <PulaTile nazwaDruzyny="niebiescy" pula={kwotaNiebiescyLicytacja} customKwotaFontSize={"!text-3xl md:!text-3xl lg:!text-4xl xl:!text-5xl py-2"} customClasses={"!w-[50%] sm:!w-[25%]"} />
            <PulaTile nazwaDruzyny="zieloni" pula={kwotaZieloniLicytacja} customKwotaFontSize={"!text-3xl md:!text-3xl lg:!text-4xl xl:!text-5xl py-2"} customClasses={"!w-[50%] sm:!w-[25%]"} />
            <PulaTile nazwaDruzyny="zolci" pula={kwotaZolciLicytacja} customKwotaFontSize={"!text-3xl md:!text-3xl lg:!text-4xl xl:!text-5xl py-2"} customClasses={"!w-[50%] sm:!w-[25%]"} />
            <PulaTile nazwaDruzyny="mistrzowie" pula={kwotaMistrzowieLicytacja} customKwotaFontSize={"!text-3xl md:!text-3xl lg:!text-4xl xl:!text-5xl py-2"} customClasses={"!w-[50%] sm:!w-[25%]"} />
          </div>
        </div>
        <PulaTile nazwaDruzyny="ogolna" pula={pula} opis="PULA" customOpisClasses={"!text-2xl md:!text-3xl p-5"} customKwotaFontSize={"!text-4xl sm:!text-3xl md:!text-4xl lg:!text-5xl"} customClasses={"flex-1"} />
      </div>

      <div className="flex flex-col">
        <div className="opis px-3 text-xl flex-col items-start h-auto">
          <div className="flex justify-between w-full">
            <div className="flex flex-col">
              <p>PYTANIE {runda}</p>
              <p>{kategoria}</p>
            </div>
            <div className="text-3xl items-center flex awantura-font">{pokazCzas && <Czas/>}</div>
          </div>          
        </div>
        <Pytanie pula={pula} runda={runda} nazwaKategorii={kategoria} trescPytania={trescPytania} podpowiedzi={podpowiedzi} pokazPodpowiedzi={pokazPodpowiedzi} showOpis={false} customClasses={"p-0"} customTrescPytaniaClasses={"!p-2 md:!p-4 lg:!px-10 !text-2xl"} pokazOdpowiedz={route === "ibisz-info"} odpowiedz={odpowiedz} ktoOdpowiada={ktoOdpowiada}/>
      </div>
    </div>
  );
}
