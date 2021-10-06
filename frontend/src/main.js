import { createApp } from 'vue'
import App from './App.vue'

import PrimeVue from 'primevue/config';

//component imports
import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
import SplitButton from 'primevue/splitbutton';
import Card from 'primevue/card';
import Panel from 'primevue/panel';
import Textarea from 'primevue/textarea';
import InputText from 'primevue/inputtext';

import 'primevue/resources/themes/saga-blue/theme.css';       //theme
import 'primevue/resources/primevue.min.css';                 //core css
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import store from "./store/index.js";
import router from "./router/index.js";

const app = createApp(App);

app.use(PrimeVue);
app.use(store);
app.use(router);

app.component('Toolbar', Toolbar);
app.component('Button', Button);
app.component('SplitButton', SplitButton);
app.component('Card', Card);
app.component('Panel', Panel);
app.component('Textarea', Textarea);
app.component('InputText', InputText);

app.mount('#app')
