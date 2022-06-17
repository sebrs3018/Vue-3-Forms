<template>
  <!-- As a remainder, the $attrs object allows the injections of HTML attributes to this component -->
  <!-- NOTE: the onchange event for an input of type radio is fired only when the elem is CHECKED and NOT unchecked! -->
  <input :id="uuid" type="radio" :checked="modelValue === value" :value="value"  v-bind="{ ...$attrs, onChange: updateValue }"/>
  <label :for="uuid" v-if="label">{{ label }}</label>
  <BaseErrorMessage
    v-if="error"
    :id="`${uuid}-error`"
  >
    {{ error }}
  </BaseErrorMessage>
</template>
<script>
import SetupFormComponent from '../features/SetupFormComponent'
import UniqueID from '../features/UniqueId'
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    // The modelValue will be the current selected value, so if the modelValue matches the value, then it means that this component has been selected
    modelValue: {
      type: [String, Number],
      default: ''
    },
    // Whereas the value will be the label shown by the radio button component. So it won't change when the checkbox it's unchecked!
    value: {
      type: [String, Number],
      required: true
    },
    error: {
      type: String,
      default: ''
    }
  },
  setup (props, context) {
    const uuid = UniqueID().getId()
    const { updateValue } = SetupFormComponent(props, context)
    return {
      uuid,
      updateValue
    }
  }
}
</script>
