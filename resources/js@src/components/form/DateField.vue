<script lang="ts" setup>
import { DatePicker } from "v-calendar";
import { computed } from "vue";

const model = defineModel<string | Date | number>();
const locale = computed(() => {
    return window?.App?.currentLanguage ?? "uk";
});
const customInputValue = (inputValue: string) => {
    if (inputValue === "NaN.NaN.0NaN") {
        return "";
    }

    return inputValue;
};

defineOptions({
    name: "DateField",
    inheritAttrs: false,
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

        <DatePicker
            v-model="model"
            :popover="{
                visibility: 'click',
            }"
            :locale="locale"
            @dayclick="
                (_, event) => {
                    event.target.blur();
                }
            "
        >
            <template #default="{ inputValue, inputEvents }">
                <input
                    v-bind="$attrs"
                    :id="id"
                    :value="customInputValue(inputValue)"
                    :placeholder="placeholder ?? '01.02.2025'"
                    class="f-field"
                    :class="{
                        'f-field--error': error,
                        'f-field--float': isFloat,
                    }"
                    v-on="inputEvents"
                />
            </template>
        </DatePicker>
        <label v-if="label && isFloat" :for="id" class="f-label">{{
            label
        }}</label>

        <slot name="fieldAfter" />
    </div>

    <div v-if="error" class="f-info f-info--error">
        {{ error[0] }}
    </div>
</template>
