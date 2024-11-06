import { useEffect, useState } from "react";
import "./css/App.css";
import axios from "axios";
import OverlaySetter from "./OverlaySetter";
import PlayerInfoSetter from "./PlayerInfoSetter";
import JedenNaJeden from "./JedenNaJeden";

function App({ route }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const axiosService = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_URL}`,
    withCredentials: true,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      axiosService
        .get("/gra/")
        .then((response) => {
          setData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          setError("Nie udało się pobrać danych. Upewnij się, że jesteś zalogowany. Treść błędu: " + error);
        });
    }, 1000);
    return () => clearInterval(intervalId); //zapobiega memory leakom
  }, [axiosService]);

  if (error) {
    console.log("Oopsie Woopsie error description: ", error);
    return (
      <div>
        Oopsie woopsie! We did a fucky wucky! A wittle fucko boingo! The code bears at our headquawtews are wowking VEWY HAWD to fix this!
        <br />
        (Pwesae wook at the consoww wog to find the ewwow UwU)
      </div>
    );
  }

  if (!data) {
    return <p>Ładowanie danych...</p>;
  }

  console.log("data: " + JSON.stringify(data["kategorie-1-na-1"]))
  if (route === "1na1"){
    return <JedenNaJeden kategorie={data["kategorie-1-na-1"]}/>
  }

  return (
    <>
      {route ? (
        <PlayerInfoSetter
          {...data}
          route={route}
        />
      ) : (
        <OverlaySetter {...data} />
      )}
    </>
  );
}

export default App;
