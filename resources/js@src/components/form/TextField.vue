<script lang="ts" setup>
defineOptions({
    name: "TextField",
});

const { wrapperClass, label, isFloat, error } = defineProps<{
    error?: string | Array<string>;
    id: string;
    label?: string;
    placeholder?: string;
    wrapperClass?: string;
    isFloat?: boolean;
}>();
const model = defineModel<string | number | undefined>();
</script>

<template>
    <label v-if="label && !isFloat" :for="id" class="f-label">{{
        label
    }}</label>

    <div class="relative" :class="wrapperClass">
        <slot name="fieldBefore" />

        <input
            v-bind="$attrs"
            v-model="model"
            :id="id"
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
