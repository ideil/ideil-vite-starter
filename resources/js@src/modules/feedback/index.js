(async () => {
    const formEl = document.querySelector('.vue-feedback-form');

    if (!formEl) {
        return;
    }

    const { createApp, defineAsyncComponent } = await import('vue');
    const FormComponent = defineAsyncComponent(() => import('./components/FormComponent.vue'));
    const app = createApp(FormComponent);
    app.mount(formEl);
})();
