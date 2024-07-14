from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import login as login_user, authenticate
from django.contrib.auth.decorators import login_required
from .forms import LoginForm
from django.http import HttpResponseRedirect
import random

pytania = {
    "kategoria-1" : {
        "xd",
        "tak"
    },
    "kategoria-2" : {
        "xddd",
        "nie"
    },
    "kategoria-3" : {
        "top kek",
        "może być"
    }
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
    }
}

class kategoria:
    kategoria = ""
    pytanie = ""
    odpowiedz = ""

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
    runda = 5 #KONIECZNIE DO ZMIANY NA 0
    licytacja = False
    czy_nastepna_runda = True

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

    def zmiana_licytacja(self):
        self.licytacja = not self.licytacja

runda = runda()

class druzyna:
    pula = 5000
    tymczasowa_pula = 0
    czy_gra = True
    licytowal = False

    def __init__(self):
        pass

    def odejmij(self, kwota):
        if self.pula > 0:
            self.pula -= kwota
        else:
            print("Nie masz już kasy")

    def dodaj_pula(self, kwota):
        self.pula += kwota

    def dodaj_tymczasowa_pula(self, Kwota):
        self.tymczasowa_pula += Kwota

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
            if user:
                login_user(request, user)
                return redirect('gra')
            else:
                messages.error(request, "Incorrect username or password. Please try again.")
                return HttpResponseRedirect(request.path_info)
        else:
            return render(request, "login.html", {'form': form})
    return render(request, "login.html")

@login_required
def panel(request):
    return render(request, "panel.html")

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
            'odpowiedz': kategoria.odpowiedz
        }
        )

