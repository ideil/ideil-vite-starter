<script>
import { vMaska } from 'maska';
import { defineComponent, computed, reactive } from 'vue';

export default defineComponent({
    name: 'PhoneField',
    directives: { maska: vMaska },
    inheritAttrs: false,
    props: {
        modelValue: {
            type: [ String, Number, null ],
            required: true,
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
            default: '+380 00 000 00 00',
        },
    },
    emits: [ 'update:modelValue' ],
    setup(props, { emit }) {
        const value = computed({
            get() {
                return props.modelValue;
            },
            set(value) {
                emit('update:modelValue', value);
            },
        });

        const hasError = computed(() => {
            return props.error && props.error.length > 0;
        });

        const maskOptions = reactive({
            mask: '+380 ## ### ## ##',
            eager: true,
        });

        return {
            value,
            maskOptions,
            hasError,
        };
    },
});
</script>

<template>
    <input
        :id="id"
        v-model="value"
        v-bind="$attrs"
        v-maska:[maskOptions]
        :placeholder="placeholder"
        type="text"
        class="f-input"
        :class="{ 'has-error': hasError }"
    >
    <label
        v-if="label"
        :for="id"
        class="f-label"
    >
        {{ label }}
    </label>
    <span
        v-if="error"
        class="f-info f-info--error"
    >
        {{ error[0] }}
    </span>
</template>
