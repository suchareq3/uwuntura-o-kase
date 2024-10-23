# Awantura o kasę
Projekt jest w oparciu o teleturniej "Awantura o kasę". Napisany jest za pomocą Python i Django

# Uruchomienie aplikacji

## Wymagania
Python (testowany na wersji 3.10.X)
Django (najnowszy)
django-cors-headers (najnowszy)

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
Jeżeli 1 raz uruchamiasz projekt to należy wpisać aby móc skorzystać z reacta
```
cd .\stream_overlay\
npm install
```

Przy zmianie CSS lub dodaniu nowych klas z Tailwind'a, w terminalu należy użyć
```
npx tailwindcss -i ./panel_admin/static/admin_panel_style.css -o ./panel_admin/static/tailwind-output.css --watch
```

## Dodawanie użytkowników

Aby dodać użytkownika admin należy wpisać
```
py manage.py createsuperuser
```
I wpisać dla user: admin, hasło dowolne

Aby dodać użytkowników do gry (test lub stream) nalezy wpisać
```
py manage.py shell

from django.contrib.auth.models import User
user = User.objects.create_user(username = <user>, password = <password>)
user.save()
#Można ponownie wywołać 2 ostatnie linie aby dodać więcej użytkowników wymaganych
exit()
```
