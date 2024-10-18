export default function PulaTile({ nazwaDruzyny = "", pula, opis }) {
  if (nazwaDruzyny == "space-waster") {
    return <div className="space-waster"></div>;
  }

  return (
    <div
      className={nazwaDruzyny + " flex flex-col"}
      style={{ width: nazwaDruzyny == "ogolna" ? "28%" : "24%" }}
    >
      {opis && (
        <div
          className="opis eurostile-font"
          style={{ letterSpacing: nazwaDruzyny == "ogolna" && "4px" }}
        >
          <p>{opis}</p>
        </div>
      )}
      <div className={"awantura-font flex items-center justify-center flex-1 text-5xl " + nazwaDruzyny + "-pula"}>
        <p>{pula}</p>
      </div>
    </div>
  );
}
