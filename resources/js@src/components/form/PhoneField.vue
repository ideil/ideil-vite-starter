<script lang="ts" setup>
import {
    AsYouType,
    getExampleNumber,
    parseIncompletePhoneNumber,
    parsePhoneNumberFromString,
} from "libphonenumber-js";
import examples from "libphonenumber-js/mobile/examples";
import { vMaska } from "maska/vue";
import { onMounted, reactive, ref, useTemplateRef } from "vue";

const inputRef = useTemplateRef<HTMLInputElement>("inputRef");
const defaultMask = "+### ### ### ###";
const maskOptions = reactive({
    mask: defaultMask,
    eager: true,
});
const model = defineModel<string>();
const displayValue = ref("");
const detectedCountry = ref("");

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

const onInput = (e: Event) => {
    if (!e.target) {
        return;
    }

    const target = e.target as HTMLInputElement;

    const formatter = new AsYouType();
    const formattedValue = formatter.input(target.value ?? "");

    if (formattedValue.length <= 1) {
        detectedCountry.value = "";
        maskOptions.mask = defaultMask;
    }

    const phoneNumber = parsePhoneNumberFromString(formattedValue);
    const countryCode = phoneNumber?.country ?? formatter.getCountry();

    if (countryCode) {
        detectedCountry.value = countryCode;

        const examplePhone = getExampleNumber(countryCode, examples);
        const examplePhoneFormat = examplePhone?.formatInternational();

        if (examplePhoneFormat) {
            const newMask = examplePhoneFormat.replace(/\d/g, "#");

            if (newMask !== maskOptions.mask) {
                maskOptions.mask = newMask;
            }
        } else {
            if (maskOptions.mask !== defaultMask) {
                maskOptions.mask = defaultMask;
            }
        }
    } else {
        if (maskOptions.mask !== defaultMask) {
            maskOptions.mask = defaultMask;
        }

        if (formattedValue.startsWith("+")) {
            detectedCountry.value = "";
        }
    }

    displayValue.value = formattedValue;
    model.value = parseIncompletePhoneNumber(formattedValue);
};

onMounted(() => {
    if (model.value) {
        const formatter = new AsYouType();
        displayValue.value = formatter.input(model.value);
        const phoneNumber = parsePhoneNumberFromString(displayValue.value);

        if (phoneNumber?.country) {
            detectedCountry.value = phoneNumber.country;
        }
    }
});
</script>

<template>
    <label v-if="label && !isFloat" :for="id" class="f-label">{{
        label
    }}</label>

    <div class="relative" :class="wrapperClass">
        <slot name="fieldBefore" />

        <input
            ref="inputRef"
            :id="id"
            :value="displayValue"
            autocomplete="tel"
            inputmode="tel"
            type="tel"
            v-bind="$attrs"
            v-maska="maskOptions"
            :placeholder="placeholder ?? '+380 00 000 00 00'"
            class="f-field"
            :class="{
                'f-field--error': error,
                'f-field--float': isFloat,
            }"
            @input="onInput"
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
