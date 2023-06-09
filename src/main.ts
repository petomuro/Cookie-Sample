import App from './App.vue';
import PrimeVue from 'primevue/config';
import { createApp } from 'vue';

import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Checkbox from 'primevue/checkbox';

import './style.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primevue/resources/themes/lara-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';

const app = createApp(App);

app.use(PrimeVue);
app.component('Button', Button);
app.component('Dialog', Dialog);
app.component('Checkbox', Checkbox);
app.mount('#app');
