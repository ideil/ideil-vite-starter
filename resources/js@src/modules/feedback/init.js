import { createApp } from "vue";

import FormComponent from "./components/FormComponent.vue";

export default (el) => {
    const app = createApp(FormComponent);

    app.mount(el);
};
