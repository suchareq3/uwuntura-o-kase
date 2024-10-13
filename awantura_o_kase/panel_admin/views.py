from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import login as login_user, authenticate
from django.contrib.auth.decorators import login_required, user_passes_test
from .forms import LoginForm
from django.http import JsonResponse, HttpResponseRedirect
import random
from datetime import timedelta

pytania = {
    "kategoria-1" : {
        "pytanie-1",
        "pytanie-2",
        "pytanie-3",
        "pytanie-4",
        "pytanie-5",
        "pytanie-6",
        "pytanie-7",
        "pytanie-8",
        "pytanie-9",
        "pytanie-10",
    },
    "kategoria-2" : {
        "pytanie-1",
        "pytanie-2",
        "pytanie-3",
        "pytanie-4",
        "pytanie-5",
        "pytanie-6",
        "pytanie-7",
        "pytanie-8",
        "pytanie-9",
        "pytanie-10",
    },
    "kategoria-3" : {
        "pytanie-1",
        "pytanie-2",
        "pytanie-3",
        "pytanie-4",
        "pytanie-5",
        "pytanie-6",
        "pytanie-7",
        "pytanie-8",
        "pytanie-9",
        "pytanie-10",
    },
    "kategoria-4" : {
        "pytanie-1",
        "pytanie-2",
        "pytanie-3",
        "pytanie-4",
        "pytanie-5",
        "pytanie-6",
        "pytanie-7",
        "pytanie-8",
        "pytanie-9",
        "pytanie-10",
    },
    "kategoria-5" : {
        "pytanie-1",
        "pytanie-2",
        "pytanie-3",
        "pytanie-4",
        "pytanie-5",
        "pytanie-6",
        "pytanie-7",
        "pytanie-8",
        "pytanie-9",
        "pytanie-10",
    },
    "kategoria-6" : {
        "pytanie-1",
        "pytanie-2",
        "pytanie-3",
        "pytanie-4",
        "pytanie-5",
        "pytanie-6",
        "pytanie-7",
        "pytanie-8",
        "pytanie-9",
        "pytanie-10",
    },
    "kategoria-7" : {
        "pytanie-1",
        "pytanie-2",
        "pytanie-3",
        "pytanie-4",
        "pytanie-5",
        "pytanie-6",
        "pytanie-7",
        "pytanie-8",
        "pytanie-9",
        "pytanie-10",
    },
    "kategoria-8" : {
        "pytanie-1",
        "pytanie-2",
        "pytanie-3",
        "pytanie-4",
        "pytanie-5",
        "pytanie-6",
        "pytanie-7",
        "pytanie-8",
        "pytanie-9",
        "pytanie-10",
    },

}

poprawne_odpowiedzi = {
    "kategoria-1" : {
        "yes"
    },
    "kategoria-2" : {
        "yesn't"
    },
    "kategoria-3" : {
        "a cokolwiek"
    },
    "kategoria-4" : {
        "nie"
    },
    "kategoria-5" : {
        "tak"
    },
    "kategoria-6" : {
        "nien't"
    },
    "kategoria-7" : {
        "takn't"
    },
    "kategoria-8" : {
        "nie NIE"
    },
}

podpowiedzi = {
    "kategoria-1" : {
        "pytanie-1": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-2": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-3": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-4": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-5": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-6": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-7": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-8": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-9": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-10": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
    },
    "kategoria-2" : {
        "pytanie-1": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-2": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-3": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-4": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-5": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-6": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-7": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-8": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-9": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-10": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
    },
    "kategoria-3" : {
        "pytanie-1": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-2": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-3": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-4": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-5": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-6": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-7": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-8": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-9": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-10": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
    },
    "kategoria-4" : {
        "pytanie-1": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-2": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-3": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-4": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-5": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-6": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-7": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-8": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-9": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-10": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
    },
    "kategoria-5" : {
        "pytanie-1": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-2": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-3": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-4": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-5": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-6": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-7": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-8": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-9": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-10": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
    },
    "kategoria-6" : {
        "pytanie-1": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-2": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-3": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-4": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-5": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-6": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-7": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-8": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-9": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-10": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
    },
    "kategoria-7" : {
        "pytanie-1": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-2": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-3": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-4": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-5": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-6": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-7": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-8": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-9": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-10": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
    },
    "kategoria-8" : {
        "pytanie-1": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-2": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-3": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-4": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-5": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-6": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-7": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-8": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-9": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
        "pytanie-10": {
            "podpowiedz-1",
            "podpowiedz-2",
            "podpowiedz-3"
        },
    },
}

