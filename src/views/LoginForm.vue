<template>
  <form @submit.prevent="onSubmit">
    <BaseInput label="Email" type="email" v-model="email" :error="emailError" />

    <BaseInput label="Password" type="password" v-model="password" :error="passwordError"/>

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

    // It is important to notice that the useField name must match with the name of the property of the validation schema
    const { value: email, errorMessage: emailError } = useField('email')
    const { value: password, errorMessage: passwordError } = useField('password')

    return {
      onSubmit,
      email,
      emailError,
      password,
      passwordError
    }
  }
}
</script>
