import { Alert, AppShell, Card, Divider, Radio, Select, Stack, Stepper, useMantineTheme } from '@mantine/core';
import './css/AdminPanel.css'
import { useEffect, useState } from 'react';
import { Button, Group, Text } from '@mantine/core';
import pb from './lib/pb';
import type { Category, Game, Team } from './lib/types';
import { useDebouncedValue, useDisclosure } from '@mantine/hooks';
import Countdown, { zeroPad, type CountdownApi } from 'react-countdown';
import CustomNumberInputModal from './components/CustomNumberInputModal';
import CustomNumberInput from './components/CustomNumberInput';
import CustomCombobox from './components/CustomCombobox';
import { getTeamColor } from './lib/functions';

function AdminPanel() {
  const debounceMs = 500;
  const [teams, setTeams] = useState<Team[]>([]);
  const [game, setGame] = useState<Game | null>(null);
  const [categories, setCategories] = useState<{ value: string; label: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [inputValues, setInputValues] = useState<Record<string, number>>({});
  const [debouncedInputValues] = useDebouncedValue(inputValues, debounceMs);
  const [openedHintModal, { open: openHintModal, close: closeHintModal }] = useDisclosure(false);
  const [openedPenaltyModal, { open: openPenaltyModal, close: closePenaltyModal }] = useDisclosure(false);
  const [openedBuybackPlayerModal, { open: openBuybackPlayerModal, close: closeBuybackPlayerModal }] = useDisclosure(false);
  const [selected1v1AnsweringTeam, setSelected1v1AnsweringTeam] = useState<string | null>(null);

  let countdownApi: CountdownApi | null = null;

  const theme = useMantineTheme();

  //initial first-time data load
  useEffect(() => {
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
          has_vabanqued: item.has_vabanqued,
          "1v1_available_categories": item.expand?.["1v1_available_categories"],
          "1v1_selected_categories": item.expand?.["1v1_selected_categories"]
        })
        console.log("game:", game)
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
        has_vabanqued: e.record.has_vabanqued,
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

  const updateAmountGiven = async (teamId: string, value: number) => {
    try {
      return await pb.collection('teams').update(teamId, { amount_given: value });
    } catch (err) {
      console.error('Failed to update amount given:', err);
    }
  };

  // Handle debounced input value updates
  useEffect(() => {
    if (game?.status !== "licytacja") {
      return;
    }

    // Update all changed values
    Object.entries(debouncedInputValues).forEach(([teamId, value]) => {
      const team = teams.find(t => t.id === teamId);
      if (team && team.amount_given !== value) {
        updateAmountGiven(teamId, value);
      }
    });
  }, [debouncedInputValues, teams, game?.status]);

  const updateGameStatus = async (status: Game['status'], category?: string) => {
    try {
      // Clear local inputs immediately when moving away from 'licytacja'
      if (status !== 'licytacja') {
        setInputValues({});
      }
      await pb.collection('game').update("1", { status: status });
      if (status === "licytacja" && category) {
        await pb.collection('game').update("1", { current_category: category });
      }
    } catch (err) {
    console.error('updateGameStatus error:', err);
    }
  }

  const updateHasVaBanqued = async (hasVaBanqued: boolean) => {
    try {
      await pb.collection('game').update("1", { has_vabanqued: hasVaBanqued });
    } catch (err) {
      console.error('updateHasVaBanqued error:', err);
    }
  }

  const update1v1SelectedCategories = async (categoryIds: string[]) => {
    try {
      await pb.collection('game').update("1", { "1v1_selected_categories": categoryIds });
    } catch (err) {
      console.error('update1v1SelectedCategories error:', err);
    }
  }

  const updateAnsweringTeam = async (teamId: string) => {
    try {
      await pb.collection('game').update("1", { answering_team: teamId });
    } catch (err) {
      console.error('updateAnsweringTeam error:', err);
    }
  }

  const purchaseHint = async (hintPrice: string | number) => {
    try {
      await deductAnsweringTeamAmount(hintPrice);
      await pb.collection('game').update("1", { hint_purchased: true });
    } catch (err) {
      console.error('buyHint error:', err);
    }
  }

  const deductAnsweringTeamAmount = async (amount: string | number) => {
    try {
      await pb.collection('teams').update(game!.answering_team!.id, { "amount-": amount });
    } catch (err) {
      console.error('deductAmount error:', err);
    }
  }

  const deductTeamAmount = async (teamId: string, amount: string | number) => {
    try {
      await pb.collection('teams').update(teamId, { "amount-": amount });
    } catch (err) {
      console.error('deductTeamAmount error:', err);
    }
  }

  const vaBanque = async (team: Team) => {
    try {
      const newAmountGiven = team.amount + team.amount_given;
      
      updateHasVaBanqued(true).then(() => {
        setInputValues(prev => ({ ...prev, [team.id]: newAmountGiven }));
      });
    } catch (err) {
      console.error('Failed to perform va banque:', err);
    }
  }

  useEffect(() => {
    console.log('game changed:', game);
  }, [game]);

  const setRef = (countdown: Countdown | null): void => {
    if (countdown) {
      countdownApi = countdown.getApi();
    }
  };  

  useEffect(() => {
    const handlePauseClick = (): void => {
      countdownApi && countdownApi.pause();
    };
    
    if (game?.question_deadline) {
      handlePauseClick();
    }
  }, [game?.question_deadline])

  const stepperIndexByGameStatus: Record<Game['status'], number> = {
    losowanie_kategorii: 0,
    licytacja: 1,
    "1v1": 1,
    odpowiadanie: 2,
    "1v1_odpowiadanie": 2,
  }

  // Determine which team has the highest amount_given (> 0)
  const maxGiven = Math.max(0, ...teams.map(t => t.amount_given || 0));
  const highlightedId = maxGiven > 0 ? (teams.find(t => (t.amount_given || 0) === maxGiven)?.id ?? null) : null;

  return (
    <>
      <AppShell>
      <CustomNumberInputModal
        opened={openedHintModal}
        onClose={closeHintModal}
        modalTitle="Kupowanie podpowiedzi"
        inputLabel="Kwota za podpowiedz"
        buttonOnClick={purchaseHint}
      />
      <CustomNumberInputModal
        opened={openedPenaltyModal}
        onClose={closePenaltyModal}
        modalTitle="Kara"
        inputLabel="Kwota za kare"
        usesRadio
        teams={teams}
        radioButtonOnClick={deductTeamAmount}
      />
      <CustomNumberInputModal
        opened={openedBuybackPlayerModal}
        onClose={closeBuybackPlayerModal} 
        modalTitle="Wykup ziomka"
        inputLabel="Kwota za wykupienie ziomka"
        usesRadio
        teams={teams}
        radioButtonOnClick={deductTeamAmount}
      />
        <Stack>
          <Stepper active={game ? stepperIndexByGameStatus[game.status] : 0}>
            <Stepper.Step label="Losowanie kategorii" description="Step 1" />
            <Stepper.Step label="Licytacja/1v1" description="Step 2" />
            <Stepper.Step label="Odpowiedz" description="Step 3" />
          </Stepper>
          <Divider />
          <Group>
            {/* Losowanie kategorii */}
            <Stack>
              <Text>Runda: {game?.round}</Text>

              <Select
                disabled={game?.status !== "losowanie_kategorii"}
                label="Kategoria"
                placeholder="Wybierz kategorię"
                data={categories}
                value={selectedCategory?.id}
                onChange={value => {
                  const opt = categories.find((c) => c.value === value);
                  setSelectedCategory(opt ? { id: opt.value, name: opt.label } : null);
                }}
              />
              <Button onClick={() => {
                if (selectedCategory) {
                  if (selectedCategory.name === "1v1") {
                    updateGameStatus("1v1", selectedCategory.id);
                  } else {
                    updateGameStatus("licytacja", selectedCategory.id);
                  }
                }
              }} disabled={!selectedCategory || game?.status !== "losowanie_kategorii"}>{selectedCategory?.name === "1v1" ? "1 na 1!!!" : "Zatwierdź"}</Button>
              <Divider />
              <Button  onClick={openPenaltyModal}>
                Kara 
              </Button>
              <Button onClick={openBuybackPlayerModal}>
                Wykup ziomka
              </Button>
            </Stack>
            <Divider orientation='vertical' />

            {game?.status === "1v1" ? (
              // 1v1 kategorie
              <Stack>
              <Text>1v1</Text>
              <CustomCombobox 
                available_categories={game?.['1v1_available_categories'] || []} 
                selected_categories={game?.['1v1_selected_categories'] || []} 
                onOptionSubmit={(id) => {
                  const selectedIds = (game?.['1v1_selected_categories'] || []).map(c => c.id);
                  if (selectedIds.length >= 6 && !selectedIds.includes(id)) {
                    return;
                  }
                  const next = selectedIds.includes(id) ? selectedIds.filter(x => x !== id) : [...selectedIds, id];
                  update1v1SelectedCategories(next);
                }}
              />
              <Button onClick={() => updateGameStatus("1v1_odpowiadanie")}
                disabled={game?.status !== "1v1" || (game?.['1v1_selected_categories']?.length ?? 0) < 6}
              >{`(${game?.['1v1_selected_categories']?.length ?? 0}/6) Zakoncz 1v1`}</Button>
            </Stack>
            ) : (
              // Licytacja
              <Stack>
              <Card>
                <Group>
                  <Button variant='filled' 
                    onClick={() => 
                      {
                        if (game?.current_category?.name.toLowerCase() === "czarna skrzynka") {
                          pb.send('/api/game/skip_round', { method: 'POST'});
                        } else if (game?.current_category?.name.toLowerCase() === "podpowiedz") {
                          pb.send('/api/game/skip_round', { method: 'POST'});
                        } else {
                          updateGameStatus("odpowiadanie")
                        }
                      }
                    } 
                    disabled={game?.status !== "licytacja" || game?.jackpot <= 0}>
                      Zakoncz licytacje
                  </Button>
                  <Text>Jackpot: {game?.jackpot}</Text>
                </Group>
                <Text>
                  {game?.has_vabanqued ? "hasVaBanqued true!" : "hasVaBanqued false :("}
                </Text>
              </Card>
              {teams.length === 0 ? (
                <Text>Loading teams…</Text>
              ) : (
                teams.map((team) => (
                  <Alert style={{ minWidth: '330px', boxShadow: (team.id === highlightedId || team.id === game?.answering_team?.id)  ? 'inset 0px 0px 0px 5px' : undefined }} key={team.id} variant='light' color={getTeamColor(team.name)} 
                    title={<Group justify='space-between' align='baseline'>
                      <Stack align='start'>
                        <Text size='28px' fw={700}>{team.amount + " zł"}</Text>
                        <Text>given: {team.amount_given + " zł"}</Text>
                      </Stack>
                      <Stack align='end' gap="xs">
                        <CustomNumberInput
                          disabled={game?.status !== "licytacja" || game?.has_vabanqued || !team.active}
                          value={inputValues[team.id] ?? (team.amount_given ?? 0)}
                          min={0}
                          step={100}
                          max={team.amount + team.amount_given}
                          size='md'
                          style={{ width: '100px' }}
                          onChange={(value: number | string | null) => {
                            const next = typeof value === 'number' ? value : value == null || value === '' ? 0 : Number(value);
                            if (!Number.isNaN(next)) {
                              setInputValues(prev => ({ ...prev, [team.id]: next }));
                            }
                          }}
                        />
                        <Button 
                          variant='filled' 
                          onClick={() => vaBanque(team)} 
                          disabled={game?.status !== "licytacja" || game?.has_vabanqued || (team.amount_given + team.amount ) === 0 || !team.active}
                          tabIndex={-1}
                        >
                          VA BANQUE!
                        </Button>
                      </Stack>
                    </Group>}
                  >
                  </Alert>
                ))
              )}
            </Stack>
            )}
            <Divider orientation='vertical' />

            {game?.status === "1v1_odpowiadanie" ? (
              // 1v1 odpowiedz
              <Stack maw={"500px"}>
                <Card>
                  <Stack gap={"md"}>
                    <Text fw={700}>Wybierz druzyne</Text>
                    <Radio.Group value={game?.answering_team?.id} onChange={setSelected1v1AnsweringTeam}>
                      <Text>Wybrana druzyna local: {selected1v1AnsweringTeam}</Text>
                        <Text>Wybrana druzyne: {game?.answering_team?.name}</Text>
                      <Group>
                        
                      {teams.filter((team) => team.active).map((team) => (
                        <Radio disabled={game?.answering_team != undefined} key={team.id} value={team.id} label={team.name} />
                      ))}
                      </Group>
                    </Radio.Group>
                    <Button variant='filled' disabled={!selected1v1AnsweringTeam || game?.answering_team != undefined} 
                      onClick={() => {
                        updateAnsweringTeam(selected1v1AnsweringTeam || "");
                        setSelected1v1AnsweringTeam(null);
                      }}>
                      Wybierz
                    </Button>
                  </Stack>
                </Card>
                <Divider />
                <Card>
                  <Text>Kategoria: {game?.current_category?.name}</Text>
                </Card>
                <Card>
                  <Text>Pytanie: {game?.current_question?.description}</Text>
                </Card>
                <Card>
                  <Text>Odpowiedz: {game?.current_question?.answer}</Text>
                </Card>
                <Card>
                  <Text>Podpowiedzi: {game?.current_question?.fake_answers}</Text>
                </Card>
                <Group>
                  <Button disabled={!game?.answering_team} variant='filled' onClick={async () => {
                    try {
                      await pb.send('/api/game/answer', { method: 'POST', body: { correct: true } });
                    } catch (err) {
                      console.error('Failed to submit correct answer:', err);
                    }
                  }}>Poprawna</Button>
                  <Button disabled={!game?.answering_team} variant='filled' onClick={async () => {
                    try {
                      await pb.send('/api/game/answer', { method: 'POST', body: { correct: false } });
                    } catch (err) {
                      console.error('Failed to submit incorrect answer:', err);
                    }
                  }}>Zła</Button>
                </Group>
              </Stack>
            ) : (
              // Odpowiedz
              <Stack w={"500px"}><Group>
              <Button disabled={game?.status !== "odpowiadanie"} onClick={async () => {
                try {
                  await pb.send('/api/game/timer', { method: 'POST' });
                } catch (err) {
                  console.error('Failed to start timer:', err);
                }
              }}>Start timer</Button>
              <Button disabled={game?.status !== "odpowiadanie"} onClick={async () => {
                try {
                  await pb.collection('game').update("1", { question_deadline: null });
                } catch (err) {
                  console.error('Failed to stop timer:', err);
                }
              }}>Stop timer</Button>
              {game?.question_deadline ? <Countdown 
                key={game?.question_deadline?.toString()} 
                date={game?.question_deadline}
                ref={setRef}
                renderer={({ minutes, seconds }: { minutes: number; seconds: number }) => {
                    return (
                      
                        <Text fz={"1.5rem"} className="awantura-font">
                          {minutes}:{zeroPad(seconds)}
                        </Text>
                      
                    );
                  }}
              /> : <Text>-</Text>}
              </Group>
              <Card>
                <Text>Kategoria: {game?.current_category?.name}</Text>
              </Card>
              <Card>
                <Text>Pytanie: {game?.current_question?.description}</Text>
              </Card>
              <Card>
                <Text>Odpowiedz: {game?.current_question?.answer}</Text>
              </Card>
              <Card>
                <Text>Podpowiedzi (KUPIONE={game?.hint_purchased?.toString()}): {game?.current_question?.fake_answers}</Text>
              </Card>
              <Group>
                <Button disabled={game?.status !== "odpowiadanie"} variant='filled' onClick={async () => {
                  try {
                    await pb.send('/api/game/answer', { method: 'POST', body: { correct: true } });
                  } catch (err) {
                    console.error('Failed to submit correct answer:', err);
                  }
                }}>Poprawna</Button>
                <Button disabled={game?.status !== "odpowiadanie"} variant='filled' onClick={async () => {
                  try {
                    await pb.send('/api/game/answer', { method: 'POST', body: { correct: false } });
                  } catch (err) {
                    console.error('Failed to submit incorrect answer:', err);
                  }
                }}>Zła</Button>
                <Divider orientation="vertical" />
                <Button disabled={game?.status !== "odpowiadanie" || game?.hint_purchased} onClick={openHintModal}>
                  Kup podpowiedz
                </Button>
              </Group>
              
              </Stack>
            )}
          </Group>
        </Stack>
        
      </AppShell>
    </>
  )
}
export default AdminPanel;