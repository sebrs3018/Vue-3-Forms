<template>
  <input
    :id="uuid"
    type="checkbox"
    :checked="modelValue"
    class="field"
    @change="$emit('update:modelValue', $event.target.checked)"
  />
  <label :for="uuid" v-if="label">{{ label }}</label>
</template>
<script>
import UniqueID from '../features/UniqueId'
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
  },
  setup () {
    const uuid = UniqueID().getId()
    return {
      uuid
    }
  }
}
</script>
