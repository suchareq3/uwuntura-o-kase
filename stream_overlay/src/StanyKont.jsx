export default function StanyKont({ kwotaZolci, kwotaZieloni, kwotaNiebiescy, kwotaMistrzowie, pula, isFinal = true}) {
  return (
    <div className="StanyKont flex awantura-font">
      {!isFinal ? <>
        <div className="niebiescy">
        <div className="stan-konta">
          <p>STAN KONTA</p>
        </div>
        <div className="niebiescy-pula">
          <p>{kwotaNiebiescy}</p>
        </div>
      </div>

      <div className="zieloni">
        <div className="stan-konta">
          <p>STAN KONTA</p>
        </div>
        <div className="zieloni-pula">
          <p>{kwotaZieloni}</p>
        </div>
      </div>
      
      <div className="zolci">
        <div className="stan-konta">
          <p>STAN KONTA</p>
        </div>
        <div className="zolci-pula">
          <p>{kwotaZolci}</p>
        </div>
      </div>
    </> 
    :
    <>
      <div className="mistrzowie">
        <div className="stan-konta">
          <p>STAN KONTA</p>
        </div>
        <div className="mistrzowie-pula">
          <p>{kwotaMistrzowie}</p>
        </div>
      </div>
    </>
    }
      

      <div className="ogolna-pula">
        <div className="stan-konta">
          <p>PULA</p>
        </div>
        <div className="pula">
          <p>{pula}</p>
        </div>
      </div>
    </div>
  );
}
