<script>
// import { vMaska } from 'maska';
import { setupCalendar, DatePicker } from 'v-calendar';
import { defineComponent, computed, ref } from 'vue';

// setupCalendar({
//     masks: {
//         weekdays: 'WW',
//     },
// });

import IconComponent from '../IconComponent.vue';

export default defineComponent({
    name: 'DateField',
    components: {
        Icon: IconComponent,
        VDatePicker: DatePicker,
    },
    // directives: { maska: vMaska },
    inheritAttrs: false,
    props: {
        modelValue: {
            type: [ String, Number, null, Date ],
            required: false,
            default: null,
        },
        error: {
            type: [ String, Array ],
            required: false,
            default: '',
        },
        id: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: false,
            default: '',
        },
        placeholder: {
            type: String,
            default: '01.02.2023',
        },
    },
    emits: [ 'update:modelValue' ],
    setup(props, { emit }) {
        const maskOptions = ref({
            mask: '##.##.####',
            preProcess: value => {
                if (value === 'NaN.NaN.0NaN') {
                    emit('update:modelValue', null);
                    return value = '';
                }
                return value;
            },
            postProcess: value => {
                // if (!value) return '';
                return value;
            },
            eager: true,
        });

        const value = computed({
            get() {
                return props.modelValue;
            },
            set(value) {
                if (isNaN(value)) {
                    emit('update:modelValue', null);
                    return;
                }

                emit('update:modelValue', value);
            },
        });

        const popover = ref({
            visibility: 'click',
        });

        const customInputValue = inputValue => {
            if (inputValue === 'NaN.NaN.0NaN') {
                return '';
            }

            return inputValue;
        };

        const locale = computed(() => {
            return window?.App?.currentLanguage ?? 'uk';
        });

        return {
            value,
            popover,
            maskOptions,
            locale,

            customInputValue,
        };
    },
});
</script>

<template>
    <VDatePicker
        v-model="value"
        :popover="popover"
        :locale="locale"
    >
        <template #default="{ inputValue, inputEvents }">
            <!-- v-maska:[maskOptions] -->
            <input
                :id="id"
                :value="customInputValue(inputValue)"
                :placeholder="placeholder"
                v-bind="$attrs"
                class="f-input"
                :class="{ 'has-error': error }"
                v-on="inputEvents"
            >
        </template>
    </VDatePicker>
    <Icon
        id="calendar"
        class="f-icon"
    />
    <label
        v-if="label"
        :for="id"
        class="f-label"
    >{{ label }}</label>
    <div
        v-if="error"
        class="f-info f-info--error"
    >
        {{ error[0] }}
    </div>
</template>
