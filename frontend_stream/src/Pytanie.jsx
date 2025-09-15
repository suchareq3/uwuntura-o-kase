export default function Pytanie({ ktoOdpowiada, runda, nazwaKategorii, trescPytania, podpowiedzi, pokazOdpowiedz = false, pokazPodpowiedzi = false, customClasses, customOpisClasses, customTrescPytaniaClasses, showOpis = true, customPodpowiedziClasses, pula, odpowiedz }) {
  return (
    <div className={"Pytanie flex flex-col min-h-[25%] questrial-font w-full " + customClasses + " " + ktoOdpowiada}>
      {showOpis && (
        <div className={"opis flex justify-between px-5 " + customOpisClasses}>
          <div className="">
            <p>PYTANIE {runda}</p>
          </div>
          <div className="flex-1">
            <p>{nazwaKategorii}</p>
          </div>
          <div className="">
            <p>DO WYGRANIA {pula} PKT</p>
          </div>
        </div>
      )}
      <div className={"flex flex-col tresc-pytania h-full text-3xl px-6 p-1 xl:!p-3 " + customTrescPytaniaClasses}>
        {(podpowiedzi && pokazPodpowiedzi) && (
          <div className={"flex justify-between gap-1 md:gap-0 divide-slate-400 flex-wrap py-1 border-b border-slate-300" + customPodpowiedziClasses}>
            {podpowiedzi.map((podpowiedz) => (
              <p className="w-[49%] md:w-1/4 px-2 first:pl-0 first:pr-2 last:pl-2 last:pr-0 " key={podpowiedz}>
                {podpowiedz}
              </p>
            ))}
          </div>
        )}
        <div className="xl:pt-2 xl:px-5">
          <p>{trescPytania}</p>
          {pokazOdpowiedz && <p className="text-3xl">ODP: {odpowiedz}</p>}
        </div>
      </div>
    </div>
  );
}
