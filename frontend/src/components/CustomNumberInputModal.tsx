import { Modal, Group, Button, Text, Radio, Stack } from "@mantine/core";
import CustomNumberInput from "./CustomNumberInput";
import { useState } from "react";
import type { Team } from "../lib/types";
import { getTeamColor } from "../lib/functions";

function CustomNumberInputModal({opened, onClose, modalTitle, inputLabel, buttonOnClick, usesRadio = false, teams, radioButtonOnClick}: {
  opened: boolean, 
  onClose: () => void, 
  modalTitle: string, 
  inputLabel: string, 
  buttonOnClick?: (value: string | number) => Promise<void>,
  usesRadio?: boolean,
  teams?: Team[],
  radioButtonOnClick?: (teamId: string, value: string | number) => Promise<void>
}) {
  const [value, setValue] = useState<string | number>(0);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  
  return <>
    <Modal opened={opened} onClose={onClose} title={modalTitle} zIndex={10000} centered>
      <Stack>
        {usesRadio && (
          <Radio.Group value={selectedTeam} onChange={setSelectedTeam}>
            <Text>Wybierz drużynę:</Text>
            <Group>
              {teams?.filter((team) => team.active).map((team) => (
                <Radio disabled={false} key={team.id} value={team.id} label={team.name} color={getTeamColor(team.name)}/>
              ))}
            </Group>
          </Radio.Group>
        )}
        <Stack gap={0}>
          <Text>{inputLabel}:</Text>
          <Group align="end">
            <CustomNumberInput
              value={value}
              onChange={setValue}
              style={{ width: '100px' }}
            />  
            <Button onClick={usesRadio ? 
              () => radioButtonOnClick?.(selectedTeam!, value).then(onClose) : 
              () => buttonOnClick?.(value).then(onClose)}>Zatwierdz</Button>
          </Group>
        </Stack>
      </Stack>
    </Modal>
  </>
}
export default CustomNumberInputModal;