<template>
  <div>
    <!-- MENU -->
    <nav
      class="menu-component"
      :class="{ 'expanded-filters' : expand }"
      role="navigation"
    >
      <!-- MENU -->
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
            <q-card-section>
              <ul class="navigation-list">
                <li class="navigation-item line">
                  <router-link
                    type="link"
                    :to="{ name: 'Plataforma' }"
                    exact
                  >
                    Plataforma
                  </router-link>
                </li>
                <li class="navigation-item line">
                  <router-link
                    ref="link"
                    :to="{ name: 'Forum' }"
                  >
                    Fórum
                  </router-link>
                </li>
                <li class="navigation-item line">
                  <router-link
                    ref="link"
                    :to="{ name: 'Terms' }"
                    exact
                  >
                    Nossos Termos
                  </router-link>
                </li>
                <li class="navigation-item">
                  <router-link
                    ref="link"
                    :to="{ name: 'Contato' }"
                    exact
                  >
                    Ajuda
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
              <q-scroll-area
                :bar-style="barStyle"
                class="line"
              >
                <ol class="recent-events">
                  <li
                    v-for="event in listEvents"
                    :key="event.id"
                    clickable
                    @click="openEvent(event.id)"
                  >
                    <div class="col1">
                      <span class="day">{{ event.day }}</span>
                      <span class="month">{{ event.month }}</span>
                    </div>
                    <div
                      class="col2"
                      :aria-label="event.title"
                      :title="event.title"
                    >
                      <span>{{ event.title }}</span>
                      <span class="caption">{{ event.site }}</span>
                    </div>
                  </li>
                </ol>
              </q-scroll-area>
              <router-link
                class="submenu-button"
                :to="{ name: 'Agenda' }"
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
              <q-scroll-area
                :bar-style="barStyle"
                class="line"
              >
                <ol class="recent-debates">
                  <li
                    v-for="topic in listTopics"
                    :key="topic.id"
                  >
                    <h6>
                      <router-link
                        :to="{ path: `/topics/${topic.id}` }"
                      >
                        {{ topic.title }}
                      </router-link>
                    </h6>
                  </li>
                </ol>
              </q-scroll-area>

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
  data() {
    return {
      barStyle: {
        right: "0",
        borderRadius: "4px",
        backgroundColor: "#eee",
        width: "4px",
        opacity: .8,
      },
    };
  },
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
    async openEvent(eventId) {
      this.$router.push({
        name: "Agenda",
        hash: `#${eventId}`
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/variables.scss';
@import '../styles/mixins.scss';

ol {
  margin: 0 0 10px 0;
  li {
    list-style-type: none;
  }
}

ul, ol {
  padding: 0;
}

.menu-component {
  width: 100%;
}

.item {
  background-color: black;
  margin-top: 4px;
}

.menu-text {
  color: white;
  font-weight: bold;
  font-size: 1.2em;
  padding: 2px 0px 2px 4px;

  @include for-tablet-landscape-up {
    font-size: 1.4em;
  }

  @include for-desktop-up {
    font-size: 1.5em;
  }

  @include for-big-desktop-up {
    font-size: 1.6em;
  }
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
    transform: translateY(-41px);
  }
  .debate {
    transform: translateY(-82px);
  }
  .mapa {
    transform: translateY(-123px);
  }

  @include for-tablet-landscape-up {
    .agenda {
      transform: translateY(-46px);
    }
    .debate {
      transform: translateY(-91px);
    }
    .mapa {
      transform: translateY(-136px);
    }
  }

  @include for-desktop-up {
    .agenda {
      transform: translateY(-47px);
    }
    .debate {
      transform: translateY(-94px);
    }
    .mapa {
      transform: translateY(-142px);
    }
  }

  @include for-big-desktop-up {
    .agenda {
      transform: translateY(-49px);
    }
    .debate {
      transform: translateY(-98px);
    }
    .mapa {
      transform: translateY(-147px);
    }
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
  margin-top: 5px;
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

.q-scrollarea {
  height: 200px;

  @include for-big-desktop-up {
    height: 300px;
  }
}

.recent-events {

  font-size: .9rem;

  li {
    display: flex;
    cursor: pointer;
    line-height: 1.3em;
    margin-bottom: 10px;

    span {
      display: block;
      hyphens: auto;
    }

  }
  .col1 {
    margin-right: 10px;
    padding-top: 4px;
    width: 30px;
  }

  .month {
    letter-spacing: .1em;
  }

  .day {
    font-weight: bold;
    font-size: 1.6em;
  }

  .col2 {
    width: calc(100% - 40px);
  }
}

.recent-debates {

  li {
    margin-bottom: 10px;
  }

  li:last-child {
    padding-bottom: 10px;
  }

  h6 {
    margin: 0;
    font-size: 1em;
    line-height: 1.2em;
    font-weight: normal;

    a {
      color: black;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}


.mapa {
  overflow: hidden;
}

.mapa .q-card__section--vert {
  padding: 8px;
}

</style>
