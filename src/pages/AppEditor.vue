<template>
    <div class="ref_editor markdown-body" ref="ref_editor">
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Editor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import { getFileInfoById } from '../request/file';
import type { FileInfo } from '@/models/base';

let editor: Editor | null = null
let fileInfo: FileInfo | null = null
const ref_editor = ref(document.createElement('main'))
const route = useRoute()

const getEditor = () => editor
const getFileInfo = () => fileInfo
const reflash = async () => {
    const fileId = ((data: string | string[]) => data instanceof Array ? data.join('') : data)(route.params.fileId)
    fileInfo = await getFileInfoById(fileId)
    const downloadUrl = fileInfo.downloadUrl
    const content = await fetch(downloadUrl).then(response => response.text())

    if (!editor) {
        editor = new Editor({
            el: ref_editor.value,
            previewStyle: 'vertical',
            initialEditType: 'wysiwyg',
            height: 'auto',
            initialValue: content,
            minHeight: '400vh',
        });
    } else {
        editor.setMarkdown(content)
    }
}

defineExpose({ getEditor, getFileInfo, reflash })

onMounted(reflash)

</script>

<style lang="scss" scoped>
header {
    height: 48px;
    background-color: aqua;
}
</style>

<style lang="scss">
.ref_editor {
    .toastui-editor-defaultUI {
        border: none;
    }

    .ProseMirror.toastui-editor-contents {
        min-height: calc(100vh - 246px); //72px + 45px + 28px + 1px + 50px*2
        max-width: 960px;
        margin: 50px auto;
        padding: 56px 72px;
        background: #fff;
        box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.1);
    }

    .toastui-editor.md-mode>.ProseMirror {
        min-height: calc(100vh - 122px);
    }

    .toastui-editor-mode-switch {
        z-index: 21;
        position: sticky;
        bottom: 0;
    }

    .toastui-editor-toolbar {
        background: #fff;
        position: sticky;
        top: 72px;
        z-index: 21;
        box-shadow: 0 5px 7px -3px rgb(0 0 0 / 10%);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .toastui-editor-defaultUI-toolbar {
        max-width: 1200px;
        margin: 0 auto;
        background: transparent;
        border: none;
    }

    .toastui-editor-main {
        background: #fff;
        transition: all 0.3s ease;

        &.toastui-editor-ww-mode {
            background: #eee;
        }
    }

    .toastui-editor-ww-container {
        background-color: transparent;
    }
}
</style>