class kategoria:
    kategoria = ""
    pytanie = ""
    odpowiedz = ""
    podpowiedz:list = []

    def __init__(self):
        pass

    def dodaj_kategorie(self,kategoria):
        self.kategoria = kategoria
        x = list(pytania[kategoria])
        self.pytanie = x[random.randint(0, len(x) - 1)]
        y = list(poprawne_odpowiedzi[kategoria])
        self.odpowiedz = y[0]

    def wyczysc_kategorie(self):
        self.kategoria = ""
        self.pytanie = ""
        self.odpowiedz = ""

kategoria = kategoria()

class runda:
    runda = 4 #KONIECZNIE DO ZMIANY NA 0
    licytacja = False
    czy_nastepna_runda = True
    najwiekszy_bet = 0
    czas = 0
    minuty = 0
    sekundy = 0
    start_odliczanie = False
    kategorie_do_1_na_1: dict = {'kategoria_1': {}, 'kategoria_2': {}, 'kategoria_3': {}, 'kategoria_4': {}, 'kategoria_5' : {}, 'kategoria_6': {}, 'kategoria_7': {}}

    def __init__(self):
        pass

    def dodaj_runda(self):
        if self.runda >= 12:
            return False
        self.runda += 1
    
    def wypisz(self):
        return self.runda
    
    def reset(self):
        self.runda = 0
        self.licytacja = False
        self.czy_nastepna_runda = True

    def zmiana_licytacja(self):
        self.licytacja = not self.licytacja
    
    def dodaj_do_najwiekszego_betu(self, kwota):
        self.najwiekszy_bet += kwota
    
    def przypisz_do_najwiekszego_betu(self, kwota):
        self.najwiekszy_bet = kwota

    def zeruj_czas(self):
        self.minuty = 0
        self.sekundy = 0
        self.czas = 0

    def reset_czas(self):
        self.minuty = 1
        self.sekundy = 0
        self.czas = 0

runda = runda()

class druzyna:
    pula = 5000
    tymczasowa_pula = 0
    czy_gra = True
    licytowal = False
    czy_1_na_1 = False

    def __init__(self):
        pass

    def odejmij(self, kwota, request):
        if self.pula > 0:
            self.pula -= kwota
        else:
            print("Nie masz już kasy")
            messages.error(request, "Nie możesz zakończyć licytacji bez podania kwoty")
    
    def dodaj_pula(self, kwota):
        self.pula += kwota

    def dodaj_tymczasowa_pula(self, Kwota):
        self.tymczasowa_pula += Kwota
    
    def wyrownaj_tymczasowa_pule(self, kwota):
        self.tymczasowa_pula = kwota

    def zeruj_tymczasowa_pula(self):
        self.tymczasowa_pula = 0

    def zmiana_gry(self):
        self.czy_gra = not self.czy_gra

    def wypisz(self):
        return str(self.__class__.__qualname__)

class niebiescy(druzyna):
    pass

class zieloni(druzyna):
    pass

class zolci(druzyna):
    pass

class mistrzowie(druzyna):
    pass

niebiescy = niebiescy()
zieloni = zieloni()
zolci = zolci()
mistrzowie = mistrzowie()

class pula:
    pula = 0
    team = ""

    def __init__(self):
        pass
    
    def dodaj_pula(self, Kwota, team):
        self.pula += Kwota
        self.team = team

    def zeruj_pula(self):
        self.pula = 0
    
    def wypisz(self):
        return print(self.pula)
    
    def wypisz_team(self):
        return self.team

pula = pula()    

def home(request):
    return render(request, "home.html")

