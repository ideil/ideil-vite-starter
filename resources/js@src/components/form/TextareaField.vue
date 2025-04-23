<script lang="ts" setup>
import autosize from "autosize";
import { onMounted, useTemplateRef } from "vue";

const model = defineModel<string | string[] | number | null>();
const textareaRef = useTemplateRef<HTMLTextAreaElement>("textareaRef");

defineOptions({
    name: "TextareaField",
});

defineProps<{
    error?: string | Array<string>;
    id: string;
    label?: string;
    placeholder?: string;
    wrapperClass?: string;
    isFloat?: boolean;
}>();

onMounted(() => {
    if (textareaRef.value) {
        autosize(textareaRef.value);
    }
});
</script>

<template>
    <label v-if="label && !isFloat" :for="id" class="f-label">{{
        label
    }}</label>

    <div class="relative" :class="wrapperClass">
        <slot name="fieldBefore" />

        <textarea
            v-model="model"
            v-bind="$attrs"
            :id="id"
            ref="textareaRef"
            :placeholder="placeholder ?? ' '"
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
