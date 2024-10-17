export default function Licytacja({
  kwotaZolci,
  kwotaZieloni,
  kwotaNiebiescy,
  kwotaMistrzowie,
  czyGraNiebiescy = true,
  czyGraZieloni = true,
  czyGraZolci = true,
  czyGraMistrzowie = false,
}) {
  const activePlayerCount = [
    czyGraNiebiescy,
    czyGraZieloni,
    czyGraZolci,
    czyGraMistrzowie,
  ].filter(Boolean).length;
  const widthPercentage = 24 * activePlayerCount + "%";

  return (
    <div className="Licytacja flex flex-col awantura-font">
        <div className="w-full">
          <div className="opis" style={{ width: widthPercentage }}>
            <p>LICYTACJA</p>
          </div>
          <div className="space-waster"></div> {/* zeby sie ukladalo ladnie z pulą z komponentu StanyKontl */}

        </div>

        <div className="flex w-full h-full justify-center">
          {czyGraNiebiescy && !czyGraMistrzowie && (
            <>
              <div className="niebiescy">
                <div className="niebiescy-pula">
                  <p>{kwotaNiebiescy}</p>
                </div>
              </div>
            </>
          )}

          {czyGraZieloni && !czyGraMistrzowie && (
            <>
              <div className="zieloni">
                <div className="zieloni-pula">
                  <p>{kwotaZieloni}</p>
                </div>
              </div>
            </>
          )}

          {czyGraZolci && !czyGraMistrzowie && (
            <>
              <div className="zolci">
                <div className="zolci-pula">
                  <p>{kwotaZolci}</p>
                </div>
              </div>
            </>
          )}

          {czyGraMistrzowie && (
            <>
              <div className="mistrzowie">
                <div className="mistrzowie-pula">
                  <p>{kwotaMistrzowie}</p>
                </div>
              </div>
            </>
          )}
          <div className="space-waster"></div> {/* zeby sie ukladalo ladnie z pulą z komponentu StanyKont */}
        </div>
      
    </div>
  );
}
