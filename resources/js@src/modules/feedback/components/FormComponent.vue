<script>
import { defineComponent, ref, toRefs, reactive } from 'vue';

import PhoneField from '@src/components/form/PhoneField.vue';
import TextareaField from '@src/components/form/TextareaField.vue';
import TextField from '@src/components/form/TextField.vue';
import staticAsset from '@src/helpers/staticAsset';

export default defineComponent({
    name: 'FeedbackForm',
    components: {
        TextField,
        PhoneField,
        TextareaField,
    },
    props: {
        url: {
            type: String,
            default: null,
        },
    },
    setup(props) {
        // const { executeRecaptcha, recaptchaLoaded } = useReCaptcha()
        const successModalEl = document.querySelector('#successModal');
        let successModalInstance = null;
        const defaultForm = {
            name: null,
            surname: null,
            email: null,
            phone: null,
            comment: null,
        };
        const isSending = ref(false);
        const form = reactive({
            ...defaultForm,
        });
        const errors = reactive({
            email: [
                'Без електронної пошти ми не зможемо виконати реєстрацію',
            ],
        });

        const clearForm = () => {
            for (const [ key, value ] of Object.entries(defaultForm)) {
                form[key] = value;
            }
        };

        const openSuccess = async () => {
            if (!successModalInstance) {
                if (successModalEl) {
                    const Modal = await (await import('badger-modal')).default;
                    successModalInstance = Modal.getInstance(successModalEl) || new Modal(successModalEl);
                } else {
                    return isSending.value = false;
                }
            }

            successModalInstance.show();
            isSending.value = false;
        };

        const submit = async () => {
            // const tokenEl = document.head.querySelector('meta[name="csrf-token"]')
            // const params = {
            //     headers: {
            //         'X-CSRF-TOKEN': tokenEl ? tokenEl.getAttribute('content') : '',
            //         'X-Requested-With': 'XMLHttpRequest'
            //     }
            // }

            isSending.value = true;

            openSuccess();
            clearForm();

            // await recaptchaLoaded()

            // await executeRecaptcha('submit').then(token => {
            //     const data = {
            //         'g-recaptcha-response': token,
            //         ...form
            //     }

            //     axios.post(props.url, data, params).then(response => {
            //         openSuccess()
            //         clearForm()
            //     }).catch(error => {
            //         if (error.response.data && error.response.data.errors) {
            //             errors = Object.assign(errors, error.response.data.errors)
            //         }
            //         console.error(error)
            //         isSending.value = false
            //     })
            // })

        };

        return {
            isSending,
            errors,
            staticAsset,
            ...toRefs(form),
            submit,
        };
    },
});
</script>

<template>
    <form @submit.prevent="submit">
        <TextField
            id="feedbackName"
            v-model="name"
            :disabled="isSending"
            :error="errors.name"
            name="name"
            type="text"
            :required="true"
            label="Ім’я"
            @change="delete errors['name']"
        />
        <TextField
            id="feedbackSurname"
            v-model="surname"
            :disabled="isSending"
            :error="errors.surname"
            name="surname"
            type="text"
            :required="true"
            label="Прізвище"
            @change="delete errors['surname']"
        />
        <TextField
            id="feedbackEmail"
            v-model="email"
            :disabled="isSending"
            :error="errors.email"
            name="email"
            type="email"
            :required="true"
            label="Email"
            @change="delete errors['email']"
        />
        <PhoneField
            id="feedbackPhone"
            v-model="phone"
            :disabled="isSending"
            :error="errors.phone"
            name="phone"
            :required="true"
            label="Номер телефону"
            @change="delete errors['phone']"
        />
        <TextareaField
            id="contactsComment"
            v-model="comment"
            :disabled="isSending"
            :error="errors.comment"
            rows="3"
            name="comment"
            label="Ваше запитання"
            @change="delete errors['comment']"
        />

        <div class="f-submit">
            <div class="f-info c-text">
                Використовуючи сайт, ви&nbsp;приймаєте та&nbsp;погоджуєтеся з&nbsp;цими <a href="#">правилами та&nbsp;умовами використання</a> сайту
            </div>

            <button
                type="submit"
                :disabled="isSending"
                class="f-btn f-btn--primary f-btn--block f-btn--rounded"
            >
                Відправити
            </button>
        </div>
    </form>
</template>
