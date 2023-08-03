<script lang="ts">
    import { PropType, defineComponent, onMounted, ref, watch } from 'vue';

    export default defineComponent({
        name: 'CounterField',
        inheritAttrs: false,
        props: {
            modelValue: {
                type: [ Number, String, null ] as PropType<number | string | null>,
                required: false,
                default: 1
            },
            error: {
                type: [ String, Array ],
                required: false,
                default: ''
            },
            id: {
                type: String,
                required: true
            },
            disabled: {
                type: Boolean,
                required: false,
                default: false
            },
            label: {
                type: String,
                required: false,
                default: ''
            },
            placeholder: {
                type: String,
                default: ' '
            },
            min: {
                type: Number,
                default: 1
            },
            max: {
                type: Number,
                default: null
            }
        },
        emits: [ 'update:modelValue' ],
        setup(props, { emit }) {
            const model = ref<number>(1);

            const setNumber = (value: number | string | null) => {
                return value ?
                    typeof value !== 'number' ?
                        parseFloat(value) :
                        value :
                    1;
            };

            onMounted(() => {
                model.value = setNumber(props.modelValue);
            });

            watch(
                () => props.modelValue,
                value => {
                    model.value = setNumber(value);
                }
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
                        newValue = 1;
                    }

                    model.value = newValue;

                    if (newValue !== props.modelValue) {
                        emit('update:modelValue', newValue);
                    }
                }
            );

            return {
                model
            };
        }
    });
</script>

<template>
    <div class="f-counter">
        <button
            class="f-counter__btn f-btn f-btn--circle"
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
            class="f-counter__field f-field"
            type="number"
            :class="{ 'f-field--error': error }"
            v-bind="$attrs"
            :aria-label="label"
            :disabled="disabled"
        >
        <button
            class="f-counter__btn f-btn f-btn--circle"
            type="button"
            :disabled="(max && model >= max) || disabled"
            data-type="plus"
            @click.prevent="model++"
        >
            +
        </button>
    </div>
</template>
