import { createApp } from 'vue';
import FormComponent from './components/FormComponent.vue';

export const init = el => {
    const app = createApp(FormComponent);

    app.mount(el);
};
