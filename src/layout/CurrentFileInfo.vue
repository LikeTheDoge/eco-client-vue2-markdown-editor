<template>
    <div class="file-info">
        <div class="header">
            {{ file.remark }}
            <span v-if="!file.remark" class="blank">暂无标题</span>
        </div>
        <div @click="openFile" class="path">{{ file.path }}</div>
    </div>
</template>

<script setup lang="ts">
import { FileInfo } from '@/models/base';
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getFileInfoById } from '../request/file';

const file = ref(new FileInfo())
const route = useRoute()

const openFile = () => {
    const query_active = file.value.fileId ? `focus=${file.value.fileId}` : null;
    const query_folder = file.value.folderId ? `folder=${file.value.folderId}` : null;
    window.open(`/file/project/${file.value.projectLoc}?${[query_active, query_folder]
        .filter((v) => v)
        .join("&")}`, '_blank')
}

onMounted(async () => {

    const fileId = (
        (data: string | string[]) => data instanceof Array
            ? data.join('') : data
    )(route.params.fileId)

    file.value = await getFileInfoById(fileId)

})
</script>

<style lang="scss" scoped>
.file-info {
    flex: auto;
    padding: 0 24px;
    margin: 0 12px;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    position: relative;
    height: 54px;
    border-left: 1px solid #eee;

    >.header {
        font-size: 24px;
        font-weight: bolder;

        .blank {
            color: #ccc;
        }
    }

    >.path {
        font-size: 12px;
        opacity: 0.8;
        transition: all 0.3s ease;
        cursor: pointer;
        &:hover{
            opacity: 1;
            color: #000;
        }
    }
}
</style>