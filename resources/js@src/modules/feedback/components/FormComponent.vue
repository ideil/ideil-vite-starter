<script>
import { defineComponent, ref, toRefs, reactive } from 'vue';

import CheckboxField from '@src/components/form/CheckboxField.vue';
import CheckField from '@src/components/form/CheckField.vue';
import CounterField from '@src/components/form/CounterField.vue';
import DateField from '@src/components/form/DateField.vue';
import PhoneField from '@src/components/form/PhoneField.vue';
import SelectField from '@src/components/form/SelectField.vue';
import TextareaField from '@src/components/form/TextareaField.vue';
import TextField from '@src/components/form/TextField.vue';
import Icon from '@src/components/IconComponent.vue';

export default defineComponent({
    name: 'FeedbackForm',
    components: {
        TextField,
        PhoneField,
        CounterField,
        TextareaField,
        DateField,
        CheckField,
        CheckboxField,
        SelectField,
        Icon,
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
            ...toRefs(form),
            submit,
        };
    },
});
</script>

<template>
    <form @submit.prevent="submit">
        <div class="f-group">
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
        </div>
        <div class="f-group">
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
        </div>
        <div class="f-group">
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
        </div>
        <div class="f-group">
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
        </div>
        <div class="f-group">
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
        </div>
        <div class="f-group">
            <SelectField
                id="feedbackType1"
                v-model="type1"
                :disabled="isSending"
                :error="errors.type1"
                name="type1"
                :can-clear="false"
                :can-deselect="false"
                :options="[
                    { value: '1', label: 'Опція 1' },
                    { value: '2', label: 'Опція 2' },
                    { value: '3', label: 'Опція 3' },
                    { value: '4', label: 'Опція 4' },
                    { value: '5', label: 'Опція 5' },
                    { value: '6', label: 'Опція 6' },
                    { value: '7', label: 'Опція 7' },
                    { value: '8', label: 'Опція 8' },
                    { value: '9', label: 'Опція 9' },
                ]"
                :required="true"
                label="Тип запитання"
                @change="delete errors['type1']"
            />
        </div>
        <div class="f-group">
            <SelectField
                id="feedbackType2"
                v-model="type2"
                :disabled="isSending"
                :error="errors.type2"
                name="type2"
                mode="multiple"
                :close-on-select="false"
                :options="[
                    { value: '1', label: 'Опція 1' },
                    { value: '2', label: 'Опція 2' },
                    { value: '3', label: 'Опція 3' },
                    { value: '4', label: 'Опція 4' },
                    { value: '5', label: 'Опція 5' },
                    { value: '6', label: 'Опція 6' },
                    { value: '7', label: 'Опція 7' },
                    { value: '8', label: 'Опція 8' },
                    { value: '9', label: 'Опція 9' },
                ]"
                :required="true"
                label="Тип запитання"
                @change="delete errors['type2']"
            />
        </div>
        <div class="f-group">
            <SelectField
                id="feedbackType3"
                v-model="type3"
                :disabled="isSending"
                :error="errors.type3"
                name="type3"
                mode="tags"
                :close-on-select="false"
                :options="[
                    { value: '1', label: 'Опція 1' },
                    { value: '2', label: 'Опція 2' },
                    { value: '3', label: 'Опція 3' },
                    { value: '4', label: 'Опція 4' },
                    { value: '5', label: 'Опція 5' },
                    { value: '6', label: 'Опція 6' },
                    { value: '7', label: 'Опція 7' },
                    { value: '8', label: 'Опція 8' },
                    { value: '9', label: 'Опція 9' },
                ]"
                :required="true"
                label="Тип запитання"
                @change="delete errors['type3']"
            />
        </div>
        <div class="f-group">
            <DateField
                id="feedbackDate"
                v-model="date"
                :disabled="isSending"
                :error="errors.date"
                name="date"
                :required="true"
                label="Дата"
                @change="delete errors['date']"
            />
        </div>
        <div class="f-group">
            <CounterField
                id="feedbackCounter"
                v-model="counter"
                :disabled="isSending"
                :error="errors.counter"
                label="Кількість"
                name="counter"
                @change="delete errors['counter']"
            />
        </div>
        <div class="f-group">
            <CheckboxField
                id="feedbackDelivery1"
                v-model="delivery"
                :disabled="isSending"
                :error="errors.delivery"
                name="delivery"
                type="radio"
                value="nova_post"
                label="Нова пошта"
                @change="delete errors['delivery']"
            />
            <CheckboxField
                id="feedbackDelivery2"
                v-model="delivery"
                :disabled="isSending"
                :error="errors.delivery"
                name="delivery"
                type="radio"
                value="ukr_post"
                label="Укрпошта"
                @change="delete errors['delivery']"
            >
                <template #default>
                    <div>Укрпошта</div>
                    <div class="f-info">
                        Доставка від 2 до 5 днів
                    </div>
                </template>
            </CheckboxField>
        </div>
        <div class="f-group">
            <CheckField
                id="feedbackAgree"
                v-model="agree"
                :disabled="isSending"
                :error="errors.agree"
                name="agree"
                :required="true"
                label="Я погоджуюсь з умовами обробки персональних даних"
                @change="delete errors['agree']"
            />
        </div>

        <Icon
            id="facebook"
            folder="socials"
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
