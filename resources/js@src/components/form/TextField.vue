<script lang="ts">
    import { PropType, computed, defineComponent } from 'vue';

    export default defineComponent({
        name: 'TextField',
        inheritAttrs: false,
        props: {
            modelValue: {
                type: [ String, Number, undefined ] as PropType<string | number | undefined>,
                required: false,
                default: ''
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
            label: {
                type: String,
                required: false,
                default: ''
            },
            placeholder: {
                type: String,
                default: ' '
            },
            wrapperClass: {
                type: String,
                required: false,
                default: ''
            },
            isFloat: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        emits: [ 'update:modelValue' ],
        setup(props, { emit }) {
            const value = computed({
                get() {
                    return props.modelValue;
                },
                set(value) {
                    emit('update:modelValue', value);
                }
            });

            return {
                value
            };
        }
    });
</script>

<template>
    <label
        v-if="label && !isFloat"
        :for="id"
        class="f-label"
    >{{ label }}</label>

    <div
        class="relative"
        :class="wrapperClass"
    >
        <slot name="fieldBefore" />

        <input
            :id="id"
            v-model="value"
            v-bind="$attrs"
            :placeholder="placeholder"
            class="f-field"
            :class="{
                'f-field--error': error,
                'f-field--float': isFloat
            }"
        >
        <label
            v-if="label && isFloat"
            :for="id"
            class="f-label"
        >{{ label }}</label>

        <slot name="fieldAfter" />
    </div>

    <div
        v-if="error"
        class="f-info f-info--error"
    >
        {{ error[0] }}
    </div>
</template>
