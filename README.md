# Uwuntura o kasę
Aplikacja webowa umożliwiająca odegranie i streamowanie teleturnieju "Awantura o kasę" stworzona na potrzeby konwentu [Futrołajki](https://futrolajki.pl/). 

Aplikacja ma 3 części - panel admina, stream overlay, oraz panel mobilny dla uczestników.

### Funkcje
- Logika aplikacji jest w pełni oparta na [zasadach "Awantury o kasę"](https://pl.wikipedia.org/wiki/Awantura_o_kas%C4%99)
- Projekt wykorzystuję lokalną bazę danych Pocketbase do przechowywania kwot, stanu gry, kategorii i pytań, z "[event hook'ami](https://pocketbase.io/docs/js-event-hooks/)" np. do automatycznej kalkulacji puli, losowania pytań, deaktywacji/aktywacji odpowiednich drużyn itp.
- Cała aplikacja jest *asynchroniczna* - zmiany dokonane w panelu admina są automatycznie odzwierciedlane we wszystkich częściach aplikacji
- Panel admina pozwala na manualny wybór kategorii, edycję kwot podczas licytacji, edycję kategorii podczas 'jeden na jednego' itp. Niektóre rzeczy są wykonywanie automatycznie, np. puszczanie muzyki.
- "Stream overlay" w formacie 16:9 z przezroczystym tłem, którego URL możemy wykorzystać w programie do streamowania, np. [OBS](https://obsproject.com/).
- Panel mobilny dla uczestników ze stałymi informacjami o kwotach, puli, treści pytania/podpowiedzi, oraz obsługi pokazywania kategorii podczas "jeden na jednego"
