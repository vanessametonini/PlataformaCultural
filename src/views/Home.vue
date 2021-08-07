<template>
  <div class="app-page home-page">
    <header
      class="aside"
      role="banner"
    >
      <logo-card inverted />
      <My-filter
        @callFilter="filterThis($event)"
      />
    </header>
    <my-menu />

    <!-- BUTTON LOGIN/PROFILE -->
    <div class="button-area">
      <q-btn
        v-if="!$store.getters['getAuth']"
        flat
        class="btn-custom"
        to="/signIn"
        tabindex="1"
      >
        <span
          class="body-3 bolder"
          to="/singIn"
        ><b>LOGIN</b></span>
      </q-btn>

      <q-btn
        v-if="$store.getters['getAuth']"
        flat
        class="btn-custom"
        to="/profile"
        tabindex="1"
      >
        <span
          v-if="$store.getters['getAuth']"
          class="subheading-2 bolder"
          to="/profile"
        >Perfil</span>
      </q-btn>

      <q-btn
        v-if="false"
        flat
        class="btn-custom"
        @click="$router.push('/documentation')"
      >
        <span
          class="subheading-2 bolder"
          to="/documentation"
        >Documentation</span>
      </q-btn>
    </div>

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

        <!-- <l-control-attribution position="topleft" prefix="Algo+Ritmo - Research Group" /> -->
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
  </div>
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
  },
  data() {
    return {
      layers: {
        standard: {
          url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        },
        stadia: {
          name: 'alidade-smooth',
          url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png',
        },
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
        // keepInView: true,
        // autoPanPaddingTopLeft: [240, 16],
        // closeButton: true,
      },
      filterSelections: [],
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
  },
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

.overlay {
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100vh;
  background: #fff;
  top: 0%;
}

.overlay img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.overlay span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  text-align: center;
  color: black;
  font-size: 30px;
  font-weight: 900;
  letter-spacing: 14px;
  text-transform: uppercase;
}

.aside {
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

.map-container {
  position: absolute;
  z-index: 0;
  top: 0px;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}

//tamanho dos ícones
span[class^="icon-"] {
  font-size: 4em;
  line-height: 30px;
}

.button-area {
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 2;
  overflow: hidden;
}

.btn-custom {
  box-shadow: none;
  height: 40px;
  min-width: 80px;
  border-radius: 0px;
  background-color: black;
  transition: filter 0.2s;

  &:hover {
    filter: brightness(90%);
  }

  span {
    text-transform: none;
    font-weight: 700;
    color: white;
  }
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
