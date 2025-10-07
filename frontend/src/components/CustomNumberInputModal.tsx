import { Modal, Group, NumberInput, Button } from "@mantine/core";
import CustomNumberInput from "./CustomNumberInput";

function CustomNumberInputModal({opened, onClose, modalTitle, inputLabel, inputValue, inputOnChange, buttonOnClick}: {opened: boolean, onClose: () => void, modalTitle: string, inputLabel: string, inputValue: string | number, inputOnChange: (value: string | number) => void, buttonOnClick: () => void}) {
    return <>
        <Modal opened={opened} onClose={onClose} title={modalTitle} zIndex={10000} centered> 
            <Group>
                <CustomNumberInput
                    label={inputLabel}
                    value={inputValue}
                    onChange={inputOnChange}
                />
                <Button onClick={buttonOnClick}>Zatwierdz</Button>
            </Group>
        </Modal>
    </>
} 
export default CustomNumberInputModal;