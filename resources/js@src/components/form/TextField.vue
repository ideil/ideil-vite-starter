<script>
import { defineComponent, computed } from 'vue';

export default defineComponent({
    name: 'TextField',
    inheritAttrs: false,
    props: {
        modelValue: {
            type: [ String, Number, null ],
            required: false,
            default: '',
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
            default: ' ',
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

        return {
            value,
        };
    },
});
</script>

<template>
    <input
        :id="id"
        v-model="value"
        v-bind="$attrs"
        :placeholder="placeholder"
        class="f-input"
        :class="{ 'has-error': error }"
    >
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
