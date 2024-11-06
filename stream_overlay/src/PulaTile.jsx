export default function PulaTile({ nazwaDruzyny = "", pula, opis, customWidth, customOpisHeight, customOpisClasses, customKwotaFontSize, customClasses }) {
  if (nazwaDruzyny == "space-waster") {
    return <div className="space-waster"></div>;
  }

  const pulaWidth = customWidth ? customWidth : nazwaDruzyny === "ogolna" ? "28%" : "24%";

  return (
    <div
      className={nazwaDruzyny + " flex flex-col " + customClasses}
      style={{ width: pulaWidth }}
    >
      {opis && (
        <div
          className={"opis eurostile-font " + customOpisClasses}
          style={{ letterSpacing: nazwaDruzyny == "ogolna" && "4px", height: customOpisHeight ? customOpisHeight : null }}
        >
          <p>{opis}</p>
        </div>
      )}
      <div
        className={"awantura-font flex items-center justify-center flex-1 text-5xl " + nazwaDruzyny + "-pula "
          + customKwotaFontSize
        }
        
      >
        <p>{pula}</p>
      </div>
    </div>
  );
}
