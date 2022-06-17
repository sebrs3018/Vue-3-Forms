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
      :name="name"
      :label="option.label"
      :modelValue="modelValue"
      :value="option.value"
      @update:modelValue="$emit('update:modelValue, $event')"
    />
  </component>

</template>
<script>
export default {
  props: {
    vertical: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: [String, Number],
      required: true
    },
    options: {
      type: Array,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  }
}
</script>
<style scoped>
  .horizontal {
      margin-right: 20px;
  }
</style>
