from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import login as login_user, authenticate
from django.contrib.auth.decorators import login_required
from .forms import LoginForm
from django.http import HttpResponseRedirect

class druzyna:
    pula = 5000

    def __init__(self):
        pass

    def odejmij(self, kwota):
        if self.pula > 0:
            self.pula -= kwota
        else:
            print("Nie masz już kasy")

    def dodaj(self, kwota):
        self.pula += kwota

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
    
    def dodaj(self, Kwota):
        self.pula += Kwota
    
    def zeruj(self):
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
        action = request.POST.get("action")
        action_map = {
            "niebiescy": niebiescy,
            "zieloni": zieloni,
            "zolci": zolci,
            "mistrzowie": mistrzowie
        }

        akcja = action.split("-")[1]

        for team, points in action_map.items():
            for amount in ["100", "200", "500", "vabank"]:
                if f"add-{amount}-{team}" == action:
                    if akcja == "vabank":
                        punkty:int = points.pula
                        points.odejmij(punkty)
                        pula.dodaj(punkty)
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
                        punkty:int = int(amount)
                        points.odejmij(punkty)
                        pula.dodaj(punkty)
        return redirect("gra")
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