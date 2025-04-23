<script lang="ts">
import autosize from "autosize";
import { type PropType, computed, defineComponent, onMounted, ref } from "vue";

export default defineComponent({
    name: "TextareaField",
    inheritAttrs: false,
    props: {
        modelValue: {
            type: [String, Array, Number, null] as PropType<
                string | string[] | number | null
            >,
            required: true,
        },
        error: {
            type: [String, Array],
            required: false,
            default: "",
        },
        id: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: false,
            default: "",
        },
        placeholder: {
            type: String,
            default: " ",
        },
        wrapperClass: {
            type: String,
            required: false,
            default: "",
        },
        isFloat: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    emits: ["update:modelValue"],
    setup(props, { emit }) {
        const textareaEl = ref<HTMLElement>();
        const value = computed({
            get() {
                return props.modelValue || undefined;
            },
            set(value) {
                emit("update:modelValue", value);
            },
        });

        onMounted(() => {
            if (textareaEl.value) {
                autosize(textareaEl.value);
            }
        });

        return {
            textareaEl,
            value,
        };
    },
});
</script>

<template>
    <label v-if="label && !isFloat" :for="id" class="f-label">{{
        label
    }}</label>

    <div class="relative" :class="wrapperClass">
        <slot name="fieldBefore" />

        <textarea
            :id="id"
            ref="textareaEl"
            v-model="value"
            v-bind="$attrs"
            :placeholder="placeholder"
            class="f-field"
            :class="{
                'f-field--error': error,
                'f-field--float': isFloat,
            }"
        />
        <label v-if="label && isFloat" :for="id" class="f-label">{{
            label
        }}</label>

        <slot name="fieldAfter" />
    </div>

    <div v-if="error" class="f-info f-info--error">
        {{ error[0] }}
    </div>
</template>
