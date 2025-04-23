<script lang="ts" setup>
defineProps<{
    name: string;
    folder?: string;
}>();
</script>

<template>
    <i class="i-icon" :class="[`i-icon-${name}`]" />
</template>
