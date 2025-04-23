<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";

defineOptions({
    name: "CounterField",
});

const value = ref(1);
const model = defineModel<number>({
    default: 1,
});

const props = withDefaults(
    defineProps<{
        error?: string | Array<string>;
        id: string;
        disabled?: boolean;
        label?: string;
        placeholder?: string;
        min?: number;
        max?: number;
    }>(),
    {
        min: 1,
    },
);

const handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    let newValue = target.value
        ? typeof target.value !== "number"
            ? parseFloat(target.value)
            : target.value
        : 1;

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

    value.value = newValue;
};

watch(value, (newValue) => {
    if (
        typeof newValue === "number" &&
        !isNaN(newValue) &&
        newValue >= props.min &&
        (!props.max || newValue <= props.max)
    ) {
        model.value = newValue;
    }
});

onMounted(() => {
    if (model.value) {
        value.value = model.value;
    }
});
</script>

<template>
    <div class="f-counter">
        <button
            class="f-counter__btn f-btn f-btn--square"
            type="button"
            data-type="minus"
            :disabled="model <= min || disabled"
            @click.prevent="value--"
        >
            -
        </button>
        <input
            v-model="value"
            v-bind="$attrs"
            @input="handleChange"
            @change="handleChange"
            class="f-counter__field f-field"
            :class="{ 'f-field--error': error }"
            type="number"
            :id="id"
            :aria-label="label"
            :disabled="disabled"
        />
        <button
            class="f-counter__btn f-btn f-btn--square"
            type="button"
            :disabled="(max && model >= max) || disabled"
            data-type="plus"
            @click.prevent="value++"
        >
            +
        </button>
    </div>
</template>
