<template>
    <svg class="e-icon" :style="{ fontSize: `${typeof size === 'number' ? size + 'px' : size}`, color: color }"
        aria-hidden="true">
        <use :xlink:href="`#${family}-${name}`"></use>
    </svg>
</template>

<script lang="ts" setup>
const props = defineProps({
    family: {
        default: "icon",
    },
    size: {
        default: "inherit",
    },
    name: {
        default: "search",
    },
    color: {
        default: "inherit",
    },
})

</script>

<style>
.e-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
</style>