def login(request):
    if request.method == "POST":
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data["username"]
            password = form.cleaned_data["password"]
            user = authenticate(request, username = username, password = password)
            if user and user.is_superuser:
                login_user(request, user)
                return rendering(request)
            elif user and user.username == "test":
                login_user(request, user)
                return HttpResponseRedirect("http://localhost:5173/")
            elif user and user.username == "stream":
                login_user(request, user)
                return redirect("stream_panel")
            else:
                messages.error(request, "Incorrect username or password. Please try again.")
                return HttpResponseRedirect(request.path_info)
        else:
            return render(request, "login.html", {'form': form})
    return render(request, "login.html")

stream_json = {
    "stream": "",
    "czas": False
}

def rendering(request):
    return render(
        request, 
        "admin_panel.html", 
        {
            'pula': pula.pula,
            'pula_niebiescy': niebiescy.pula,
            'pula_zieloni': zieloni.pula,
            'pula_zolci': zolci.pula,
            'pula_mistrzowie': mistrzowie.pula,
            'runda': runda.runda,
            'kategoria': kategoria.kategoria,
            'tresc_pytania': kategoria.pytanie,
            'odpowiedz': kategoria.odpowiedz,
            'pula_niebiescy_runda': niebiescy.tymczasowa_pula,
            'pula_zieloni_runda': zieloni.tymczasowa_pula,
            'pula_zolci_runda': zolci.tymczasowa_pula,
            'pula_mistrzowie_runda': mistrzowie.tymczasowa_pula,
            'minuty': runda.minuty,
            'sekundy': runda.sekundy,
            'start_odliczanie': runda.start_odliczanie,
            'stream': stream_json['stream'],
            'czas': stream_json['czas'],
            'podpowiedz': kategoria.podpowiedz,
            'kategorie_1_na_1': dict(runda.kategorie_do_1_na_1) if isinstance(runda.kategorie_do_1_na_1, set) else runda.kategorie_do_1_na_1,
        }
        )

@login_required
def panel(request):
    return render(request, "panel.html")

action_map = {
    "niebiescy": niebiescy,
    "zieloni": zieloni,
    "zolci": zolci,
    "mistrzowie": mistrzowie
}

