/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './package.json';
console.log({appName});
AppRegistry.registerComponent(appName, () => App);
