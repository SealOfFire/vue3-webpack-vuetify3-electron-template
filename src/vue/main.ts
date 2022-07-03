import { createApp } from 'vue'
//import { createVuetify } from 'vuetify'
import app from './app.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'


loadFonts()

//const App = createApp(app)
//const vuetify = createVuetify(...)

createApp(app).use(vuetify).mount('#app')