@login_required
@user_passes_test(lambda u: u.is_superuser)
def gra(request):
    if request.method == "POST":
        print(request.POST)
        tymczasowa_pula = max(points.tymczasowa_pula for points in action_map.values())
        if request.POST.get("reset-gry"):
            for _, team in action_map.items():
                team.pula = 5000
                team.czy_gra = True
                team.licytowal = False
            pula.pula = 0
            runda.reset()
            kategoria.wyczysc_kategorie()
            return rendering(request)
        elif request.POST.get("reset-rundy"):
            kategoria.wyczysc_kategorie()
            for _, team in action_map.items():
                team.dodaj_pula(team.tymczasowa_pula)
                team.licytowal = False
            runda.runda -= 1
            runda.czy_nastepna_runda = True
            pula.zeruj_pula()
            kategoria.wyczysc_kategorie()
            return rendering(request)
        elif request.POST.get("podpowiedz"):
            try:
                druzyna = action_map[request.POST.get("podpowiedz-druzyna")]
                koszt: int = int(request.POST.get("take-podpowiedz-amount"))
            except:
                print("Nie wybrano drużyny lub nie podano kwoty")
                messages.error(request, "Nie wybrano drużyny lub nie podano kwoty")
                return rendering(request)
            if koszt < 0:
                print("Koszt podpowiedzi nie może być ujemny")
                messages.error(request, "Koszt podpowiedzi nie może być ujemny")
                return rendering(request)
            elif koszt % 100 != 0:
                print("Koszt podpowiedzi musi być podzielny przez 100")
                messages.error(request, "Koszt podpowiedzi musi być podzielny przez 100")
                return rendering(request)
            elif druzyna.czy_gra == False:
                print("Ta drużyna już nie gra")
                messages.error(request, "Ta drużyna już nie gra")
                return rendering(request)
            elif druzyna.pula < koszt:
                print("Drużyna nie posiada takiej kasy")
                messages.error(request, "Drużyna nie posiada takiej kasy")
                return rendering(request)
            druzyna.odejmij(koszt, request)
            runda.reset_czas()
            return rendering(request)
        elif request.POST.get("kara"):
            druzyna = action_map[request.POST.get("kara-druzyna")]
            kara:int = int(request.POST.get("add-kara-amount"))
            if kara < 0:
                print("Kara nie może być ujemna")
                messages.error(request, "Kara nie może być ujemna")
                return rendering(request)
            elif kara % 100 != 0:
                print("Kara musi być podzielna przez 100")
                messages.error(request, "Kara musi być podzielna przez 100")
                return rendering(request)
            elif druzyna.czy_gra == False:
                print("Ta drużyna już nie gra")
                messages.error(request, "Ta drużyna już nie gra")
                return rendering(request)
            elif druzyna.pula < kara:
                print("Drużyna nie posiada takiej kasy")
                messages.error(request, "Drużyna nie posiada takiej kasy")
                return rendering(request)
            druzyna.odejmij(kara, request)
            return rendering(request)
        elif request.POST.get("koniec-licytacji") and pula.pula == 0:
            print("Nie możesz zakończyć licytacji bez podania kwoty")
            messages.error(request, "Nie możesz zakończyć licytacji bez podania kwoty")
            return rendering(request)
        elif request.POST.get("kategoria"):
            kategoria.dodaj_kategorie(request.POST.get("kategoria"))
            if runda.licytacja == True:
                runda.zmiana_licytacja()
            return rendering(request)
        elif request.POST.get("runda"):
            if runda.czy_nastepna_runda == False:
                print("Nie zakończyła się poprzednia runda")
                messages.error(request, "Nie zakończyła się poprzednia runda")
                return rendering(request)
            elif kategoria.kategoria == "":
                print("Wybierz najpierw kategorię")
                messages.error(request, "Wybierz najpierw kategorię")
                return rendering(request)
            elif runda.dodaj_runda() == False:
                print("Za dużo rund")
                messages.error(request, "Za dużo rund")
                return rendering(request)
            if runda.runda <= 6:
                for _, team in action_map.items():
                    if team == mistrzowie:
                        break
                    team.odejmij(200, request)
                    team.wyrownaj_tymczasowa_pule(200)
                    pula.dodaj_pula(200, team)
            else:
                najwiekszy_team = max((team for name, team in action_map.items() if name != "mistrzowie"), key=lambda t: t.pula, default=None)
                najwiekszy_team.odejmij(200, request)
                najwiekszy_team.wyrownaj_tymczasowa_pule(200)
                pula.dodaj_pula(200, None)
                mistrzowie.odejmij(200, request)
                mistrzowie.wyrownaj_tymczasowa_pule(200)
                pula.dodaj_pula(200, None)
                return rendering(request)
            for team, points in action_map.items():
                if tymczasowa_pula < points.tymczasowa_pula:
                    tymczasowa_pula = points.tymczasowa_pula
            runda.czy_nastepna_runda = False
            kategoria.podpowiedz = podpowiedzi.get(kategoria.kategoria, {}).get(kategoria.pytanie, None)
            return rendering(request)
        elif kategoria.kategoria == "":
            print("Nie wybrano kategorii")
            messages.error(request, "Nie wybrano kategorii")
            return rendering(request)
        elif request.POST.get("koniec-licytacji"):
            runda.zmiana_licytacja()
            return rendering(request)
        elif request.POST.get("1-na-1"):
            try:
                druzyna1 = action_map[request.POST.getlist("1na1-druzyna")[0]]
                druzyna2 = action_map[request.POST.getlist("1na1-druzyna")[1]]
            except:
                print("Nie wybrano 2 drużyn")
                messages.error(request, "Nie wybrano 2 drużyn")
                return rendering(request)
            if druzyna1 == druzyna2:
                print("Nie możesz grać sam ze sobą")
                messages.error(request, "Nie możesz grać sam ze sobą")
                return rendering(request)
            if druzyna1 == None or druzyna2 == None:
                print("Nie wybrano drużyn")
                messages.error(request, "Nie wybrano drużyn")
                return rendering(request)
            if druzyna1.czy_gra == False or druzyna2.czy_gra == False:
                print(f"Jedna z drużyn już nie gra")
                messages.error(request, "Jedna z drużyn już nie gra")
                return rendering(request)
            druzyna1.odejmij(500, request)
            druzyna2.odejmij(500, request)
            druzyna1.czy_1_na_1 = True
            druzyna2.czy_1_na_1 = True
            pula.dodaj_pula(1000, druzyna1)
            runda.dodaj_runda()
            print("1 na 1 - etap 2")
            messages.info(request, "1 na 1 - etap 2")
            for i, j in enumerate(random.sample(list(pytania.keys()), 7), 1):
                runda.kategorie_do_1_na_1[f'kategoria_{i}'] = {j: False}
                #runda.kategorie_do_1_na_1[i] = True
            print(runda.kategorie_do_1_na_1)
            return rendering(request)
        elif request.POST.get("1-na-1-etap-2"):
            kategorie_do_odrzucenia = request.POST.getlist("1na1-kategoria")
            for kat in runda.kategorie_do_1_na_1:
                for nazwaKategorii in runda.kategorie_do_1_na_1[kat]:
                    if kat in kategorie_do_odrzucenia:
                        runda.kategorie_do_1_na_1[kat][nazwaKategorii] = True
                    else:
                        runda.kategorie_do_1_na_1[kat][nazwaKategorii] = False
            true_count = sum(value is True for inner_dict in runda.kategorie_do_1_na_1.values() for value in inner_dict.values())
            if (true_count == 6):
                messages.info(request, "1 na 1 - etap 3")
                return rendering(request)
            #print("Wybierz 6 kategorii")
            messages.info(request, "1 na 1 - etap 2")
            return rendering(request)
        elif request.POST.get("action"):
            if runda.licytacja == True:
                print("Koniec licytacji")
                messages.error(request, "Koniec licytacji")
                return rendering(request)
            elif runda.runda == 0:
                print("Runda nie może być zerowa")
                messages.error(request, "Runda nie może być zerowa")
                return rendering(request)
            action = request.POST.get("action")
            akcja = action.split("-")
            for amount in ["100", "200", "500", "vabank"]:
                for team, points in action_map.items():
                    if f"add-{amount}-{team}" == action:
                        if runda.runda <= 6 and team == "mistrzowie":
                            print("Mistrzowie nie mogą licytować przed 7 rundą")
                            messages.error(request, "Mistrzowie nie mogą licytować przed 7 rundą")
                            return rendering(request)
                        #elif runda.runda > 6 and points.czy_gra == False:
                        #    print("Ta drużyna już nie gra")
                        #    messages.error(request, "Ta drużyna już nie gra")
                        #    return rendering(request)
                        elif points.czy_gra == False:
                            print("Ta drużyna już nie gra")
                            messages.error(request, "Ta drużyna już nie gra")
                            return rendering(request)
                        if akcja[1] == "vabank":
                            punkty:int = points.pula
                            points.odejmij(punkty, request)
                            pula.dodaj_pula(punkty, team)
                            runda.zmiana_licytacja()
                        else:
                            if points.licytowal == True:
                                print("Ta drużyna już licytowała")
                                messages.error(request, "Ta drużyna już licytowała")
                                return rendering(request)
                            punkty:int = int(amount) + tymczasowa_pula - points.tymczasowa_pula
                            runda.dodaj_do_najwiekszego_betu(int(amount))
                            points.odejmij(punkty, request)
                            pula.dodaj_pula(punkty, team)
                            points.dodaj_tymczasowa_pula(punkty)
                            for _, team in action_map.items():
                                team.licytowal = False
                            points.licytowal = True
                        return rendering(request)
            return rendering(request)
        elif any(key.startswith("add-X-") for key in request.POST.keys()):
            if runda.licytacja == True:
                return rendering(request)
            for team, points in action_map.items():
                if runda.runda <= 6 and team == "mistrzowie":
                    print("Mistrzowie nie mogą licytować przed 7 rundą")
                    messages.error(request, "Mistrzowie nie mogą licytować przed 7 rundą")
                    return rendering(request)
                action = request.POST.getlist(f"add-X-{team}")
                if action:
                    try:
                        punkty:int = int(action[1])
                    except ValueError:
                        print("błąd")
                        messages.error(request, "błąd")
                        continue
                    if punkty < runda.najwiekszy_bet:
                        print("Nie możesz licytować mniej niż poprzednia osoba")
                        messages.error(request, "Nie możesz licytować mniej niż poprzednia osoba")
                        return rendering(request)
                    if runda.runda > 6 and points.czy_gra == False:
                        print("Ta drużyna już nie gra")
                        messages.error(request, "Ta drużyna już nie gra")
                        return rendering(request)
                    if points.licytowal == True:
                        print("Ta drużyna już licytowała")
                        messages.error(request, "Ta drużyna już licytowała")
                        return rendering(request)
                    if punkty % 100 != 0:
                        return rendering(request)
                    runda.przypisz_do_najwiekszego_betu(punkty)
                    points.odejmij(punkty - points.tymczasowa_pula, request)
                    pula.dodaj_pula(punkty - points.tymczasowa_pula, team)
                    points.wyrownaj_tymczasowa_pule(punkty)
                    for _, team in action_map.items():
                        team.licytowal = False
                    points.licytowal = True
                    return rendering(request)
            return rendering(request)
        elif request.POST.get("wlacz_czas"):
            if runda.czas == 0:
                runda.czas = timedelta(minutes = 1)
                runda.minuty = runda.czas.seconds // 60
                runda.sekundy = 0
            else:
                runda.minuty = runda.czas.seconds // 60
                runda.sekundy = runda.czas.seconds
            runda.start_odliczanie = True
            return rendering(request)
        elif request.POST.get("stop_czas"):
            runda.czas = timedelta(seconds = int(request.POST.get("remaining_seconds")))
            runda.start_odliczanie = False
            return rendering(request)
        elif request.POST.get("dobra_odpowiedz"):
            if runda.licytacja == False:
                print("nie możesz odpowiedzieć na pytanie zanim się nie zamknie licytacja")
                messages.error(request, "nie możesz odpowiedzieć na pytanie zanim się nie zamknie licytacja")
                return rendering(request)
            elif runda.runda == 0:
                print("Runda nie może być zerowa")
                messages.error(request, "Runda nie może być zerowa")
                return rendering(request)
            druzyna = action_map[pula.wypisz_team()]
            druzyna.dodaj_pula(pula.pula)
            pula.zeruj_pula()
            kategoria.wyczysc_kategorie()
            runda.zmiana_licytacja()
            for _, team in action_map.items():
                team.zeruj_tymczasowa_pula()
                team.licytowal = False
            if runda.runda == 6:
                najwiekszy_team = max((team for name, team in action_map.items() if name != "mistrzowie"), key=lambda t: t.pula, default=None)
                if najwiekszy_team is not None:
                    for name, team in action_map.items():
                        if name != "mistrzowie" and team != najwiekszy_team:
                            team.zmiana_gry()
            runda.zeruj_czas()
            runda.czy_nastepna_runda = True
            kategoria.podpowiedz = []
            return rendering(request)
        elif request.POST.get("zla_odpowiedz"):
            if runda.licytacja == False:
                print("nie możesz odpowiedzieć na pytanie zanim się nie zamknie licytacja")
                messages.error(request, "nie możesz odpowiedzieć na pytanie zanim się nie zamknie licytacja")
                return rendering(request)
            elif runda.runda == 0:
                print("Runda nie może być zerowa")
                messages.error(request, "Runda nie może być zerowa")
                return rendering(request)
            if runda.runda == 6:
                druzyna = action_map[pula.wypisz_team()]
                najwiekszy_team = max((team for name, team in action_map.items() if name != "mistrzowie"), key=lambda t: t.pula, default=None)
                if najwiekszy_team != druzyna:
                    messages.info(request, "6 runda - zla odp przez 1sza druzyne")
                    return rendering(request)
                if najwiekszy_team is not None:
                    for name, team in action_map.items():
                        if name != "mistrzowie" and team != najwiekszy_team:
                            team.zmiana_gry()
                pula.zeruj_pula()
            kategoria.wyczysc_kategorie()
            runda.zmiana_licytacja()
            for _, team in action_map.items():
                team.zeruj_tymczasowa_pula()
                team.liytowal = False
            runda.czy_nastepna_runda = True
            runda.zeruj_czas()
            kategoria.podpowiedz = []
            return rendering(request)
        elif request.POST.get("dobra_odpowiedz_ostatni"):
            najwiekszy_team = max((team for name, team in action_map.items() if name != "mistrzowie"), key=lambda t: t.pula, default=None)
            for name, team in action_map.items():
                if name != "mistrzowie" and team != najwiekszy_team:
                    team.zmiana_gry()
            najwiekszy_team.dodaj_pula(pula.pula)
            pula.zeruj_pula()
            kategoria.wyczysc_kategorie()
            runda.zmiana_licytacja()
            for _, team in action_map.items():
                team.zeruj_tymczasowa_pula()
            runda.czy_nastepna_runda = True
            kategoria.podpowiedz = []
            return rendering(request)
        elif request.POST.get("zla_odpowiedz_ostatni"):
            najwiekszy_team = max((team for name, team in action_map.items() if name != "mistrzowie"), key=lambda t: t.pula, default=None)
            for name, team in action_map.items():
                if name != "mistrzowie" and team != najwiekszy_team:
                    team.zmiana_gry()
            pula.zeruj_pula()
            kategoria.wyczysc_kategorie()
            runda.zmiana_licytacja()
            for _, team in action_map.items():
                team.zeruj_tymczasowa_pula()
            runda.czy_nastepna_runda = True
            kategoria.podpowiedz = []
            return rendering(request)
        else:
            return rendering(request)
    else:
        return JsonResponse({
            'pula': list(pula.pula) if isinstance(pula.pula, set) else pula.pula,
            'pula_niebiescy': list(niebiescy.pula) if isinstance(niebiescy.pula, set) else niebiescy.pula,
            'pula_zieloni': list(zieloni.pula) if isinstance(zieloni.pula, set) else zieloni.pula,
            'pula_zolci': list(zolci.pula) if isinstance(zolci.pula, set) else zolci.pula,
            'pula_mistrzowie': list(mistrzowie.pula) if isinstance(mistrzowie.pula, set) else mistrzowie.pula,
            'runda': runda.runda,
            'kategoria': kategoria.kategoria,
            'tresc_pytania': kategoria.pytanie,
            'odpowiedz': kategoria.odpowiedz,
            'pula_niebiescy_runda': list(niebiescy.tymczasowa_pula) if isinstance(niebiescy.tymczasowa_pula, set) else niebiescy.tymczasowa_pula,
            'pula_zieloni_runda': list(zieloni.tymczasowa_pula) if isinstance(zieloni.tymczasowa_pula, set) else zieloni.tymczasowa_pula,
            'pula_zolci_runda': list(zolci.tymczasowa_pula) if isinstance(zolci.tymczasowa_pula, set) else zolci.tymczasowa_pula,
            'pula_mistrzowie_runda': list(mistrzowie.tymczasowa_pula) if isinstance(mistrzowie.tymczasowa_pula, set) else mistrzowie.tymczasowa_pula,
            'podpowiedz': list(kategoria.podpowiedz) if isinstance(kategoria.podpowiedz, set) else kategoria.podpowiedz,
            'kategorie-1-na-1': dict(runda.kategorie_do_1_na_1) if isinstance(runda.kategorie_do_1_na_1, set) else runda.kategorie_do_1_na_1,
            'stream_json':stream_json
        })

@login_required
def viewers(request):
    return render(request, "viewers.html")

def niebiescy_viewers(request):
    return render(request, "niebiescy.html")

def zieloni_viewers(request):
    return render(request, "zieloni.html")

def zolci_viewers(request):
    return render(request, "zolci.html")

def mistrzowie_viewers(request):
    return render(request, "mistrzowie.html")

def render_stream_panel(request):
    return render(request, "stream_panel.html", {
            'stream_json': stream_json,
            'stream': stream_json['stream'],
            'czas': stream_json['czas'],
        })

@login_required
def stream_panel(request):
    if request.method == "POST":
        try:
            variables = list(request.POST.keys())[1]
        except IndexError as e:
            messages.error(request, f"Nie wybrano żadnej opcji {e}")
            return render_stream_panel(request)
        if variables == "czas":
            stream_json["czas"] = not stream_json["czas"]
            return render_stream_panel(request)
        stream_json["stream"] = variables
        return render_stream_panel(request)
    return render_stream_panel(request)