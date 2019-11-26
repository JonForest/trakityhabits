import React from 'react';
import { action } from '@storybook/addon-actions';
import Header from '.'

const notes = `
# Header
Header bar
`

export default {
  title: 'Header',
  parameters: { notes }
};

export const normal = () => (
  <div style={{width: '80%'}}>
    <Header />
  </div>
);