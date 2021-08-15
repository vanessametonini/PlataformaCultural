<template>
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

      <!-- item Mapa -->
      <q-expansion-item
        group="menu"
        class="item mapa"
        expand-icon-class="text-black"
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
            <router-link
              type="link"
              :to="{ name: '/profile' }"
              exact
              class="map-link"
            >
              Inserir no mapa
            </router-link>
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
              <menu-events-list />
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

      <!-- item Debate -->
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
              <menu-topics-list />
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

      <!-- item Vídeos -->
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
            <span class="menu-text">Vídeos</span>
          </q-item-section>
        </template>

        <q-card>
          <q-card-section>
            <ul class="navigation-list">
              <li class="navigation-item line">
                <a
                  target="_blank"
                  href="https://www.youtube.com/watch?v=IpvAPNFpQ5I"
                >
                  Apresentação
                </a>
              </li>
              <li class="navigation-item line">
                <a
                  target="_blank"
                  href="https://www.youtube.com/watch?v=Da3zGwoVl9A"
                >
                  Tutorial 1. Cadastro
                </a>
              </li>
              <li class="navigation-item line">
                <a
                  target="_blank"
                  href="https://www.youtube.com/watch?v=IpvAPNFpQ5I"
                >
                  Tutorial 2. Inserir pin
                </a>
              </li>
              <li class="navigation-item line">
                <a
                  target="_blank"
                  href="https://www.youtube.com/watch?v=2PlDIilF6y4"
                >
                  Tutorial 3. Inserir evento
                </a>
              </li>
              <li class="navigation-item line">
                <a
                  target="_blank"
                  href="https://www.youtube.com/watch?v=PUGiSYlojLg"
                >
                  Tutorial 4. Inserir debate
                </a>
              </li>
              <li class="navigation-item line">
                <a
                  target="_blank"
                  href="https://www.youtube.com/watch?v=1SocaU3HaN0"
                >
                  Live Célio Turino
                </a>
              </li>
            </ul>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <!-- item Login -->
      <q-expansion-item
        v-if="!$store.getters['getAuth']"
        group="menu"
        class="item login"
        expand-icon-class="text-black"
        to="/signIn"
      >
        <template
          #header
          class="item-header"
        >
          <q-item-section>
            <span class="menu-text">Login</span>
          </q-item-section>
        </template>
      </q-expansion-item>

      <!-- item Perfil -->
      <q-expansion-item
        v-if="$store.getters['getAuth']"
        group="menu"
        class="item perfil"
        expand-icon-class="text-black"
        to="/profile"
      >
        <template
          #header
          class="item-header"
        >
          <q-item-section>
            <span class="menu-text">Perfil</span>
          </q-item-section>
        </template>
      </q-expansion-item>
    </q-list>
  </nav>
</template>

<script>
import MenuEventsList from './MenuEventsList.vue';
import MenuTopicsList from './MenuTopicsList.vue';
import { createHelpers } from 'vuex-map-fields';

const { mapFields } = createHelpers({
  getterType: 'pins/getField',
  mutationType: 'pins/updateField',
});

export default {
  name: 'MobileMenuComponent',
  components: { MenuTopicsList, MenuEventsList },
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
  }
};
</script>

<style lang="scss" scoped>
@import '../styles/variables.scss';

ul, ol {
  padding: 0;
}

.menu-component {
  padding: $logoMargin;
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
}

.card-section {
  padding: 8px 0px 4px 0px;
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

.map-link {
  color: black;
  display: block;
  margin: ($logoMargin + 20px) ($logoMargin / 2) ($logoMargin / 2);
  text-decoration: none;
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
  height: 280px
}

</style>
