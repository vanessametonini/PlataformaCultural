<template>
  <div>
    <!-- MENU -->
    <nav
      class="menu-component"
      :class="{ 'expanded-filters' : expand }"
    >
      <q-list>
        <!-- item Sobre -->
        <q-expansion-item
          group="menu"
          class="item sobre"
          expand-icon-class="text-black"
        >
          <template
            #header
            class="item-header"
          >
            <q-item-section>
              <span class="menu-text">Sobre</span>
            </q-item-section>
          </template>

          <q-card>
            <q-card-section class="padding-8">
              <ul class="navigation-list">
                <li class="navigation-item line">
                  <router-link
                    type="link"
                    :to="{ name: 'About' }"
                    exact
                  >
                    Plataforma
                  </router-link>
                </li>
                <li class="navigation-item line">
                  <router-link
                    ref="link"
                    :to="{ name: 'About', hash:'#frm'}"
                  >
                    Fórum
                  </router-link>
                </li>
                <li class="navigation-item line">
                  <router-link
                    ref="link"
                    to="/terms"
                    exact
                  >
                    Nossos Termos
                  </router-link>
                </li>
                <li class="navigation-item line">
                  <router-link
                    ref="link"
                    :to="{ name: 'Faq', hash:'#frm'}"
                    exact
                  >
                    F.A.Q
                  </router-link>
                </li>
                <li class="navigation-item">
                  <router-link
                    ref="link"
                    to="/about"
                    exact
                  >
                    Contato
                  </router-link>
                </li>
              </ul>
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <!-- item Agenda -->
        <q-expansion-item
          group="menu"
          class="item agenda"
          expand-icon-class="text-black"
        >
          <template
            #header
            class="item-header"
          >
            <q-item-section>
              <span class="menu-text">Agenda</span>
            </q-item-section>
          </template>

          <q-card>
            <q-card-section>
              <ol class="recent-events line">
                <li
                  v-for="event in listEvents"
                  :key="event.id"
                >
                  <div class="col1">
                    <span class="day">{{ event.day }}</span>
                    <span>{{ event.month }}</span>
                  </div>
                  <div
                    class="col2"
                    :aria-label="event.title"
                    :title="event.title"
                  >
                    <span>{{ event.title }}</span>
                    <span>{{ event.site }}</span>
                  </div>
                </li>
              </ol>

              <router-link
                class="submenu-button"
                :to="{ name: 'Schedule' }"
              >
                Ver agenda
              </router-link>
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <!-- item Diálogo -->
        <q-expansion-item
          group="menu"
          class="item debate"
          expand-icon-class="text-black"
        >
          <template
            #header
            class="item-header"
          >
            <q-item-section>
              <span class="menu-text">Debate</span>
            </q-item-section>
          </template>

          <q-card>
            <q-card-section>
              <ol class="recent-debates line">
                <li
                  v-for="topic in listTopics"
                  :key="topic.id"
                >
                  <h6>{{ topic.title }}</h6>
                </li>
              </ol>

              <router-link
                class="submenu-button"
                :to="{ name: 'Topics' }"
              >
                Participe do debate!
              </router-link>
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <!-- MAPA -->
        <q-expansion-item
          group="menu"
          class="item mapa"
          expand-icon-class="text-black"
          @click="expand = !expand"
        >
          <template
            #header
            class="item-header"
          >
            <q-item-section>
              <span class="menu-text">Mapa</span>
            </q-item-section>
          </template>

          <q-card>
            <q-card-section>
              <My-filter
                @callFilter="forwardCall($event)"
              />
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </nav>
  </div>
</template>

<script>
import { createHelpers } from 'vuex-map-fields';
import MyFilter from './Filter.vue';

const { mapFields } = createHelpers({
  getterType: 'pins/getField',
  mutationType: 'pins/updateField',
});

export default {
  name: 'MenuComponent',
  components: {
    MyFilter,
  },
  emits: ['call-filter'],
  computed: {
    ...mapFields(['expand']),
    listEvents() {
      return this.$store.getters['events/getRecents'];
    },
    listTopics() {
      return this.$store.getters['topics/getRecents'];
    },
  },
  methods: {
    forwardCall(el) {
      this.$emit('call-filter', el);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/variables.scss';
@import '../styles/mixins.scss';
@import '../styles/typo.scss';

.menu-component {
  width: 250px;
}

.item {
  background-color: black;
  margin-top: 4px;
}

.menu-text {
  color: white;
  font-weight: bold;
  font-size: 2em;
}

.card-section {
  padding: 8px 0px 4px 0px;
}

.agenda,
.debate,
.mapa {
  transition: transform 300ms ease-out;
}

.expanded-filters {
  .agenda {
    transform: translateY(-62px);
  }
  .debate {
    transform: translateY(-124px);
  }
  .mapa {
    transform: translateY(-186px);
  }
}

.navigation-list {
  list-style: none;
  margin: 20px 0 0;

  .navigation-item.line {
    margin-bottom: 5px;
  }

  a {
    color: black;
    display: block;
    text-decoration: none;
  }
}

.separator {
  background-color: transparent;
  height: 4px;
}

.submenu-button {
  color: black;
  display: block;
  text-decoration: none;

  &:hover {
    text-decoration: underline
  }
}

.line::after {
  content: '';
  display: block;
  background-color: black;
  height: 2px;
  width: 70%;
}

ol {
  margin: 0 0 10px 0;
  li {
    list-style-type: none;
  }
}

.recent-events {

  li {
    display: flex;
    line-height: 1.3em;
    margin-bottom: 10px;

    span {
      display: block;
    }
  }
  .col1 {
    margin-right: 10px;
    width: 30px;
  }

  .day {
    font-weight: bold;
    font-size: 1.6em;
  }

  .col2 {
    width: calc(100% - 40px);
  }
}

.recent-debates li:last-child {
  padding-bottom: 10px;
}

.recent-debates h6 {
  margin: 0;
  font-size: 1em;
}

.mapa {
  overflow: hidden;
}

.mapa .q-card__section--vert {
  padding: 8px;
}
</style>
