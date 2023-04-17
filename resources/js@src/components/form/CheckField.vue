<script>
import { defineComponent, computed } from 'vue';

export default defineComponent({
    name: 'CheckField',
    inheritAttrs: false,
    props: {
        modelValue: {
            type: [ Boolean, String ],
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
        type: {
            type: String,
            required: false,
            default: 'checkbox',
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
    <div class="f-check">
        <input
            :id="id"
            v-model="value"
            v-bind="$attrs"
            :type="type"
            :placeholder="placeholder"
            class="f-check-input"
            :class="{ 'has-error': error }"
        >
        <label
            v-if="label"
            :for="id"
            class="f-check-label"
        >{{ label }}</label>
    </div>

    <div
        v-if="error"
        class="f-info f-info--error"
    >
        {{ error[0] }}
    </div>
</template>
