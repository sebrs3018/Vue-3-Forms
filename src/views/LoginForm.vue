<template>
  <form @submit.prevent="onSubmit">

  <!-- v-model will create a 2-way binding between the component and its state.
       We could also think the v-model as a syntax sugar which pass to the component the following props:
        modelValue => the current state of the componente
        @event => which will be listen to an event to happen so the UI can be updated
       Typically, the update is performed whenever the input event is fired making in this way a
       eager validation.
       If we want to make a lazy one, than we don't have to listen for the input event but to the change event
       and, since we don't have anymore the possibility to use the v-model binding, we have to make it "manually"
  -->
    <BaseInput
      label="Email"
      type="email"
      modelValue="email"
      :error="emailError"
       @change="handleChange"
    />

    <BaseInput
      label="Password"
      type="password"
      v-model="password"
      :error="passwordError"
    />

    <BaseButton type="submit" class="-fill-gradient">
      Submit
    </BaseButton>
  </form>
</template>

<script>
import { useField, useForm } from 'vee-validate'

export default {
  setup () {
    function onSubmit () {
      alert('Submitted')
    }

    // Validation schema
    const validations = {
      email: value => {
        if (!value) return 'This field is required'

        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!regex.test(String(value).toLowerCase())) {
          return 'Please enter a valid email address'
        }

        return true
      },
      password: value => {
        const requiredMessage = 'The field is required'
        if (value === undefined || value === null) return requiredMessage
        if (!String(value).length) return requiredMessage

        return true
      }
    }

    useForm({
      validationSchema: validations
    })

    // It is important to notice that the useField name must match with the name of the property of the validation schema.
    // Notice also that useField function provides also a handleChange function which can be used to perform lazy validation
    const { value: email, errorMessage: emailError, handleChange } = useField('email')
    const { value: password, errorMessage: passwordError } = useField('password')

    return {
      onSubmit,
      email,
      emailError,
      password,
      passwordError,
      handleChange
    }
  }
}
</script>
