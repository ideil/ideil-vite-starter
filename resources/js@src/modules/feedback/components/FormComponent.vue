<script lang="ts" setup>
import CheckField from "@src/components/form/CheckField.vue";
import CounterField from "@src/components/form/CounterField.vue";
import DateField from "@src/components/form/DateField.vue";
import PhoneField from "@src/components/form/PhoneField.vue";
import TextareaField from "@src/components/form/TextareaField.vue";
import TextField from "@src/components/form/TextField.vue";
import Icon from "@src/components/IconComponent.vue";
import Modal from "@src/plugins/modal";
import type { default as ModalType } from "@src/plugins/modal";
import { reactive, ref } from "vue";

defineOptions({
    name: "FeedbackForm",
});

defineProps<{
    url?: string;
}>();

// const { executeRecaptcha, recaptchaLoaded } = useReCaptcha()
const successModalEl = document.querySelector(
    "#successModal",
) as HTMLElement | null;
let successModalInstance: ModalType | null = null;
const defaultForm = {
    name: null,
    surname: null,
    email: null,
    phone: null,
    type1: null,
    type2: null,
    type3: null,
    date: null,
    counter: 1,
    delivery: false,
    agree: false,
    comment: null,
};
const isSending = ref(false);

const form = reactive<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}>({
    ...defaultForm,
});
const errors: {
    [key: string]: string[];
} = reactive({
    email: ["Без електронної пошти ми не зможемо виконати реєстрацію"],
});

const clearForm = () => {
    for (const [key, value] of Object.entries(defaultForm)) {
        form[key] = value;
    }
};

const openSuccess = () => {
    if (!successModalInstance) {
        if (successModalEl) {
            successModalInstance =
                Modal.getInstance(successModalEl) || new Modal(successModalEl);
        } else {
            return (isSending.value = false);
        }
    }

    successModalInstance.show();
    isSending.value = false;
};

const submit = () => {
    // const tokenEl = document.head.querySelector('meta[name="csrf-token"]')
    // const params = {
    //     headers: {
    //         'X-CSRF-TOKEN': tokenEl ? tokenEl.getAttribute('content') : '',
    //         'X-Requested-With': 'XMLHttpRequest'
    //     }
    // }

    console.log(JSON.stringify(form));

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
</script>

<template>
    <form @submit.prevent="submit">
        <div class="f-group">
            <TextField
                id="feedbackVueName"
                v-model="form.name"
                :disabled="isSending"
                :error="errors.name"
                name="name"
                type="text"
                required
                is-float
                placeholder="Ім'я"
                label="Ім’я"
                @change="delete errors['name']"
            >
                <template #fieldBefore>
                    <div class="f-icon">
                        <Icon name="star" />
                    </div>
                </template>
            </TextField>
        </div>
        <div class="f-group">
            <TextField
                id="feedbackVueSurname"
                v-model="form.surname"
                :disabled="isSending"
                :error="errors.surname"
                name="surname"
                type="text"
                :required="true"
                placeholder="Прізвище"
                label="Прізвище"
                @change="delete errors['surname']"
            />
        </div>
        <div class="f-group">
            <TextField
                id="feedbackVueEmail"
                v-model="form.email"
                :disabled="isSending"
                :error="errors.email"
                name="email"
                type="email"
                :required="true"
                placeholder="Email"
                label="Email"
                @change="delete errors['email']"
            />
        </div>
        <div class="f-group">
            <PhoneField
                id="feedbackVuePhone"
                v-model="form.phone"
                :disabled="isSending"
                :error="errors.phone"
                name="phone"
                :required="true"
                placeholder="+380 00 000 00 00"
                label="Номер телефону"
                @change="delete errors['phone']"
            />
        </div>
        <div class="f-group">
            <TextareaField
                id="feedbackVueComment"
                v-model="form.comment"
                :disabled="isSending"
                :error="errors.comment"
                rows="3"
                name="comment"
                placeholder="Ваше запитання"
                label="Ваше запитання"
                @change="delete errors['comment']"
            />
        </div>
        <div class="f-group">
            <DateField
                id="feedbackVueDate"
                v-model="form.date"
                :disabled="isSending"
                :error="errors.date"
                name="date"
                :required="true"
                label="Дата"
                is-float
                @change="delete errors['date']"
            />
        </div>
        <div class="f-group">
            <CounterField
                id="feedbackVueCounter"
                v-model="form.counter"
                :disabled="isSending"
                :error="errors.counter"
                label="Кількість"
                name="counter"
                @change="delete errors['counter']"
            />
        </div>
        <div class="f-group">
            <CheckField
                id="feedbackVueAgree1"
                v-model="form.agree"
                :disabled="isSending"
                :error="errors.agree"
                name="agree1"
                label="Я погоджуюсь з умовами обробки персональних даних"
                @change="delete errors['agree']"
            />
        </div>
        <div class="f-group">
            <CheckField
                id="feedbackVueAgree2"
                v-model="form.agree"
                checked
                :disabled="isSending"
                :error="errors.agree"
                type="radio"
                name="agree2"
                label="Я погоджуюсь з умовами обробки персональних даних"
                @change="delete errors['agree']"
            />
        </div>

        <Icon name="facebook" folder="socials" />

        <div class="f-submit">
            <div class="f-info mb-2">
                Використовуючи сайт, ви&nbsp;приймаєте та&nbsp;погоджуєтеся
                з&nbsp;цими
                <a href="#">правилами та&nbsp;умовами використання</a> сайту
            </div>

            <button
                type="submit"
                :disabled="isSending"
                class="f-btn f-btn--primary w-full rounded-full"
            >
                Відправити
            </button>
        </div>
    </form>
</template>
