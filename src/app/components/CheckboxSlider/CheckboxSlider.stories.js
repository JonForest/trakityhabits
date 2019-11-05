import React from 'react';
import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';
import CheckboxSlider from '.'

export default {
  title: 'CheckboxSlider',
  parameters: {notes: 'default notes'}
};

export const checkbox = () => <CheckboxSlider onSelect={action('checked')} />;

checkbox.story = {
  parameters: {
    notes: "This is a *note*"
  }
}
