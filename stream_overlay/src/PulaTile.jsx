export default function PulaTile({ nazwaDruzyny="", pula, opis="" }) {
  return (
    <div className={nazwaDruzyny}>
      {opis ?? (
        <div className="opis">
          <p>{opis}</p>
        </div>
      )}
      <div className={nazwaDruzyny + "-pula"}>
        <p>{pula}</p>
      </div>
    </div>
  );
}
