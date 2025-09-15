import PlayerInfo from "./PlayerInfo";

export default function PlayerInfoSetter(props) {
  const { route } = props; //wydlubanie 'route' i 'countdownStarted'' z propsow
  const { countdownStarted } = props;
  const data = props; // wszystko z '...data'

  return (
    <div className={"PlayerInfoSetter " + route}>
        <PlayerInfo
          kwotaNiebiescy={data.pula_niebiescy}
          kwotaZieloni={data.pula_zieloni}
          kwotaZolci={data.pula_zolci}
          kwotaMistrzowie={data.pula_mistrzowie}
          kwotaNiebiescyLicytacja={data.pula_niebiescy_runda}
          kwotaZieloniLicytacja={data.pula_zieloni_runda}
          kwotaZolciLicytacja={data.pula_zolci_runda}
          kwotaMistrzowieLicytacja={data.pula_mistrzowie_runda}
          
          pula={data.pula}
          trescPytania={data.tresc_pytania}
          odpowiedz={data.odpowiedz}
          podpowiedzi={data.podpowiedz}
          pokazPodpowiedzi={data.stream_json.overlay === "pytanie-podpowiedzi"}
          pokazPytanie={data.stream_json.overlay === "pytanie" || data.stream_json.overlay === "pytanie-podpowiedzi" }
          pokazCzas={data.stream_json.czas}
          countdownStarted={countdownStarted}
          kategoria={data.kategoria}

          route={route}
          czyActiveNiebiescy={data.czy_gra_niebiescy}
          czyActiveZieloni={data.czy_gra_zieloni}
          czyActiveZolci={data.czy_gra_zolci}
          //czyActiveMistrzowie={czyFinal}

          //TODO: ktoOdpowiada kto_odpowiada
          ktoOdpowiada={data.wygral_licytacje}

          runda={data.runda}
        />
    </div>
  );
}
