<script>
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        id: {
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
    <svg
        class="i-icon"
        :class="`i-${id}`"
    >
        <use :xlink:href="`#icon-${folder ? folder + '-' : ''}${id}`" />
    </svg>
</template>
