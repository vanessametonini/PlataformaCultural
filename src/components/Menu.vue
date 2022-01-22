<template>
  <nav
    class="menu-component"
    role="navigation"
  >
    <!-- item Sobre -->
    <q-btn
      class="btn-custom"
      align="left"
      padding="0"
      color="black"
      label="Sobre"
    >
      <q-menu
        square
        fit
      >
        <q-list class="submenu about-menu">
          <q-item
            v-close-popup
            clickable
          >
            <q-item-section>
              <router-link
                type="link"
                :to="{ name: 'Plataforma' }"
                exact
              >
                Plataforma
              </router-link>
            </q-item-section>
          </q-item>
          <q-separator :style="separatorStyle" />
          <q-item
            v-close-popup
            clickable
          >
            <q-item-section>
              <router-link
                ref="link"
                :to="{ name: 'Forum' }"
              >
                Fórum
              </router-link>
            </q-item-section>
          </q-item>
          <q-separator :style="separatorStyle" />
          <q-item
            v-close-popup
            clickable
          >
            <q-item-section>
              <router-link
                ref="link"
                :to="{ name: 'Terms' }"
                exact
              >
                Nossos Termos
              </router-link>
            </q-item-section>
          </q-item>
          <q-separator :style="separatorStyle" />
          <q-item
            v-close-popup
            clickable
          >
            <q-item-section>
              <router-link
                ref="link"
                :to="{ name: 'Contato' }"
                exact
              >
                Ajuda
              </router-link>
            </q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>

    <!-- item Mapa -->
    <q-btn
      class="btn-custom"
      align="left"
      padding="0"
      color="black"
      label="Mapa"
    >
      <q-menu
        square
        fit
      >
        <q-list class="submenu">
          <q-item
            v-close-popup
            clickable
          >
            <q-item-section>
              <router-link
                class="btn-red"
                :to="{path: '/profile/pins/add'}"
              >
                Inserir no mapa
              </router-link>
            </q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>

    <!-- item Agenda -->
    <q-btn
      class="btn-custom"
      align="left"
      padding="0"
      color="black"
      label="Agenda"
    >
      <q-menu
        square
        fit
        max-width="200px"
      >
        <q-list class="submenu">
          <q-item
            v-close-popup
          >
            <q-item-section>
              <menu-events-list />
            </q-item-section>
          </q-item>
          <q-item
            v-close-popup
            clickable
          >
            <q-item-section>
              <router-link
                class="btn-red"
                :to="{ name: 'Agenda' }"
              >
                Ver agenda
              </router-link>
            </q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>

    <!-- item Debate -->
    <q-btn
      class="btn-custom"
      align="left"
      padding="0"
      color="black"
      label="Debate"
    >
      <q-menu
        square
        fit
        max-width="200px"
      >
        <q-list class="submenu">
          <q-item
            v-close-popup
          >
            <q-item-section>
              <menu-topics-list />
            </q-item-section>
          </q-item>
          <q-item
            v-close-popup
            clickable
          >
            <q-item-section>
              <router-link
                class="btn-red"
                :to="{ name: 'Topics' }"
              >
                Participe do debate!
              </router-link>
            </q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>

    <!-- item Vídeos -->
    <q-btn
      class="btn-custom"
      align="left"
      padding="0"
      color="black"
      label="Vídeos"
    >
      <q-menu
        square
        fit
      >
        <q-list class="submenu ">
          <q-item v-close-popup>
            <q-item-section>
              <a
                class="btn-red"
                target="_blank"
                href="https://www.youtube.com/watch?v=IpvAPNFpQ5I"
              >
                Apresentação
              </a>
            </q-item-section>
          </q-item>
          <q-item v-close-popup>
            <q-item-section>
              <a
                class="btn-red"
                target="_blank"
                href="https://www.youtube.com/watch?v=Da3zGwoVl9A"
              >
                Tutorial 1. Cadastro
              </a>
            </q-item-section>
          </q-item>
          <q-item v-close-popup>
            <q-item-section>
              <a
                class="btn-red"
                target="_blank"
                href="https://www.youtube.com/watch?v=IpvAPNFpQ5I"
              >
                Tutorial 2. Inserir pin
              </a>
            </q-item-section>
          </q-item>
          <q-item v-close-popup>
            <q-item-section>
              <a
                class="btn-red"
                target="_blank"
                href="https://www.youtube.com/watch?v=2PlDIilF6y4"
              >
                Tutorial 3. Inserir evento
              </a>
            </q-item-section>
          </q-item>
          <q-item v-close-popup>
            <q-item-section>
              <a
                class="btn-red"
                target="_blank"
                href="https://www.youtube.com/watch?v=PUGiSYlojLg"
              >
                Tutorial 4. Inserir debate
              </a>
            </q-item-section>
          </q-item>
          <q-item v-close-popup>
            <q-item-section>
              <a
                class="btn-red"
                target="_blank"
                href="https://www.youtube.com/watch?v=1SocaU3HaN0"
              >
                Live Célio Turino
              </a>
            </q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>

    <!-- item Login/Perfil -->
    <q-btn
      v-if="!$store.getters['getAuth']"
      class="btn-custom"
      align="left"
      padding="0"
      :style="{ backgroundColor: '#f00'}"
      to="/signIn"
    >
      Login
    </q-btn>

    <q-btn
      v-if="$store.getters['getAuth']"
      class="btn-custom"
      align="left"
      padding="0"
      color="black"
      to="/profile"
    >
      Perfil
    </q-btn>
  </nav>
