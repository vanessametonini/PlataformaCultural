<template>
  <q-layout
    view="lHh Lpr lff"
    container
    class="app-page home-page"
  >
    <q-drawer
      v-if="$q.platform.is.mobile"
      v-model="drawerRight"
      side="right"
      :width="200"
      class="drawer-menu"
    >
      <mobile-menu />
    </q-drawer>

    <q-page-container>
      <q-page :class="{ 'a-pin-is-open': isPinSelected }">
        <header
          class="header"
          role="banner"
        >
          <logo-card inverted />
        </header>

        <my-menu
          v-if="!$q.platform.is.mobile"
          class="menu"
        />

        <My-filter
          class="filter"
          @callFilter="filterThis($event)"
        />

        <q-btn
          v-if="$q.platform.is.mobile"
          class="btn-mobile-menu"
          flat
          round
          dense
          icon="menu"
          @click="drawerRight = !drawerRight"
        />

        <h2 class="marquee">
          <router-link
            :to="{ name: 'Topics' }"
          >
            <span>
              Para saber mais sobre a eleição do Fórum Municipal, clique aqui.
            </span>
          </router-link>
        </h2>

        <!-- MAP -->
        <main class="map-container">
          <l-map
            style="width: 100%, height: 100%"
            :zoom="zoom"
            :center="[center.lat, center.lng]"
            :options="options"
            :min-zoom="minZoom"
            :max-zoom="maxZoom"
            @update:zoom="zoom = $event"
            @update:center="center = $event"
            @update:bounds="bounds = $event"
          >
            <l-tile-layer
              :url="layers.carto.url"
              :attribution="attribution"
            />

            <l-control-zoom
              position="bottomright"
            />

            <div class="my-markes">
              <l-marker
                v-for="pin in markers"
                :key="pin.id"
                :lat-lng="pin.coordinates"
                @popupopen="pinClick($event, pin)"
                @popupclose="pinClick"
                @ready="openDefaultMarker($event, pin)"
              >
                <l-icon
                  :icon-size="iconSet.iconSize"
                  :icon-anchor="iconSet.iconAnchor"
                >
                  <span
                    :class="`icon-${$store.getters['categories/getCategoryById'](pin.categoryId).value}`"
                    :style="{'color': `${$store.getters['categories/getCategoryById'](pin.categoryId).color}`}"
                  />
                </l-icon>

                <l-popup :options="popupOptions">
                  <pin-view :pin-view="getPinById(pin.id)" />
                </l-popup>
              </l-marker>
            </div>
          </l-map>
        </main>
        <!--END MAP -->

        <footer class="footer">
          <a
            href="https://github.com/vanessametonini/PlataformaCultural"
            target="_blank"
            class="floss-link"
          >
            Esta plataforma tem código aberto.
          </a>
        </footer>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import {
  LMap,
  LTileLayer,
  LMarker,
  LControlZoom,
  LPopup,
  LIcon,
} from 'vue2-leaflet';
import { mapGetters } from 'vuex';
import { gsap, TweenMax, Expo } from 'gsap';
import { createHelpers } from 'vuex-map-fields';
import PinView from '../components/PinView.vue';
import MobileMenu from '../components/MobileMenu.vue';
import MyMenu from '../components/Menu.vue';
import MyFilter from '../components/Filter.vue';

const { mapFields } = createHelpers({
  getterType: 'maps/getField',
  mutationType: 'maps/updateField',
});

gsap.registerPlugin(TweenMax, Expo);

