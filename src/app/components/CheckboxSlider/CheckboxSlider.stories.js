import React from 'react';
import { action } from '@storybook/addon-actions';
import CheckboxSlider from '.'

const notes = `
# CheckboxSlider
A checkbox with a slider UI.
`

export default {
  title: 'CheckboxSlider',
  parameters: { notes }
};

export const normal = () => <CheckboxSlider isCompleted={false} onSelect={action('checked')} />;
