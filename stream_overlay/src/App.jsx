import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { axiosService } from './services/axios.service'

function Overlay() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Pobierz token CSRF z ciasteczek
    const csrfToken = getCookie('csrftoken');

    // Pobieranie danych z endpointu chronionego przez logowanie w Django
    axiosService.get('/gra/', {
      withCredentials: true,
      headers: {
        'Cookie': csrfToken,  // Dodaj token CSRF do nagłówka
      }
    })
    .then(response => {
      setData(response.data);
    })
    .catch(error => {
      setError('Nie udało się pobrać danych. Upewnij się, że jesteś zalogowany.');
    });
  }, []);

  const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {data ? (
        <div>
          <h1>Protected Data</h1>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      ) : (
        <p>Ładowanie danych...</p>
      )}
    </div>
  );
}

export default Overlay;