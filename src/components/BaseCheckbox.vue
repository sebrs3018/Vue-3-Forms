<template>
  <input
    type="checkbox"
    :checked="modelValue"
    class="field"
    @change="$emit('update:modelValue', $event.target.checked)"
  />
  <label v-if="label">{{ label }}</label>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    // The modelValue prop allow the parent to inject its value to this component
    modelValue: {
      type: Boolean,
      default: false
    }
  }
}
</script>
