<script>
import { defineComponent, watch, ref, onMounted } from 'vue';

export default defineComponent({
    name: 'CounterField',
    inheritAttrs: false,
    props: {
        modelValue: {
            type: [ Number, null ],
            required: false,
            default: 1,
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
        disabled: {
            type: Boolean,
            required: false,
            default: false,
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
        min: {
            type: Number,
            default: 1,
        },
        max: {
            type: Number,
            default: null,
        },
    },
    emits: [ 'update:modelValue' ],
    setup(props, { emit }) {
        const model = ref(null);

        onMounted(() => {
            model.value = props.modelValue;
        });

        watch(
            () => props.modelValue,
            value => {
                model.value = value;
            },
        );

        watch(
            model,
            value => {
                let newValue = typeof value !== 'number' ? parseFloat(value) : value;

                if (!isNaN(newValue)) {
                    if (newValue <= props.min) {
                        newValue = props.min;
                    }

                    if (props.max && newValue >= props.max) {
                        newValue = props.max;
                    }
                } else {
                    newValue = props.modelValue;
                }

                model.value = newValue;

                if (newValue !== props.modelValue) {
                    emit('update:modelValue', newValue);
                }
            },
        );

        return {
            model,
        };
    },
});
</script>

<template>
    <div class="f-counter">
        <button
            class="f-btn f-btn--outline f-btn--sm f-btn--square"
            type="button"
            data-type="minus"
            :disabled="(model <= min) || disabled"
            @click.prevent="model--"
        >
            -
        </button>
        <input
            :id="id"
            v-model.lazy="model"
            class="f-input"
            type="number"
            :class="{ 'has-error': error }"
            v-bind="$attrs"
            :aria-label="label"
            :disabled="disabled"
        >
        <button
            class="f-btn f-btn--outline f-btn--sm f-btn--square"
            type="button"
            :disabled="(max && model >= max) || disabled"
            data-type="plus"
            @click.prevent="model++"
        >
            +
        </button>
    </div>
</template>
