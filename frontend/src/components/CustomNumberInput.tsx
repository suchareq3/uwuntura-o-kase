import { NumberInput, type MantineStyleProp } from "@mantine/core";

function CustomNumberInput({label, value, onChange, min=0, max, step=100, size='md', disabled, style}: {label?: string, value: string | number, onChange: (value: string | number) => void, min?: number, max?: number, step?: number, size?: string, disabled?: boolean, style?: MantineStyleProp}) {
    return <NumberInput
        disabled={disabled}
        label={label}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        size={size}
        style={style}
        onFocus={e => (e.target as HTMLInputElement).select()}
    />
}
export default CustomNumberInput;
