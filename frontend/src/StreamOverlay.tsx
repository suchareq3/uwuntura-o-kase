import PocketBase, { ClientResponseError } from 'pocketbase';
import { useEffect, useState } from 'react';
import Licytacja from './components/Licytacja';
import type { Game, Team } from './lib/types';
import './css/_variables.css';
import './css/global.css';
import './css/PulaTile.css';
import './css/Pytanie.css';
import 'unfonts.css'
import StanyKont from './components/StanyKont';
import { Center, Group, Stack, Text } from '@mantine/core';
import Pytanie from './components/Pytanie';
import Czas from './components/Czas';
import JedenNaJedenOverlay from './components/JedenNaJedenOverlay';


const pb = new PocketBase('http://127.0.0.1:8090');
await pb.collection("_superusers").authWithPassword(import.meta.env.VITE_BACKEND_ADMIN_EMAIL, import.meta.env.VITE_BACKEND_ADMIN_PASSWORD)

export default function StreamOverlay() {
    const [error, setError] = useState<Error | null>(null);
    const [teams, setTeams] = useState<Team[]>([]);
    const [game, setGame] = useState<Game | null>(null);
    const [categories, setCategories] = useState<{ value: string; label: string }[]>([]);
    
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
                question_deadline: item.question_deadline,
                "1v1_available_categories": item.expand?.["1v1_available_categories"],
                "1v1_selected_categories": item.expand?.["1v1_selected_categories"]
              })
            } catch (err) {
              console.error('Failed to initialize game state:', err);
            }
        };
      
        const getCategories = async () => {
            try {
              const coll = await pb.collection("categories").getFullList();
              setCategories(coll.map((c: any) => ({ value: c.id, label: c.name })));
            } catch (err) {
              console.error('Failed to initialize categories:', err);
            }
        };
      
        getTeams();
        getGame();
        getCategories();
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
        <Group w={"100%"} h={"100%"} align="center" justify="center" gap={0}>
            {game?.status === "1v1" ?
                <>
                    <JedenNaJedenOverlay 
                        wszystkieKategorie={game?.["1v1_available_categories"] || []}
                        wybraneKategorie={game?.["1v1_selected_categories"] || []}
                    />
                </>
                :
                <Stack justify='end' w={"76%"} h={"85%"} gap={0} pos={'relative'}>
                    {/* {game?.status === "losowanie_kategorii" && <h1>Losowanie kategorii</h1>} */}
                {game?.question_deadline && <Czas date={game?.question_deadline} />}
                    
                {game?.status === "licytacja" && 
                <>
                    <Licytacja
                        kwotaZolci={teams.find(team => team.name === "zolci")?.amount_given ?? 0}
                        kwotaZieloni={teams.find(team => team.name === "zieloni")?.amount_given ?? 0}
                        kwotaNiebiescy={teams.find(team => team.name === "niebiescy")?.amount_given ?? 0}
                        kwotaMistrzowie={teams.find(team => team.name === "mistrzowie")?.amount_given ?? 0}
                        czyActiveNiebiescy={teams.find(team => team.name === "niebiescy")?.active}
                        czyActiveZieloni={teams.find(team => team.name === "zieloni")?.active}
                        czyActiveZolci={teams.find(team => team.name === "zolci")?.active}
                        czyActiveMistrzowie={teams.find(team => team.name === "mistrzowie")?.active == false}
                    />
                    <StanyKont
                        kwotaZolci={teams.find(team => team.name === "zolci")?.amount ?? 0}
                        kwotaZieloni={teams.find(team => team.name === "zieloni")?.amount ?? 0}
                        kwotaNiebiescy={teams.find(team => team.name === "niebiescy")?.amount ?? 0}
                        kwotaMistrzowie={teams.find(team => team.name === "mistrzowie")?.amount ?? 0}
                        pula={game?.jackpot}
                        czyActiveNiebiescy={teams.find(team => team.name === "niebiescy")?.active}
                        czyActiveZieloni={teams.find(team => team.name === "zieloni")?.active}
                        czyActiveZolci={teams.find(team => team.name === "zolci")?.active}
                        czyActiveMistrzowie={teams.find(team => team.name === "mistrzowie")?.active == false}
                    />
                </>
                }
                {game?.status === "odpowiadanie" && 
                <>
                    <Pytanie 
                        runda={game.round}
                        nazwaKategorii={game.current_category?.name || ''}
                        trescPytania={game.current_question?.description || ''}
                        ktoOdpowiada={game.answering_team?.name || ''}  
                        pula={game.jackpot}
                        podpowiedzi={game.current_question?.fake_answers || ''}
                        odpowiedz={game.current_question?.answer || ''}
                        pokazPodpowiedzi={game.hint_purchased}
                    />
                </>
                }
                </Stack>
            }

        </Group>
        </>
    );
}