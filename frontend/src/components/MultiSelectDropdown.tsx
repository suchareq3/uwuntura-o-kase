import { Combobox, Group, ScrollArea, Text, useCombobox } from '@mantine/core';
import { useMemo } from 'react';

export type MultiSelectItem = { value: string; label: string };

export interface MultiSelectDropdownProps {
  data: MultiSelectItem[];
  value: string[];
  onChange: (next: string[]) => void;
  disabled?: boolean;
  maxDropdownHeight?: number;
  // Optional custom target renderer. If omitted, a simple text target is used.
  renderTarget?: (ctx: {
    opened: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
    selectedLabels: string[];
  }) => React.ReactNode;
}

export default function MultiSelectDropdown({
  data,
  value,
  onChange,
  disabled,
  maxDropdownHeight = 220,
  renderTarget,
}: MultiSelectDropdownProps) {
  const store = useCombobox({
    onDropdownOpen: () => store.resetSelectedOption(),
    onDropdownClose: () => store.resetSelectedOption(),
  });

  const selectedLabels = useMemo(
    () => data.filter((d) => value.includes(d.value)).map((d) => d.label),
    [data, value]
  );

  const open = () => !disabled && store.openDropdown();
  const close = () => store.closeDropdown();
  const toggle = () => (store.dropdownOpened ? close() : open());

  const handleSubmit = (val: string) => {
    if (disabled) return;
    const exists = value.includes(val);
    const next = exists ? value.filter((v) => v !== val) : [...value, val];
    onChange(next);
  };

  return (
    <Combobox
      store={store}
      withinPortal={false}
      onOptionSubmit={handleSubmit}
      disabled={disabled}
    >
      <Combobox.Target>
        {renderTarget ? (
          renderTarget({ opened: store.dropdownOpened, open, close, toggle, selectedLabels })
        ) : (
          <div
            onClick={toggle}
            role="button"
            aria-expanded={store.dropdownOpened}
            aria-disabled={disabled}
            style={{
              padding: 8,
              border: '1px solid var(--mantine-color-default-border)',
              borderRadius: 6,
              cursor: disabled ? 'not-allowed' : 'pointer',
              color: 'var(--mantine-color-text)',
              background: 'var(--mantine-color-body)',
              minWidth: 180,
              userSelect: 'none',
            }}
          >
            <Text size="sm">
              {selectedLabels.length > 0
                ? `${selectedLabels.length} selected`
                : 'Select items'}
            </Text>
          </div>
        )}
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          <ScrollArea.Autosize mah={maxDropdownHeight} type="auto">
            {data.length === 0 ? (
              <Combobox.Empty>Nothing to select</Combobox.Empty>
            ) : (
              data.map((item) => {
                const checked = value.includes(item.value);
                return (
                  <Combobox.Option value={item.value} key={item.value}>
                    <Group justify="space-between" gap="xs">
                      <Text size="sm">{item.label}</Text>
                      <Text size="sm" aria-hidden style={{ opacity: checked ? 1 : 0 }}>
                        ✔
                      </Text>
                    </Group>
                  </Combobox.Option>
                );
              })
            )}
          </ScrollArea.Autosize>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
