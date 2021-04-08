import Vue from 'vue'

import './styles/quasar.sass'
import '@quasar/extras/material-icons/material-icons.css'
import { Quasar } from 'quasar'
import ptBr from 'quasar/lang/pt-br'


Vue.use(Quasar, {
  config: {
  },
  components: { /* not needed if importStrategy is not 'manual' */ },
  directives: { /* not needed if importStrategy is not 'manual' */ },
  plugins: {
  },
  lang: ptBr
 })