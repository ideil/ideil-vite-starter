<script lang="ts">
import { DatePicker } from "v-calendar";
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
    name: "DateField",
    components: {
        VDatePicker: DatePicker,
    },
    inheritAttrs: false,
    props: {
        modelValue: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            type: [String, Number, null, Date] as any,
            required: false,
            default: null,
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
            default: "01.02.2023",
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
        const maskOptions = ref({
            mask: "##.##.####",
            preProcess: (value: string) => {
                if (value === "NaN.NaN.0NaN") {
                    emit("update:modelValue", null);
                    return (value = "");
                }
                return value;
            },
            postProcess: (value: string) => {
                return value;
            },
            eager: true,
        });

        const value = computed({
            get() {
                return props.modelValue;
            },
            set(value) {
                if (isNaN(value)) {
                    emit("update:modelValue", null);
                    return;
                }

                emit("update:modelValue", value);
            },
        });

        const customInputValue = (inputValue: string) => {
            if (inputValue === "NaN.NaN.0NaN") {
                return "";
            }

            return inputValue;
        };

        const locale = computed(() => {
            return window?.App?.currentLanguage ?? "uk";
        });

        return {
            value,
            maskOptions,
            locale,

            customInputValue,
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

        <VDatePicker
            v-model="value"
            :popover="{
                visibility: 'click',
            }"
            :locale="locale"
        >
            <template #default="{ inputValue, inputEvents }">
                <!-- v-maska:[maskOptions] -->
                <input
                    :id="id"
                    :value="customInputValue(inputValue)"
                    :placeholder="placeholder"
                    v-bind="$attrs"
                    class="f-field"
                    :class="{
                        'f-field--error': error,
                        'f-field--float': isFloat,
                    }"
                    v-on="inputEvents"
                />
            </template>
        </VDatePicker>
        <label v-if="label && isFloat" :for="id" class="f-label">{{
            label
        }}</label>

        <slot name="fieldAfter" />
    </div>

    <div v-if="error" class="f-info f-info--error">
        {{ error[0] }}
    </div>
</template>
