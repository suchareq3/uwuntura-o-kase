import { useState } from 'react';
import { CheckIcon, Combobox, TextInput } from '@mantine/core';
import type { Category } from '../lib/types';

function CustomCombobox({ available_categories, selected_categories, onOptionSubmit }: { available_categories: Category[]; selected_categories: Category[]; onOptionSubmit: (id: string) => void }) {
    const selectedIds = new Set((selected_categories || []).map((c) => c.id));

  
    return (
    <Combobox onOptionSubmit={onOptionSubmit}>
      <Combobox.Options mt="sm">
        {available_categories.map((v) => (
          <Combobox.Option key={v.id} value={v.id}>
            {selectedIds.has(v.id) ? <><CheckIcon size={12} />{' '}</> : ''}
            {v.name}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  );
}

export default CustomCombobox;