export default {
  name: 'HomePage',
  title: 'Cartografia da Cultura de Campo Grande',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LControlZoom,
    LPopup,
    LIcon,
    PinView,
    MyMenu,
    MyFilter,
    MobileMenu
  },
  data() {
    return {
      layers: {
        carto: {
          url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
        },
      },
      iconSet: {
        iconSize: [30, 30],
        iconAnchor: [15, -8],
      },
      popupOptions: {
        autoPan: false,
      },
      filterSelections: [],
      drawerRight: false,
    };
  },
  computed: {
    ...mapFields({
      center: 'mapOptions.center',
      bounds: 'mapOptions.bounds',
      attribution: 'mapOptions.attribution',
      zoom: 'zoomSet.zoom',
      minZoom: 'zoomSet.minZoom',
      maxZoom: 'zoomSet.maxZoom',
      options: 'zoomSet.options',
    }),
    ...mapGetters({
      pins: 'pins/loadPinsFiltered',
      markers: 'pins/getMarkers',
      isPinSelected: 'pins/getSelectedPinId',
    }),
  },
  methods: {
    openDefaultMarker(mapObject, item) {
      if ((item.id === this.$store.getters['pins/getSelectedPinId'])) {
        mapObject.openPopup();
        this.$store.commit('pins/SET_SELECTED_PIN_ID', null);
      }
    },
    filterThis(el) {
      if (this.filterSelections.includes(el)) {
        const index = this.filterSelections.indexOf(el.toString());
        this.filterSelections.splice(index, 1);
      } else {
        this.filterSelections.push(el.toString());
      }
    },
    setCoordinates() {
      this.pins.forEach((item) => this.markers.push({ id: item.id, categoryId: item.categoryId, coordinates: [item.lat, item.long] }));
    },
    getPinById(id) {
      const target = this.pins.find((item) => item.id === id);
      return target;
    },
    pinClick({type}, pin) {
      /* usado para poder abrir em prioridade na versao mobile */
      if(type === "popupopen"){
        this.$store.commit('pins/SET_SELECTED_PIN_ID', pin.id);
      }
      else {
        this.$store.commit('pins/SET_SELECTED_PIN_ID', null);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../styles/variables.scss';
@import '../styles/mixins.scss';
@import '../styles/categories.scss';

* {
  box-sizing: border-box;
}

.home-page {
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}

.q-layout-container {
  min-height: 100vh;
}

.a-pin-is-open {
  .header, .filter, .btn-mobile-menu  {
    z-index: 0;
  }
}

.header {
  left: $logoMargin;
  max-height: calc(100vh - 16px);
  overflow: hidden;
  position: fixed;
  top: $logoMargin;
  width: 180px;
  z-index: 2;

  @include for-tablet-landscape-up {
    width: 190px;
  }

  @include for-big-desktop-up {
    width: 200px;
  }

  .logo-box {
    margin-bottom: 4px;
  }
}

.filter {
  position: fixed;
  top: calc( #{$logoMobileSize} + #{$logoMargin} + 4px);
  left: $logoMargin;
  z-index: 2;

 @include for-tablet-landscape-up {
    top: calc( #{$logoDesktopSize} + #{$logoMargin} + 4px);
  }

  @include for-big-desktop-up {
    top: calc( #{$logoLargeSize} + #{$logoMargin} + 4px);
  }

}

@keyframes marqueeScroll {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-100%, 0)
  }
}

.marquee {
  background-color: rgba(255,255,255,.8);;
  display: block;
  font-size:1.8em;
  line-height: 1.4em;
  margin: 0;
  overflow: hidden;
  position: fixed;
  top: 80px;
  left: calc(#{$logoLargeSize} + #{$logoMargin});
  z-index: 1;


  @include for-desktop-up {
    right: 0;
    white-space: nowrap;
    width: calc(100% - #{$logoLargeSize} - #{$logoMargin});
  }

 span {
   display: inline-block;

   @include for-desktop-up {
     animation: marqueeScroll 10s infinite linear;
     padding-left: 100%;
   }
  }

  a {
    display: block;
    color: black;
    text-decoration: none;
    padding: 10px;

    &:hover, &:active {
      text-decoration: underline;
    }
  }
}

.menu {
  position: fixed;
  right: 16px;
  top: 16px;
  z-index: 1;
}

.btn-mobile-menu {
  position: fixed;
  right: $logoMargin;
  top: $logoMargin;
  z-index: 2;
}

.map-container {
  height: 100vh;
  overflow: hidden;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 0;
}

//tamanho dos ícones no mapa
span[class^="icon-"] {
  font-size: 4em;
  line-height: 30px;
}

.footer {
  background-color: rgba($color: #ffffff, $alpha: .7);
  position: fixed;
  bottom: 0;

  @media (max-width: 440px) {
    bottom: 16px;
  }

  .floss-link {
    color: #222;
    display: inline-block;
    font-size: 11px;
    padding-left: 4px;
  }

}

</style>
