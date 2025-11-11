import { ClientResponseError } from 'pocketbase';
import { useEffect, useState } from 'react';
import type { Game, Team } from './lib/types';
import './css/_variables.css';
import './css/global.css';
import './css/PulaTile.css';
import './css/Pytanie.css';
import 'unfonts.css'
import { SimpleGrid, Stack } from '@mantine/core';
import Pytanie from './components/Pytanie';
import PulaTile from './components/PulaTile';
import JedenNaJedenOverlay from './components/JedenNaJedenOverlay';
import pb from './lib/pb';

export default function MobileUI() {
    const [error, setError] = useState<Error | null>(null);
    const [teams, setTeams] = useState<Team[]>([]);
    const [game, setGame] = useState<Game | null>(null);
    
    //initial first-time data load
    useEffect(() => {
        const authenticate = async () => {
          await pb.collection("_superusers").authWithPassword(import.meta.env.VITE_BACKEND_ADMIN_EMAIL, import.meta.env.VITE_BACKEND_ADMIN_PASSWORD)
          .catch((err: ClientResponseError ) => {
            // autocancelled ("aborted") errors are intended here - https://github.com/pocketbase/pocketbase/discussions/3491
            if (!err.isAbort) {
              setError(err.originalError);
            }
          })
        }

        const getTeams = async () => {
            try {
              const list = await pb.collection('teams').getFullList({ sort: 'name' });
              setTeams(list.map((t: any) => ({ id: t.id, name: t.name, amount: Number(t.amount), amount_given: Number(t.amount_given), active: t.active })));
            } catch (err) {
              console.error('Failed to initialize teams:', err);
            }
        };
      
        const getGame = async () => {
            try {
              const item = await pb.collection('game').getOne("1", {expand: "answering_team,current_category,current_question,1v1_available_categories,1v1_selected_categories"});
              setGame({
                id: item.id,
                round: item.round,
                status: item.status,
                jackpot: item.jackpot,
                answering_team: item.expand?.answering_team,
                current_category: item.expand?.current_category,
                current_question: item.expand?.current_question,
                hint_purchased: item.hint_purchased,
                show_question: item.show_question,
                special_jackpot: item.special_jackpot,
                show_1v1_categories: item.show_1v1_categories,
                question_deadline: item.question_deadline,
                "1v1_available_categories": item.expand?.["1v1_available_categories"],
                "1v1_selected_categories": item.expand?.["1v1_selected_categories"]
              })
            } catch (err) {
              console.error('Failed to initialize game state:', err);
            }
        };
      
        getTeams();
        getGame();
        authenticate();
    }, []);

    //realtime data subscription
    useEffect(() => {
        pb.collection('teams').subscribe('*', (e) => {
            setTeams(prev =>
                prev.map(x => (x.id === e.record.id ? { id: e.record.id, name: e.record.name, amount: Number(e.record.amount), amount_given: Number(e.record.amount_given), active: e.record.active } : x))
            );
        })
        .catch(err => {
            console.error('Failed to subscribe to teams realtime:', err);
        })

        pb.collection('game').subscribe('1', (e) => {
            setGame({
                id: e.record.id,
                round: e.record.round,
                status: e.record.status,
                jackpot: e.record.jackpot,
                answering_team: e.record.expand?.answering_team,
                current_category: e.record.expand?.current_category,
                current_question: e.record.expand?.current_question,
                hint_purchased: e.record.hint_purchased,
                show_question: e.record.show_question,
                show_1v1_categories: e.record.show_1v1_categories,
                special_jackpot: e.record.special_jackpot,
                question_deadline: e.record.question_deadline,
                "1v1_available_categories": e.record.expand?.["1v1_available_categories"],
                "1v1_selected_categories": e.record.expand?.["1v1_selected_categories"]
            })
            console.log("item:", e.record)
            //setGameState(item);
        }, {expand: "answering_team,current_category,current_question,1v1_available_categories,1v1_selected_categories"})
        .catch(err => {
            console.error('Failed to subscribe to game state realtime:', err);
        })

        return () => {
            pb.collection('teams').unsubscribe();
            pb.collection('game').unsubscribe();
        }
    }, [])

    if (error) {
        return <h1>{error.message + " " + error.name}</h1>
    }

    return (
        <>
        <Stack w={"100%"} h={"100%"} py={"md"}>
          <SimpleGrid cols={2} spacing={0}>
            {teams.map(team => (
              <PulaTile
                nazwaDruzyny={team.name}
                pula={team.amount}
                customWidth="100%"
                pulaHeight='80px'
                // todo: add gray if team is not active
              />
            ))}
          </SimpleGrid>

          <PulaTile
            nazwaDruzyny="ogolna"
            opis='PULA'
            pula={game?.jackpot || 0 }
            customWidth="100%"
            pulaHeight='90px'
            // todo: add gray if team is not active
          />

          {game?.status === "1v1" &&
          <JedenNaJedenOverlay 
            wszystkieKategorie={game?.['1v1_available_categories'] || []}
            wybraneKategorie={game?.['1v1_selected_categories'] || []}
            isMobile={true}
          />}

          {(game?.status === "odpowiadanie" || game?.status === "1v1_odpowiadanie") &&
            game?.show_question &&
          <Pytanie
            ktoOdpowiada={game?.answering_team?.name || ""}
            runda={game?.round || 0}
            nazwaKategorii={game?.current_category?.name || ""}
            trescPytania={game?.current_question?.description || ""}
            podpowiedzi={game?.current_question?.fake_answers || ""}
            pokazPodpowiedzi={game?.hint_purchased || false}
            showOpis={true}
            isMobile={true}
            odpowiedz={game?.current_question?.answer || ""}
            customOpisHeight="50px"
            questionDeadline={game?.question_deadline}
          />}
        </Stack>
        </>
    );
}