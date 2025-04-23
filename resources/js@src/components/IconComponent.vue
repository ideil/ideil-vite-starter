<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        name: {
            type: String,
            required: true,
        },
        folder: {
            type: String,
            default: null,
        },
    },
});
</script>

<template>
    <i class="i-icon" :class="[`i-icon-${name}`]" />
</template>
