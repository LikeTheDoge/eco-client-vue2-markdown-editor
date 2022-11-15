<script setup lang="ts">
import AppEditor from './AppEditor.vue'
import AppHeader from './AppHeader.vue'
import { ref, unref } from 'vue'
import type Editor from '@toast-ui/editor';
import type { FileInfo } from '@/models/base';
import { saveFileContent } from '@/request/file'

const ref_editor = ref()

const submit = async (remark: string) => {
  const editor: Editor | null = unref(ref_editor).getEditor()
  const fileInfo: FileInfo | null = unref(ref_editor).getFileInfo()
  if (!(editor && fileInfo)) return false

  const content = editor.getMarkdown()
  const fileId = fileInfo.fileId

  await saveFileContent(fileId, content, remark)
  unref(ref_editor).reflash()
  return true
}

</script>

<template>
  <AppHeader :submit="submit">
  </AppHeader>

  <main>
    <AppEditor ref="ref_editor">
    </AppEditor>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
