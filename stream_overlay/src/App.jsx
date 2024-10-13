import { useEffect, useState } from "react";
import "./css/App.css";
import axios from "axios";
import OverlaySetter from "./OverlaySetter";

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const axiosService = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_URL}`,
    withCredentials: true,
  });

  useEffect(() => {
    // Pobieranie danych z endpointu chronionego przez logowanie w Django
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
    }, 1000); //co 1000ms
    return () => clearInterval(intervalId);
  }, [axiosService]);

  if (error) {
    console.log("Oopsie Woopsie error description: ",error)
    return <div>Oopsie woopsie! We did a fucky wucky! A wittle fucko boingo! The code bears at our headquawtews are wowking VEWY HAWD to fix this! (Pwesae wook at the consoww wog to find the ewwow UwU)</div>;
  }

  return <>{data ? <OverlaySetter {...data} /> : <p>Ładowanie danych...</p>}</>;
}

export default App;
