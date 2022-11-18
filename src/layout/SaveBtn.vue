<template>
    <div>
        <div @click="startSave" :class="{ 'top-action-btn': true, 'is-saving': is_saving }" :title="'保存文件'">
            <div class="save-btn">
                <EIcon family="i_proj_edit" :name="'save'" :size="24"></EIcon>
            </div>
            <div class="remark-input">
                <input ref="ref_input" v-model="val_input" placeholder="请输入修改备注信息" />
                <div @click.stop="submitSave" class="done-btn">
                    <EIcon family="i_base" :name="'done'" :size="16"></EIcon>
                </div>
                <div @click.stop="cancelSave" class="cancel-btn">
                    <EIcon family="i_base" :name="'close'" :size="16"></EIcon>
                </div>
            </div>
        </div>
    </div>

</template>

<script lang="ts" setup>
import { ref, unref } from 'vue'

const props = defineProps({
    submit: {
        default() { return (remark: string) => Promise.resolve(false) }
    }
})


const is_saving = ref(false)
const ref_input = ref(document.createElement('input'))
const val_input = ref('')

const startSave = () => {
    if (is_saving.value) return
    is_saving.value = !is_saving.value
    ref_input.value.focus()
}

const submitSave = async () => {
    const submit = props.submit
    if (!submit) return
    const success = await submit(unref(val_input))
    if (success) {
        alert('保存成功!')
        cancelSave()
    }
}


const cancelSave = () => {
    if (!is_saving.value) return
    is_saving.value = false
    val_input.value = ''
}

</script>

<style lang="scss" scoped>
.top-action-btn {
    display: block;
    height: 36px;
    width: 36px;
    margin: 4px;
    margin-right: 200px;
    cursor: pointer;
    text-align: center;
    line-height: 40px;
    border-radius: 8px;
    transition: all 0.3s cubic-bezier(0.17, 0.67, 0.36, 0.99);
    background: #eee;
    opacity: 0.7;
    color: #333;
    display: flex;

    * {
        transition: all 0.3s cubic-bezier(0.17, 0.67, 0.36, 0.99);
    }

    &:hover {
        opacity: 1;
    }

    &.is-saving {
        width: 300px;

        >.remark-input {
            width: 100%
        }

        >.save-btn {
            width: 0;
        }
    }

    .save-btn {
        width: 36px;
        height: 36px;
        line-height: 44px;
        overflow: hidden;
    }

    .remark-input {
        width: 0;
        overflow: hidden;
        display: flex;
        height: 36px;

        >input {
            display: flex;
            flex: auto;
            border: none;
            background: transparent;
            padding-left: 16px;
            outline: none !important;
        }

        >.done-btn,
        >.cancel-btn {
            width: 32px;
        }
    }
}
</style>

