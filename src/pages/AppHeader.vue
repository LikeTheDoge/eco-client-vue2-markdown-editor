<template>
    <header>
        <UserInfo/>
        <CurrentFileInfo/>
        <SaveBtn :submit="submit"/>
    </header>

</template>

<script setup lang="ts">
import UserInfo from '../layout/UserInfo.vue'
import CurrentFileInfo from '../layout/CurrentFileInfo.vue'
import SaveBtn from '../layout/SaveBtn.vue'

const props = defineProps({
    submit: {
        default() { return (remark: string) => Promise.resolve(false) }
    }
})

</script>

<style lang="scss" scoped>

header{
    height: 72px;
    background-color: #fff;
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 21;
    border-bottom: 1px solid #eee;
    display: flex;
}

</style>