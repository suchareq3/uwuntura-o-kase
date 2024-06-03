from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import login as login_user, authenticate
from django.contrib.auth.decorators import login_required
from .forms import LoginForm
from django.http import HttpResponseRedirect

class druzyna:
    pula = 5000
    tymczasowa_pula = 0

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

    def wypisz(self):
        return print(self.pula)

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

    def __init__(self):
        pass
    
    def dodaj_pula(self, Kwota):
        self.pula += Kwota
    
    def zeruj_pula(self):
        self.pula = 0
    
    def wypisz(self):
        return print(self.pula)

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
        if request.POST.get("action"):
            action = request.POST.get("action")   
            akcja = action.split("-")
            check = False
            for amount in ["100", "200", "500", "vabank"]:
                if check == True:
                    break
                for team, points in action_map.items():
                    if f"add-{amount}-{team}" == action:
                        if akcja[1] == "vabank":
                            punkty:int = points.pula
                            points.odejmij(punkty)
                            pula.dodaj_pula(punkty)
                            return render(
                                request, 
                                "admin_panel.html", 
                                {
                                    'pula': pula.pula,
                                    'pula_niebiescy': niebiescy.pula,
                                    'pula_zieloni': zieloni.pula,
                                    'pula_zolci': zolci.pula,
                                    'pula_mistrzowie': mistrzowie.pula
                                }
                                )
                        else:
                            punkty:int = int(amount) + tymczasowa_pula - points.tymczasowa_pula
                            points.odejmij(punkty)
                            pula.dodaj_pula(punkty)
                            points.dodaj_tymczasowa_pula(punkty)
                            check = True
                            break
            return render(
                request, 
                "admin_panel.html", 
                {
                    'pula': pula.pula,
                    'pula_niebiescy': niebiescy.pula,
                    'pula_zieloni': zieloni.pula,
                    'pula_zolci': zolci.pula,
                    'pula_mistrzowie': mistrzowie.pula
                }
                )
        elif any(key.startswith("add-X-") for key in request.POST.keys()):
            for team, points in action_map.items():
                action = request.POST.getlist(f"add-X-{team}")
                if action:
                    try:
                        punkty:int = int(action[1]) + tymczasowa_pula - points.tymczasowa_pula
                    except ValueError:
                        continue
                    if punkty % 100 != 0: #dodaj_pula popup do tego 
                        return render(
                            request, 
                            "admin_panel.html", 
                            {
                                'pula': pula.pula,
                                'pula_niebiescy': niebiescy.pula,
                                'pula_zieloni': zieloni.pula,
                                'pula_zolci': zolci.pula,
                                'pula_mistrzowie': mistrzowie.pula
                            }
                            )
                    points.odejmij(punkty)
                    pula.dodaj_pula(punkty)
                    points.dodaj_tymczasowa_pula(punkty)
                    break
            return render(
                    request, 
                    "admin_panel.html",
                    {
                        'pula': pula.pula,
                        'pula_niebiescy': niebiescy.pula,
                        'pula_zieloni': zieloni.pula,
                        'pula_zolci': zolci.pula,
                        'pula_mistrzowie': mistrzowie.pula
                    }
                    )
        else:
            return render(
                request, 
                "admin_panel.html",
                {
                    'pula': pula.pula,
                    'pula_niebiescy': niebiescy.pula,
                    'pula_zieloni': zieloni.pula,
                    'pula_zolci': zolci.pula,
                    'pula_mistrzowie': mistrzowie.pula
                }
                )
    else:
        return render(
            request, 
            "admin_panel.html", 
            {
                'pula': pula.pula,
                'pula_niebiescy': niebiescy.pula,
                'pula_zieloni': zieloni.pula,
                'pula_zolci': zolci.pula,
                'pula_mistrzowie': mistrzowie.pula
             }
            )

@login_required
def viewers(request):
    return render(request, "viewers.html")