import Vue from 'vue'

import './styles/quasar.sass'
import '@quasar/extras/material-icons/material-icons.css'
import { Quasar, Notify } from 'quasar'
import ptBr from 'quasar/lang/pt-br'


Vue.use(Quasar, {
  config: {
    notify: { /* look at QUASARCONFOPTIONS from the API card (bottom of page) */ }
  },
  components: { /* not needed if importStrategy is not 'manual' */ },
  directives: { /* not needed if importStrategy is not 'manual' */ },
  plugins: {
    Notify
  },
  lang: ptBr
 })