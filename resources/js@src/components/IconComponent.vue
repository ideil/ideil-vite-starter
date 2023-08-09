<script>
    import { defineComponent } from 'vue';

    export default defineComponent({
        props: {
            name: {
                type: String,
                required: true
            },
            folder: {
                type: String,
                default: null
            }
        }
    });
</script>

<template>
    <svg
        class="i-icon"
        :class="`i-${name}`"
    >
        <use :xlink:href="`/img/sprite.svg#${folder ? folder + '--' : ''}${name}`" />
    </svg>
</template>