@login_required
def gra(request):
    if request.method == "POST":
        action_map = {
            "niebiescy": niebiescy,
            "zieloni": zieloni,
            "zolci": zolci,
            "mistrzowie": mistrzowie
        }
        tymczasowa_pula = 0
        for team, points in action_map.items():
            if tymczasowa_pula < points.tymczasowa_pula:
                tymczasowa_pula = points.tymczasowa_pula
        if request.POST.get("reset"):
            for _, team in action_map.items():
                team.pula = 5000
                team.czy_gra = True
                team.licytowal = False
            pula.pula = 0
            runda.reset()
            kategoria.wyczysc_kategorie()
            return rendering(request)
        elif request.POST.get("koniec-licytacji") and pula.pula == 0:
            print("Nie możesz zakończyć licytacji bez podania kwoty")
            return rendering(request)
        elif request.POST.get("kategoria"):
            kategoria.dodaj_kategorie(request.POST.get("kategoria"))
            if runda.licytacja == True:
                runda.zmiana_licytacja()
            return rendering(request)
        elif request.POST.get("runda"):
            if runda.czy_nastepna_runda == False:
                print("Nie zakończyła się poprzednia runda")
                return rendering(request)
            if kategoria.kategoria == "":
                print("Wybierz kategorię najpierw")
                return rendering(request)
            if runda.dodaj_runda() == False: #dodać popup do tego
                print("Za dużo rund")
                return rendering(request)
            for _, team in action_map.items():
                if team == mistrzowie and runda.runda <= 6:
                    break
                team.odejmij(200)
                pula.dodaj_pula(200, team)
            runda.czy_nastepna_runda = False
            return rendering(request)
        elif kategoria.kategoria == "":
            print("Nie wybrano kategorii")
            return rendering(request)
        elif request.POST.get("koniec-licytacji"):
            runda.zmiana_licytacja()
            return rendering(request)
        elif request.POST.get("action"):
            if runda.licytacja == True: #dodać popup do tego
                print("Koniec licytacji")
                return rendering(request)
            elif runda.runda == 0: #dodać popup do tego
                print("Runda nie może być zerowa")
                return rendering(request)
            action = request.POST.get("action")
            akcja = action.split("-")
            for amount in ["100", "200", "500", "vabank"]:
                for team, points in action_map.items():
                    if f"add-{amount}-{team}" == action:
                        if runda.runda <= 6 and team == "mistrzowie":
                            print("Mistrzowie nie mogą licytować przed 7 rundą")
                            return rendering(request)
                        elif runda.runda > 6 and points.czy_gra == False:
                            print("Ta drużyna już nie gra")
                            return rendering(request)
                        if akcja[1] == "vabank":
                            punkty:int = points.pula
                            points.odejmij(punkty)
                            pula.dodaj_pula(punkty, team)
                            runda.zmiana_licytacja()
                        else:
                            if points.licytowal == True:
                                print("Ta drużyna już licytowała") #dodać popup do tego
                                return rendering(request)
                            punkty:int = int(amount) + tymczasowa_pula - points.tymczasowa_pula
                            points.odejmij(punkty)
                            pula.dodaj_pula(punkty, team)
                            points.dodaj_tymczasowa_pula(punkty)
                            for _, team in action_map.items():
                                team.licytowal = False
                            points.licytowal = True
                        return rendering(request)
            return rendering(request)
        elif any(key.startswith("add-X-") for key in request.POST.keys()):
            if runda.licytacja == True: #dodać popup do tego
                return rendering(request)
            for team, points in action_map.items():
                action = request.POST.getlist(f"add-X-{team}")
                if runda.runda <= 6 and team == "mistrzowie":
                    print("Mistrzowie nie mogą licytować przed 7 rundą")
                    return rendering(request)
                if action:
                    if runda.runda > 6 and points.czy_gra == False:
                        print("Ta drużyna już nie gra")
                        return rendering(request)
                    if points.licytowal == True:
                        print("Ta drużyna już licytowała") #dodać popup do tego
                        return rendering(request)
                    try:
                        punkty:int = int(action[1]) + tymczasowa_pula - points.tymczasowa_pula
                    except ValueError:
                        continue
                    if punkty % 100 != 0: #dodaj_pula popup do tego 
                        return rendering(request)
                    points.odejmij(punkty)
                    pula.dodaj_pula(punkty, team)
                    points.dodaj_tymczasowa_pula(punkty)
                    for _, team in action_map.items():
                        team.licytowal = False
                    points.licytowal = True
                    return rendering(request)
            return rendering(request)
        elif request.POST.get("dobra_odpowiedz"):
            if runda.licytacja == False:
                print("nie możesz odpowiedzieć na pytanie zanim się nie zamknie licytacja")
                return rendering(request)
            elif runda.runda == 0:
                print("Runda nie może być zerowa")
                return rendering(request)
            druzyna = action_map[pula.wypisz_team()]
            druzyna.dodaj_pula(pula.pula)
            pula.zeruj_pula()
            kategoria.wyczysc_kategorie()
            runda.zmiana_licytacja()
            for _, team in action_map.items():
                team.zeruj_tymczasowa_pula()
            if runda.runda == 6:
                najwieksza_pula = 0
                najwiekszy_team = None
                for name,team in action_map.items():
                    if name == "mistrzowie":
                        continue
                    if team.pula > najwieksza_pula:
                        najwieksza_pula = team.pula
                        najwiekszy_team = team
                for name, team in action_map.items():
                    if name == "mistrzowie":
                        continue
                    if team != najwiekszy_team:
                        team.zmiana_gry()
            runda.czy_nastepna_runda = True
            return rendering(request)
        elif request.POST.get("zla_odpowiedz"):
            if runda.licytacja == False:
                print("nie możesz odpowiedzieć na pytanie zanim się nie zamknie licytacja")
                return rendering(request)
            elif runda.runda == 0:
                print("Runda nie może być zerowa")
                return rendering(request)
            kategoria.wyczysc_kategorie()
            runda.zmiana_licytacja()
            for _, team in action_map.items():
                team.zeruj_tymczasowa_pula()
            if runda.runda == 6:
                druzyna = action_map[pula.wypisz_team()]
                najwieksza_pula = 0
                najwiekszy_team = None
                for name,team in action_map.items():
                    if name == "mistrzowie":
                        continue
                    if team.pula > najwieksza_pula:
                        najwieksza_pula = team.pula
                        najwiekszy_team = team
                for name,team in action_map.items():
                    if name == "mistrzowie":
                        continue
                    if team != najwiekszy_team:
                        team.zmiana_gry()
                if najwiekszy_team != druzyna: #konieczny popup do dodania, 6 runda przegrana
                    
                    pass
            runda.czy_nastepna_runda = True
            return rendering(request)
        else:
            return rendering(request)
    else:
        return rendering(request)

@login_required
def viewers(request):
    return render(request, "viewers.html")