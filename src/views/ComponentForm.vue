<template>
  <div>
    <h1>Create an Event</h1>
    <!--
      <form @submit.prevent="createEvent">
      Notice how we are not preventing the default behaviour of the form since the function submit will automatically handle that scenario
    -->
    <form @submit="submit">
      <BaseSelect
        label="Select a category"
        :options="categories"
        v-model="category"
        :error="errors.category"
      />

      <h3>Name & describe your event</h3>
      <BaseInput label="Title" type="text" v-model="title" :error="errors.title" />

      <BaseInput label="Description" type="text" v-model="description" :error="errors.description" />

      <h3>Where is your event?</h3>
      <BaseInput label="Location" type="text" v-model="location" :error="errors.location" />

      <h3>Are pets allowed?</h3>
      <BaseRadioGroup name="pets" :options="[
        { value: 1, label: 'Yes' },
        { value: 0, label: 'No' }
      ]" v-model="pets" :error="errors.pets" />

      <h3>Extras</h3>
      <div>
        <BaseCheckbox label="Catering" v-model="catering" :error="errors.catering" />
      </div>

      <div>
        <BaseCheckbox label="Live music" v-model="music" :error="errors.music" />
      </div>
      <div>
        <BaseButton type="submit" class="-fill-gradient" something="else">
          Submit
        </BaseButton>
      </div>
    </form>
  </div>
</template>

<script>
import { useField, useForm } from 'vee-validate'

export default {
  setup () {
    const required = value => {
      const requiredMessage = 'This field is required'
      if (value === undefined || value == null) return requiredMessage
      if (!String(value).length) return requiredMessage

      return true
    }
    const minLength = (number, value) => {
      if (String(value).length < number) return `Please type at least ${number} characters`
      return true
    }
    const anything = () => true
    const validationSchema = {
      category: required,
      title: value => {
        const req = required(value)
        if (req !== true) return req

        const min = minLength(3, value)
        if (min !== true) return min

        return true
      },
      description: required,
      location: undefined,
      pets: anything,
      catering: anything,
      music: anything
    }

    // Per each property in the validation schema there will be also associated an errors object which contain a property names as one of the schema containing the error message
    const { handleSubmit, errors } = useForm({
      validationSchema,
      // Setting some initial values for the properties of the schema
      initialValues: {
        pets: 1,
        catering: false,
        music: false
      }
    })

    // All the errorMessages will be in the error properties given by the composition API

    const { value: category } = useField('category')
    const { value: title } = useField('title')
    const { value: description } = useField('description')
    const { value: location } = useField('location')
    // The second parameter of the useField method is the validation method which, in this case, is just nothing
    const { value: pets } = useField('pets')
    const { value: catering } = useField('catering')
    const { value: music } = useField('music')
    // The callback function of the handleSubmit will be called when the form has been validated
    const submit = handleSubmit(values => {
      console.log('submit', values)
    })
    return {
      category,
      title,
      description,
      location,
      pets,
      catering,
      music,
      errors,
      submit
    }
  },
  data () {
    return {
      categories: [
        'sustainability',
        'nature',
        'animal welfare',
        'housing',
        'education',
        'food',
        'community'
      ]
    }
  }
}
</script>
