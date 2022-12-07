<script>
import { defineComponent, computed } from 'vue';

import staticAsset from '@src/helpers/staticAsset';

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
    setup(props) {
        return {
            url: computed(() => staticAsset(`#${ props.id }`)),
        };
    },
});
</script>

<template>
    <svg
        class="i-icon"
        :class="`i-${id}`"
    >
        <use :xlink:href="url" />
    </svg>
</template>
