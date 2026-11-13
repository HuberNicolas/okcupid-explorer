import { createApp } from 'vue';
import App from './App.vue';
// Self-hosted, so no request leaves the site (and nothing waits on a third-party server)
import '@fontsource-variable/space-grotesk';
import './styles/main.css';

createApp(App).mount('#app');
