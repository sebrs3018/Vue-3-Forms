import { createApp } from 'vue'
import App from './App.vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context(
  './components', //  auto-import elements from the component folder...
  false,
  /Base[A-Z]\w+\.(vue|js)$/ //  which start with 'Base' as filename and has .vue or .js extension
)

const app = createApp(App)

//  the keys() function will now get an array of string which respect the regex expression of require.context() function.
//  Notice that the output of the context() method returns a relative path from the first input argument which denotes the path we will start looking for (e.g. './components')
//  e.g ['./BaseInput','./BaseSelect.vue']
requireComponent.keys().forEach(fileName => {
  //  Notice that we are now dealing with webpack. Particularly, passing a filename to the function will return the module if found by the above directives (line 6)
  const componentConfig = requireComponent(fileName)
  console.log(fileName.replace(/^\.\/(.*)\.\w+$/, '$1'))

  const componentName = upperFirst(
    // the regular expression will remove any word which contains '.', or '/' or '-', or anything which comes after a dot
    // e.g: ./base-input ==> baseinput
    camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1'))
  )

  //  Registering the component as a global component
  app.component(componentName, componentConfig.default || componentConfig)
})

app.mount('#app')
