<script lang="ts">
    import Icon from '@src/components/IconComponent.vue';
    import CheckField from '@src/components/form/CheckField.vue';
    import CounterField from '@src/components/form/CounterField.vue';
    import DateField from '@src/components/form/DateField.vue';
    import PhoneField from '@src/components/form/PhoneField.vue';
    import SelectField from '@src/components/form/SelectField.vue';
    import TextField from '@src/components/form/TextField.vue';
    import TextareaField from '@src/components/form/TextareaField.vue';
    import BModal from 'badger-modal';
    import type { default as BModalType } from 'badger-modal';
    import { defineComponent, reactive, ref } from 'vue';

    export default defineComponent({
        name: 'FeedbackForm',
        components: {
            TextField,
            PhoneField,
            TextareaField,
            CounterField,
            DateField,
            CheckField,
            SelectField,
            Icon
        },
        props: {
            url: {
                type: String,
                default: null
            }
        },
        setup(props) {
            // const { executeRecaptcha, recaptchaLoaded } = useReCaptcha()
            const successModalEl = document.querySelector('#successModal') as HTMLElement | null;
            let successModalInstance: BModalType | null = null;
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
                comment: null
            };
            const isSending = ref(false);
            const form = reactive<{
                [key: string]: any
            }>({
                ...defaultForm
            });
            const errors: {
                [key: string]: string[]
            } = reactive({
                email: [
                    'Без електронної пошти ми не зможемо виконати реєстрацію'
                ]
            });

            const clearForm = () => {
                for (const [ key, value ] of Object.entries(defaultForm)) {
                    form[ key ] = value;
                }
            };

            const openSuccess = () => {
                if (!successModalInstance) {
                    if (successModalEl) {
                        successModalInstance = BModal.getInstance(successModalEl) || new BModal(successModalEl);
                    } else {
                        return isSending.value = false;
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
                form,
                submit
            };
        }
    });
</script>

<template>
    <form @submit.prevent="submit">
        <div class="p-5 text-white pb-7 rounded-xl bg-text">
            <div class="f-group">
                <TextField
                    id="feedbackVueName"
                    v-model="form.name"
                    :disabled="isSending"
                    :error="errors.name"
                    name="name"
                    type="text"
                    :required="true"
                    placeholder="Ім'я"
                    class="f-field--light"
                    label="Ім’я"
                    @change="delete errors['name']"
                />
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
                    class="f-field--light"
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
                    class="f-field--light"
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
                    class="f-field--light"
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
                    class="f-field--light"
                    @change="delete errors['comment']"
                />
            </div>
            <div class="f-group">
                <SelectField
                    id="feedbackVueType1"
                    v-model="form.type1"
                    :disabled="isSending"
                    :error="errors.type1"
                    name="type1"
                    :can-clear="false"
                    :can-deselect="false"
                    class="f-field--light"
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
                    placeholder="Тип запитання"
                    @change="delete errors['type1']"
                />
            </div>
            <div class="f-group">
                <SelectField
                    id="feedbackVueType2"
                    v-model="form.type2"
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
                    label="Тип запитання 2"
                    placeholder="Тип запитання 2"
                    class="f-field--light"
                    @change="delete errors['type2']"
                />
            </div>
            <div class="f-group">
                <SelectField
                    id="feedbackVueType3"
                    v-model="form.type3"
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
                    label="Тип запитання 3"
                    class="f-field--light"
                    placeholder="Тип запитання 3"
                    @change="delete errors['type3']"
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
                    class="f-field--light"
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
                    class="f-field--light"
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
                    :required="true"
                    class="f-field--light"
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
                    :required="true"
                    class="f-field--light"
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
                    Використовуючи сайт, ви&nbsp;приймаєте та&nbsp;погоджуєтеся з&nbsp;цими <a href="#">правилами
                        та&nbsp;умовами використання</a> сайту
                </div>

                <button
                    type="submit"
                    :disabled="isSending"
                    class="f-btn f-btn--gray f-btn--block f-btn--rounded"
                >
                    Відправити
                </button>
            </div>
        </div>
    </form>
</template>
