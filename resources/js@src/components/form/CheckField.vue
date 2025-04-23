<script lang="ts" setup>
import {} from "vue";

defineOptions({
    name: "CheckField",
});

const model = defineModel<boolean | string>();

defineProps<{
    error?: string | Array<string>;
    id: string;
    type?: string;
    label?: string;
    placeholder?: string;
}>();
</script>

<template>
    <div class="f-check">
        <input
            v-model="model"
            v-bind="$attrs"
            :id="id"
            :type="type ?? 'checkbox'"
            :placeholder="placeholder ?? ' '"
            class="f-check__field"
            :class="{ 'has-error': error }"
        />
        <label v-if="label" :for="id" class="f-check__label">{{ label }}</label>
    </div>

    <div v-if="error" class="f-info f-info--error">
        {{ error[0] }}
    </div>
</template>
