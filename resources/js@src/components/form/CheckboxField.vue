<script>
import { defineComponent, computed } from 'vue';

export default defineComponent({
    name: 'CheckboxField',
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
    <div class="f-checkbox">
        <input
            :id="id"
            v-model="value"
            v-bind="$attrs"
            :placeholder="placeholder"
            :type="type"
            class="f-checkbox-input"
            :class="{ 'has-error': error }"
        >
        <label
            :for="id"
            class="f-checkbox-label"
        >
            <slot name="default">
                {{ label }}
            </slot>
        </label>
    </div>

    <div
        v-if="error"
        class="f-info f-info--error"
    >
        {{ error[0] }}
    </div>
</template>
