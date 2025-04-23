<script lang="ts" setup>
import { vMaska } from "maska/vue";
import { reactive } from "vue";

const model = defineModel<string>();
const maskOptions = reactive({
    mask: "+380 ## ### ## ##",
    eager: true,
});

defineOptions({
    name: "PhoneField",
});

defineProps<{
    error?: string | Array<string>;
    id: string;
    label?: string;
    placeholder?: string;
    wrapperClass?: string;
    isFloat?: boolean;
}>();
</script>

<template>
    <label v-if="label && !isFloat" :for="id" class="f-label">{{
        label
    }}</label>

    <div class="relative" :class="wrapperClass">
        <slot name="fieldBefore" />

        <input
            :id="id"
            v-model="model"
            v-bind="$attrs"
            v-maska="maskOptions"
            :placeholder="placeholder ?? '+380 00 000 00 00'"
            type="text"
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

    <span v-if="error" class="f-info f-info--error">
        {{ error[0] }}
    </span>
</template>
