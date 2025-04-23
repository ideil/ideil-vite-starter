<script lang="ts" setup>
import Multiselect from "@vueform/multiselect";

defineOptions({
    name: "SelectField",
    inheritAttrs: false,
});

const model = defineModel<string | string[] | number | null>();

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

        <Multiselect
            :id="id"
            v-model="model"
            v-bind="$attrs"
            :placeholder="placeholder"
            class="f-select"
            :class="{
                'f-field--error': error,
                'f-field--float': isFloat,
                'is-filled':
                    model && (Array.isArray(model) ? model.length > 0 : true),
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
