import React from 'react';
import { action } from '@storybook/addon-actions';
import { addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import CheckboxSlider from '.'

addDecorator(withInfo);

const notes = `
# CheckboxSlider
A checkbox with a slider UI.
`

export default {
  title: 'CheckboxSlider',
  parameters: { notes }
};

export const checkbox = () => <CheckboxSlider onSelect={action('checked')} />;
