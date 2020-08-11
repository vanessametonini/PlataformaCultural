<template>
  <div class="menu-component">
    <q-list>
      <!-- item Sobre -->
      <q-expansion-item
        v-if="!expand"
        class="item"
        group="somegroup"
        expand-icon-class="text-black"
      >
        <template
          #header
          class="item-header"
        >
          <q-item-section>
            <span class="menu-text body-3">Sobre</span>
          </q-item-section>
        </template>

        <q-card>
          <q-card-section class="padding-8">
            <ul class="navigation-list">
              <li class="navigation-item">
                <router-link
                  class="a"
                  type="link"
                  :to="{ name: 'About' }"
                  exact
                >
                  <span class="body-3 effect-underline">Plataforma</span>
                </router-link>
              </li>
              <div class="line" />
              <li class="navigation-item">
                <router-link
                  ref="link"
                  class="a"
                  :to="{ name: 'About', hash:'#frm'}"
                >
                  <span class="body-3 effect-underline">Fórum</span>
                </router-link>
              </li>
              <div class="line" />
              <li class="navigation-item">
                <router-link
                  ref="link"
                  class="a"
                  to="/terms"
                  exact
                >
                  <span class="body-3 effect-underline">Nossos Termos</span>
                </router-link>
              </li>
              <div class="line" />
              <li class="navigation-item">
                <router-link
                  ref="link"
                  class="a effect-underline"
                  :to="{ name: 'Faq', hash:'#frm'}"
                  exact
                >
                  <span class="body-3">F.A.Q</span>
                </router-link>
              </li>
              <div class="line" />
              <li class="navigation-item">
                <router-link
                  ref="link"
                  class="a effect-underline"
                  to="/about"
                  exact
                >
                  <span class="body-3">Contato</span>
                </router-link>
              </li>
            </ul>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-separator
        v-if="!expand"
        class="separator"
      />

      <!-- item Agenda -->
      <q-expansion-item
        v-if="!expand"
        class="item"
        group="somegroup"
        expand-icon-class="text-black"
      >
        <template
          #header
          class="item-header"
        >
          <q-item-section>
            <span class="menu-text body-3">Agenda</span>
          </q-item-section>
        </template>

        <q-card>
          <q-card-section>
            <span class="recents">falta recentes</span>

            <base-button
              class="submenu-button"
              :to="{ name: 'Schedule' }"
            >
              <!-- <i class="fas fa-pencil-alt reply-icon"></i> -->
              <span class="body-3 bolder mg-left8"> Ver Agenda </span>
            </base-button>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-separator
        v-if="!expand"
        class="separator"
      />

      <!-- item Diálogo -->
      <q-expansion-item
        v-if="!expand"
        class="item"
        group="somegroup"
        expand-icon-class="text-black"
      >
        <template
          #header
          class="item-header"
        >
          <q-item-section>
            <span class="menu-text body-3">Diálogo</span>
          </q-item-section>
        </template>

        <q-card>
          <q-card-section>
            <span class="recents">falta recentes</span>

            <base-button
              class="submenu-button"
              :to="{ name: 'Topics' }"
            >
              <!-- <i class="fas fa-pencil-alt reply-icon"></i> -->
              <span class="body-3 bolder mg-left8"> Ver Diálogos </span>
            </base-button>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-separator
        v-if="!expand"
        class="separator"
      />

      <!-- item filtro -->
      <div class="my-item">
        <q-card
          class="my-card"
          :class="{ 'my-card-expanded' : expand }"
        >
          <q-card-section class="my-card-section">
            <My-filter
              @callFilter="forwardCall($event)"
            />
          </q-card-section>
        </q-card>

        <div
          class="my-item-header"
          @click="expandItem()"
        >
          <span class="menu-text body-3">Filtro</span>
        </div>
      </div>
    </q-list>
  </div>
</template>

<script>
import MyFilter from './Filter.vue';
import BaseButton from './BaseButton.vue';

export default {
  name: 'MenuComponent',
  components: {
    MyFilter,
    BaseButton,
  },
  data() {
    return {
      expand: false,
    };
  },
  methods: {
    expandItem() {
      this.expand = !this.expand;
    },
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

$itemHeight : 40px;

* {
  font-family: 'Helvetica';
  letter-spacing: 1px;
}

.menu-component {
  width: 100%;
  max-width: 180px;
  margin-top: 8px;
  margin-bottom: 8px;
}

.item {
  background-color: black;
  transition: filter 0.3s;
  z-index: 1;
  position: relative;

  &:hover {
    background-color: #1d1e22;
    // background-color:#fa7f72;

    .menu-text {
      color: white;
    }
  }
}

.q-item {
  height: $itemHeight;
  padding: 4px;
}

.card-section {
  padding: 8px 0px 4px 0px;
}

.my-item {
  z-index: 2;
  display: flex;
  flex-direction: column;
  position: relative;

  .my-item-header {
    background-color: black;
    height: $itemHeight;
    padding: 8px 16px 8px 16px;
    display: flex;
    z-index: 1;
    position: relative;

    &:hover {
      background-color: #1d1e22;
      cursor: pointer;

      .menu-text {
        color: white;
      }
    }
  }

  .my-item-header span {
    align-self: center;
  }

  .my-card {
    border-radius: 0px;
    box-shadow: none;
    z-index: 2;
    position: relative;
    display: none;

    .my-card-section {
      padding: 8px 0px 4px 0px;
      display: none;
    }
  }

  .my-card-expanded {
    display: block;
    transition: 0.8s linear;

    .my-card-section {
      padding: 8px 0px 4px 0px;
      display: block;
    }
  }

}

.menu-text {
  color: white;
  font-weight: bold;
}

.navigation-list {
  width: 90%;
  list-style: none;
  padding-left: 8px;
  margin: 0px;
}

.a {
  font-weight: bold;
  text-decoration: none;
  color: black;
}

.effect-underline:after {
  content: '';
  position: absolute;
  left: 24px;
  display: inline-block;
  height: 1em;
  width: 70%;
  border-bottom: 2px solid;
  margin-top: 10px;
  opacity: 0;
  -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
  transition: opacity 0.35s, transform 0.35s;
  -webkit-transform: scale(0,1);
  transform: scale(0,1);
}

.effect-underline:hover:after {
  opacity: 1;
  -webkit-transform: scale(1);
  transform: scale(1);
}

.line {
  //background-color: black;
  height: 2px;
  width: 75%;
  margin-top: 4px;
  margin-bottom: 4px;
}

.separator {
  background-color: transparent;
  height: 4px;
}

</style>
