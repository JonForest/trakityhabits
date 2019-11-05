import { configure, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

addDecorator(withInfo); 

// automatically import all files ending in *.stories.js
configure([
  require.context('../stories', true, /\.stories\.js$/),
  require.context('../src/app/components', true, /\.stories\.js$/),
], module);
