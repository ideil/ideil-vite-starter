<script>
import autosize from 'autosize';
import { defineComponent, computed, ref, onMounted } from 'vue';

export default defineComponent({
    name: 'TextareaField',
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
            default: ' ',
        },
    },
    emits: [ 'update:modelValue' ],
    setup(props, { emit }) {
        const textareaEl = ref(null);
        const value = computed({
            get() {
                return props.modelValue;
            },
            set(value) {
                emit('update:modelValue', value);
            },
        });

        onMounted(() => {
            autosize(textareaEl.value);
        });

        return {
            textareaEl,
            value,
        };
    },
});
</script>

<template>
    <textarea
        :id="id"
        ref="textareaEl"
        v-model="value"
        v-bind="$attrs"
        :placeholder="placeholder"
        class="overflow-hidden f-input"
        :class="{'has-error': error}"
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
