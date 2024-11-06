export default function JedenNaJeden({ kategorie }) {
  return (
    <div className="JedenNaJeden w-full h-full flex flex-col items-start px-10 py-5">
      {Object.keys(kategorie).map((kategoria) => (
        <div className="flex-1 text-5xl questrial-font flex items-center " key={kategoria}>
          {Object.entries(kategorie[kategoria]).map(([subKategoria, skresl]) => (
            <p key={kategoria} className={skresl ? "text-gray-600" : ""} >{subKategoria}</p>
          ))}
        </div>
      ))}
    </div>
  );
}