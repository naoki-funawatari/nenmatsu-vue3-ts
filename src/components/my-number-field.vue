<script setup lang="ts">
type Props = {
  modelValue: string
}
type Emits = {
  (event: 'update:modelValue', value: string): void
}

defineProps<Props>()
const emits = defineEmits<Emits>()
const onUpdate = (value: string) => emits('update:modelValue', value)
const numberOnly = [(value: string) => (!value || /^\d+$/.test(value)) || 'only number']
</script>

<template>
  <v-text-field density="compact" class="text-input" :modelValue="modelValue" @update:modelValue="onUpdate"
    :rules="numberOnly" />
</template>

<style scoped lang="scss">
.text-input {
  &:deep() {
    input {
      text-align: right;
    }
  }
}
</style>
