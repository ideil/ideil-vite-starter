<script>
import Multiselect from '@vueform/multiselect';
import { defineComponent, computed } from 'vue';

export default defineComponent({
    name: 'SelectField',
    components: {
        Multiselect,
    },
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
        const value = computed({
            get() {
                console.log(props.modelValue);
                return props.modelValue;
            },
            set(value) {
                console.log(value);
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
    <div class="f-group">
        <Multiselect
            :id="id"
            v-model="value"
            v-bind="$attrs"
            :placeholder="placeholder"
            class="f-select"
            :class="{ 'has-error': error, 'is-filled': value && value.length }"
        />
        <label
            :for="id"
            class="f-label"
        >{{ label }}</label>
        <div
            v-if="error"
            class="f-info f-info--error"
        >
            {{ error[0] }}
        </div>
    </div>
</template>
