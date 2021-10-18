import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App);

import store from "./store/index.js";
import router from "./router/index.js";
app.use(store);
app.use(router);

//UI-Framework
import PrimeVue from 'primevue/config';
//component imports
import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
import SplitButton from 'primevue/splitbutton';
import Card from 'primevue/card';
import Panel from 'primevue/panel';
import Textarea from 'primevue/textarea';
import InputText from 'primevue/inputtext';
import FileUpload from 'primevue/fileupload';

import 'primevue/resources/themes/saga-blue/theme.css';       //theme
import 'primevue/resources/primevue.min.css';                 //core css
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';


app.use(PrimeVue);
app.component('Toolbar', Toolbar);
app.component('Button', Button);
app.component('SplitButton', SplitButton);
app.component('Card', Card);
app.component('Panel', Panel);
app.component('Textarea', Textarea);
app.component('InputText', InputText);
app.component('FileUpload', FileUpload);

//Encryption module
// import VueCryptojs from 'vue-cryptojs';
// console.log(VueCryptojs);
// app.use(VueCryptojs);

// import enc from "./plugins/encryption.js";



// app.use(encryp);



app.mount('#app')
