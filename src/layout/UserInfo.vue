<template>
    <div v-if="userInfo" class="app-user-info">
        <div class="app-user-avatar" :style="{ backgroundImage: `url(${userInfo.avatarUrl})` }">
        </div>
        <div class="app-user-name">
            <div class="nickname">{{ userInfo.nickname }}</div>
            <div class="realname">{{ userInfo.account }}</div>
        </div>
        <div class="app-user-action" title="登出账号" @click="logout">
            <button class="e-btn link">
                <EIcon family="i_base" name="logout-variant" :size="18"></EIcon>
            </button>
        </div>
    </div>
</template>


<script lang="ts" setup>
import { auth } from '../auth'
import { onBeforeMount, ref, type Ref } from 'vue'

const userInfo: Ref<any> = ref(null)
const logout = () => {
    auth.signOut()
    auth.login()
}

onBeforeMount(() => {
    auth.getInfo().then(info => {
        userInfo.value = info
    })
})


</script>

<style lang="scss" scoped>
.app-user-info {
    height: 60px;
    display: flex;
    align-items: center;
    margin-left: 12px;
    width: 240px;

    .app-user-avatar {
        height: 32px;
        width: 32px;
        border-radius: 50%;
        background: #66ccff;
        margin: 0 12px;
        flex: none;

        position: relative;
        background-size: cover;
        overflow: visible;
        background-position: center;
    }

    .app-user-name {
        flex: auto;

        >.nickname {
            font-size: 14px;
            font-weight: bolder;
        }
        >.realname{
            font-size: 12px;
        }
    }

    .app-user-action {
        padding: 12px;
    }
}
</style>
