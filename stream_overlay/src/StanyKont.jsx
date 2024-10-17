export default function StanyKont({
  kwotaZolci,
  kwotaZieloni,
  kwotaNiebiescy,
  kwotaMistrzowie,
  pula,
  czyGraNiebiescy = true,
  czyGraZieloni = true,
  czyGraZolci = true,
  czyGraMistrzowie = false,
}) {
  return (
    <div className="StanyKont flex awantura-font">
      {czyGraNiebiescy && !czyGraMistrzowie && (
        <>
          <div className="niebiescy">
            <div className="opis">
              <p>STAN KONTA</p>
            </div>
            <div className="niebiescy-pula">
              <p>{kwotaNiebiescy}</p>
            </div>
          </div>
        </>
      )}

      {czyGraZieloni && !czyGraMistrzowie && (
        <>
          <div className="zieloni">
            <div className="opis">
              <p>STAN KONTA</p>
            </div>
            <div className="zieloni-pula">
              <p>{kwotaZieloni}</p>
            </div>
          </div>
        </>
      )}

      {czyGraZolci && !czyGraMistrzowie && (
        <>
          <div className="zolci">
            <div className="opis">
              <p>STAN KONTA</p>
            </div>
            <div className="zolci-pula">
              <p>{kwotaZolci}</p>
            </div>
          </div>
        </>
      )}

      {czyGraMistrzowie && (
        <>
          <div className="mistrzowie">
            <div className="opis">
              <p>STAN KONTA</p>
            </div>
            <div className="mistrzowie-pula">
              <p>{kwotaMistrzowie}</p>
            </div>
          </div>
        </>
      )}

      <div className="ogolna-pula">
        <div className="opis">
          <p>PULA</p>
        </div>
        <div className="pula">
          <p>{pula}</p>
        </div>
      </div>
    </div>
  );
}
