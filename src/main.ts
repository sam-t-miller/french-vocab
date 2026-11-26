import { mount } from 'svelte';
import App from './App.svelte';
import './style.css';
import { logger } from './shared/logger';

logger.info('app', 'started');

const target = document.getElementById('app');

if (target) {
  mount(App, { target });
} else {
  logger.error('app', 'mount-target-missing');
}
