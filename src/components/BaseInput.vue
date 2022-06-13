<template>
    <label :for="uuid">{{ label }}</label>
    <!-- The property attrs gives vue some instructions about where to inject the properties. In this case, we want to inject the type of input attribute! -->
    <!--
      The relationships are important whenever it comes to screen-readers!
      Notice the relationships between the three parts of this input:
      - label is related to the input thanks to the usage of the attribute "for"
      - input is related to the p thanks to the usage of the attribute aria-describedby
    -->
    <input
        v-bind="$attrs"
        class="field"
        :placeholder="label"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :id="uuid"
        :aria-describedby="error ? `${uuid}-error` : null"
        :aria-invalid="error ? true : null"
    />
    <!-- Teh aria-live attribute will alert the screen-reader whenever a new error message appears -->
    <p
      v-if="error"
      class="errorMessage"
      :id="`${uuid}-error`"
      aria-live="assertive"
    >
      {{ error }}
    </p>
</template>
<script>
import UniqueID from '../features/UniqueId'
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
    },
    error: {
      type: String,
      default: ''
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
