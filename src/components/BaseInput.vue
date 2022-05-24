<template>
    <label>{{ label }}</label>
    <!-- The property attrs gives vue some instructions about where to inject the properties. In this case, we want to inject the type of input attribute! -->
    <input
        v-bind="$attrs"
        class="field"
        :placeholder="label"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
         />
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    // Notice how the value prop of the input is being passed via props since we are implicitly setting the value to accept all the changes made via input field (= BaseInput component)
    modelValue: {
      type: [String, Number],
      default: ''
    }
  }
}
</script>
