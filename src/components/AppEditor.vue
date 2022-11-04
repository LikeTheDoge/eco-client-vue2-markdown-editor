<template>
    <div class="ref_editor" ref="ref_editor">
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Editor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'

const ref_editor = ref(document.createElement('main'))

onMounted(() => {
    console.log(ref_editor.value)
    const editor = new Editor({
        el: ref_editor.value,
        previewStyle: 'vertical',
        height: 'auto',
        minHeight: '400vh',
    });

})

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
        min-height: calc(100vh - 222px); //48px + 45px + 28px + 1px + 50px*2
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
        top: 48px;
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

    .toastui-editor-main{
        background: #fff;
        transition: all 0.3s ease;

        &.toastui-editor-ww-mode{
            background: #eee;
        }
    }

    .toastui-editor-ww-container {
        background-color: transparent;
    }
}
</style>