import { configure, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
//  Add a link to the compiled tailwind
import '../src/styles/tailwind.css';

addDecorator(withInfo); 

// automatically import all files ending in *.stories.js
configure([
  require.context('../stories', true, /\.stories\.js$/),
  require.context('../src/app/components', true, /\.stories\.js$/),
], module);
