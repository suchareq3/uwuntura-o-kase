# Uwuntura o kasę
Aplikacja webowa umożliwiająca odegranie i streamowanie teleturnieju "Awantura o kasę" stworzona na potrzeby konwentu [Futrołajki](https://futrolajki.pl/). 

Aplikacja ma 3 części - panel admina, stream overlay, oraz panel mobilny dla uczestników.

### Funkcje
- Logika aplikacji jest w pełni oparta na [zasadach "Awantury o kasę"](https://pl.wikipedia.org/wiki/Awantura_o_kas%C4%99)
- Projekt wykorzystuję lokalną bazę danych Pocketbase do przechowywania kwot, stanu gry, kategorii i pytań, z "[event hook'ami](https://pocketbase.io/docs/js-event-hooks/)" np. do automatycznej kalkulacji puli, losowania pytań, deaktywacji/aktywacji odpowiednich drużyn itp.
- Cała aplikacja jest *asynchroniczna* - zmiany dokonane w panelu admina są automatycznie odzwierciedlane we wszystkich częściach aplikacji
- Panel admina pozwala na manualny wybór kategorii, edycję kwot podczas licytacji, edycję kategorii podczas 'jeden na jednego' itp. Niektóre rzeczy są wykonywanie automatycznie, np. puszczanie muzyki.
- "Stream overlay" w formacie 16:9 z przezroczystym tłem, którego URL możemy wykorzystać w programie do streamowania, np. [OBS](https://obsproject.com/).
- Panel mobilny dla uczestników ze stałymi informacjami o kwotach, puli, treści pytania/podpowiedzi, oraz kategoriami podczas "jeden na jednego"

# Screenshoty

<img width="380" alt="Pierwsze zdjęcie admin panel'u " src="https://github.com/user-attachments/assets/8b53a428-b19f-43de-84fe-18302c2a1fbe" />
<img width="380" alt="Stream overlay podczas licytacji z mistrzami" src="https://github.com/user-attachments/assets/96cd3248-cf4a-4cc3-a3b9-0d82b2885d03" />
<img width="90" alt="Panel mobilny podczas licytacji" src="https://github.com/user-attachments/assets/1c85348e-32a4-4b72-b167-c63bdff6c07f" />
<br/>
<img width="380" alt="Stream overlay z treścią pytania" src="https://github.com/user-attachments/assets/db5a4e87-29c1-4564-a282-eb6afa773d1d" />
<img width="380" alt="Stream overlay z treścią pytania, czasem i podpowiedzią" src="https://github.com/user-attachments/assets/aead1575-e86d-4196-84de-6788143fa1a8" />
<img width="90" alt="Panel mobilny z treścią pytania i wykupionymi podpowiedziami" src="https://github.com/user-attachments/assets/20161625-945f-49f5-bcfe-c6268b348b0f" />
<br/>
<img width="380" alt="Drugie zdjęcie admin panel'u pokazujące kategorię 'jeden na jednego'" src="https://github.com/user-attachments/assets/2a048702-faff-47c3-b7bb-2bd707491101" />
<img width="380" alt="Stream overlay podczas 'jeden na jednego'" src="https://github.com/user-attachments/assets/b54aedec-1673-44d8-92a5-b0cdda51ac8e" />
<img width="90" alt="Panel mobilny pokazujący kategorie podczas 'jeden na jednego'" src="https://github.com/user-attachments/assets/59b6b2e6-d0ef-45fc-87df-de6ee1d11bd6" />