</template>

<script>
import MenuEventsList from './MenuEventsList.vue';
import MenuTopicsList from './MenuTopicsList.vue';

export default {
  name: 'MenuComponent',
  components: { MenuTopicsList, MenuEventsList },
  data() {
    return {
      separatorStyle: {
        backgroundColor: "black"
      }
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/mixins.scss';
@import '../styles/variables.scss';

.menu-component {
  max-width: 1250px;

  //min-width: 900px
  @include for-tablet-landscape-up {
    display: flex;
    justify-content: flex-end;
    width: calc(100vw - #{$logoMargin*3} - #{$logoDesktopSize});
  }

  @include for-big-desktop-up {
    width: calc(100vw - #{$logoMargin*3} - #{$logoLargeSize});
  }

}

.btn-custom {
  display: block;
  box-shadow: none;
  border-radius: 0px;
  color: white;
  font-weight: 700;
  font-size: 1.2em;
  height: 40px;
  margin-bottom: $logoMargin / 2;
  text-transform: none;
  min-width: 100px;
  padding: $logoMargin/4 $logoMargin/2 ;

  //min-width: 600px
  @include for-tablet-portrait-up {
    font-size: 1.4em;
    line-height: 42px;
    height: 50px;
    text-transform: none;
    min-width: 140px;
  }

  //min-width: 900px
  @include for-tablet-landscape-up {
    display: inline-block;
    font-size: 1.2em;
    line-height: 1em;
    height: 40px;
    margin-bottom: 0;
    margin-left: $logoMargin / 2;
    text-transform: none;
    min-width: calc( (100% - (6* (#{$logoMargin} / 2 ))) / 6)
  }

  //min-width: 1200px
  @include for-desktop-up {
    font-size: 1.4em;
    line-height: 42px;
    height: 50px;
    margin-left: $logoMargin;
    text-transform: none;
    min-width: calc( (100% - (6* #{$logoMargin})) / 6)

  }

}

.submenu {
  font-size: .8em;
  padding: $logoMargin*2 $logoMargin/2 $logoMargin;

  a {
    color: black;
    display: block;
    text-decoration: none;
  }

  .btn-red {
    color: white;
    display: block;
    font-weight: bold;
    background-color: red;
    padding: $logoMargin/4 $logoMargin/2 ;
  }

  //min-width: 600px
  @include for-tablet-portrait-up {
  }

  //min-width: 900px
  @include for-tablet-landscape-up {
  }

  //min-width: 1200px
  @include for-desktop-up {
    font-size: .9em;

  }

  //min-width: 1800px
  @include for-big-desktop-up {
    font-size: 1em;
  }
}

.about-menu {
  padding: $logoMargin*2 $logoMargin/2 $logoMargin;
}

</style>
