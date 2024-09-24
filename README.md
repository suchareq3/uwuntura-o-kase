# Awantura o kasę
Projekt jest w oparciu o teleturniej "Awantura o kasę". Napisany jest za pomocą Python i Django

# Uruchomienie aplikacji

## Wymagania
Python (testowany na wersji 3.10.X)
Django (najnowszy)

## Uruchomienie
W terminalu należy napisać
```
cd .\awantura_o_kase\
py manage.py runserver
```
Lub pod konkretną wersję pythona
```
py -3.X manage.py runserver
```

Przy zmianie CSS lub dodaniu nowych klas z Tailwind'a, w terminalu należy użyć
```
npx tailwindcss -i ./panel_admin/static/admin_panel_style.css -o ./panel_admin/static/tailwind-output.css --watch
```