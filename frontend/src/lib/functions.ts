import type { Team } from "./types";
import introSfx from "../sounds/awantura_intro.mp3";
import dingSfx from "../sounds/ding.mp3";
import dingDingDingSfx from "../sounds/dingdingding.mp3";
import usuniecieKategorii1na1Sfx from "../sounds/awantura_1na1_usuniecie_kategorii.mp3";
import losowanieKategoriiSfx from "../sounds/awantura_losowanie_kategorii.mp3";
import poczatkoweNadaniePieniedzySfx from "../sounds/awantura_poczatkowe_nadanie_pieniedzy.mp3";
import podczasLicytacjiSfx from "../sounds/awantura_podczas_licytacji.mp3";
import podsumowanieGryFullSfx from "../sounds/awantura_podsumowanie_gry_full.mp3";
import podsumowanieGryShortSfx from "../sounds/awantura_podsumowanie_gry_short.mp3";
import wybranoKategorie1Sfx from "../sounds/awantura_wybrano_kategorie_1.mp3";
import wybranoKategorie2Sfx from "../sounds/awantura_wybrano_kategorie_2.mp3";
import czasNaOdpowiedzSfx from "../sounds/czas_na_odpowiedz.mp3";
import dobraOdpowiedzSfx from "../sounds/dobra_odpowiedz.mp3";
import zlaOdpowiedzSfx from "../sounds/zla_odpowiedz.mp3";
import useSound from "use-sound";


export const useAwanturaSfx = () => {
  const [playIntroSfx] = useSound(introSfx, { interrupt: true });
  const [playDingSfx] = useSound(dingSfx, { interrupt: true });
  const [playDingDingDingSfx] = useSound(dingDingDingSfx, { interrupt: true });
  const [playUsuniecieKategorii1na1Sfx] = useSound(usuniecieKategorii1na1Sfx, { interrupt: true });
  const [playLosowanieKategoriiSfx] = useSound(losowanieKategoriiSfx, { interrupt: true });
  const [playPoczatkoweNadaniePieniedzySfx] = useSound(poczatkoweNadaniePieniedzySfx, { interrupt: true });
  const [playPodczasLicytacjiSfx] = useSound(podczasLicytacjiSfx, { interrupt: true });
  const [playPodsumowanieGryFullSfx] = useSound(podsumowanieGryFullSfx, { interrupt: true });
  const [playPodsumowanieGryShortSfx] = useSound(podsumowanieGryShortSfx, { interrupt: true });
  const [playWybranoKategorie1Sfx] = useSound(wybranoKategorie1Sfx, { interrupt: true });
  const [playWybranoKategorie2Sfx] = useSound(wybranoKategorie2Sfx, { interrupt: true });
  const [playCzasNaOdpowiedzSfx, { stop: stopCzasNaOdpowiedzSfx }] = useSound(czasNaOdpowiedzSfx, { interrupt: true });
  const [playDobraOdpowiedzSfx] = useSound(dobraOdpowiedzSfx, { interrupt: true });
  const [playZlaOdpowiedzSfx] = useSound(zlaOdpowiedzSfx, { interrupt: true });

  return { playIntroSfx, playDingSfx, playDingDingDingSfx, playUsuniecieKategorii1na1Sfx, 
    playLosowanieKategoriiSfx, playPoczatkoweNadaniePieniedzySfx, playPodczasLicytacjiSfx, 
    playPodsumowanieGryFullSfx, playPodsumowanieGryShortSfx, playWybranoKategorie1Sfx, 
    playWybranoKategorie2Sfx, playCzasNaOdpowiedzSfx, stopCzasNaOdpowiedzSfx, playDobraOdpowiedzSfx, playZlaOdpowiedzSfx };
}

export const getTeamColor = (name: Team['name']) => {
  const colors: Record<string, string> = {
    'niebiescy': 'blue',
    'zieloni': 'green',
    'zolci': 'yellow',
    'mistrzowie': 'gray',
  };
  return colors[name];
};

export const playSound = (sound: string) => {
  const audio = new Audio(`/sounds/${sound}.mp3`);
  audio.play();
};

export const stopAllSounds = () => {

}