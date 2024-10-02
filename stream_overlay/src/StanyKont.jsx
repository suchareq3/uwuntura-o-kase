export default function StanyKont({ kwotaZolci, kwotaZieloni, kwotaNiebiescy, kwotaMistrzowie, pula }) {
  return (
    <div className="StanyKont flex">
      <div className="niebiescy">
        <p>{kwotaNiebiescy}</p>
      </div>
      <div className="zieloni ">
        <p>{kwotaZieloni}</p>
      </div>
      <div className="zolci ">
        <p>{kwotaZolci}</p>
      </div>
      <div className="pula">
        <p>{pula}</p>
      </div>
    </div>
  );
}
