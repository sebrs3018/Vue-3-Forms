<template>
  <!-- the component tag it's a dynamic tag which means that it will become whatever it's specified in the is property! -->
  <component
    v-for="option in options"
    :key="option.value"
    :is="vertical ? 'div' : 'span'"
    :class="{
        horizontal: !vertical
    }"
  >
    <BaseRadio
      :label="option.label"
      :value="option.value"
      :name="name"
      :modelValue="modelValue"
      @update:modelValue="$emit('update:modelValue, $event')"
    />
  </component>

</template>
<script>
export default {
  props: {
    options: {
      type: Array,
      required: true
    },
    // The name will be used to group the checkboxes
    name: {
      type: String,
      required: true
    },
    modelValue: {
      type: [String, Number],
      required: true
    },
    vertical: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style scoped>
  .horizontal {
      margin-right: 20px;
  }
</style>
