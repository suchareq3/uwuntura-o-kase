import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios"

function Overlay() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Pobieranie danych z endpointu chronionego przez logowanie w Django
    axios.get('http://127.0.0.1:8000/gra/', {
      withCredentials: true,  // Umożliwia przesyłanie ciasteczek (sesji)
    })
    .then(response => {
      setData(response.data);
    })
    .catch(error => {
      setError('Nie udało się pobrać danych. Upewnij się, że jesteś zalogowany.');
    });
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {data ? (
        <div>
          <h1>Protected Data</h1>
          <p>{data.message}</p>
        </div>
      ) : (
        <p>Ładowanie danych...</p>
      )}
    </div>
  );
}

export default Overlay;
