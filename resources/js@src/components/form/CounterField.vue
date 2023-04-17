<script>
import { defineComponent, computed, ref } from 'vue';

export default defineComponent({
    setup(props, { emit }) {

        return {};
    },
});
</script>

<template>
    <div class="f-counter">
        <button
            class="f-btn f-btn--outline f-btn--sm f-btn--square"
            type="button"
            disabled
            data-type="minus"
        >
            -
        </button>
        <input
            type="text"
            class="f-input"
            aria-label="Кількість"
            value="1"
        >
        <button
            class="f-btn f-btn--outline f-btn--sm f-btn--square"
            type="button"
            data-type="plus"
        >
            +
        </button>
    </div>
</template>
