<template>
  <div class="app-page home-page">
    <div
      ref="overlay"
      class="overlay"
    >
      <!-- <img class="imgPresentation" src="../assets/esboco.png" alt=""> -->
      <span
        ref="presentation"
        class="presentation"
      >cartografia da cultura</span>
    </div>

    <div class="aside column">
      <logo-card
        :black-mode="false"
        size="180"
      />

      <my-menu @callFilter="filterThis($event)" />
    </div>

    <!-- MOBILE MENU -->
    <div
      class="nav-phone"
      :class="{ 'opemNav' : opemNav }"
    >
      <div
        id="nav-icon"
        :class="{ 'open' : opemNav }"
        @click="opem()"
      >
        <span />
        <span />
        <span />
      </div>

      <div
        class="nav-menu"
        v-if="opemNav"
      >
        <logo-card class="logo" :black-node="true" />

        <div class="routes column">
          <router-link class="link mg-top32" to="/about">
            <span class="body-2">Sobre</span>
          </router-link>

          <router-link class="link mg-top32" to="/schedule">
            <span class="body-2">Agenda</span>
          </router-link>

          <router-link class="link mg-top32" to="/topics">
            <span class="body-2">Debates</span>
          </router-link>

          <router-link class="link mg-top32" to="/about">
            <span class="body-2">sei lá</span>
          </router-link>
        </div>
      </div>
    </div>

    <!-- BUTTON LOGIN/PROFILE -->
    <div class="button-area">
      <q-btn
        v-if="!isLoggedIn"
        flat
        class="btn-custom"
        to="/signIn"
      >
        <span class="body-3 bolder" to="/singIn">Entrar</span>
      </q-btn>

      <q-btn
        v-if="isLoggedIn"
        flat
        class="btn-custom"
        to="/profile"
      >
        <span class="subheading-2 bolder" to="/singIn">Perfil</span>
      </q-btn>
    </div>

    <!-- MAP -->
    <div class="map-container">
      <l-map
        style="width: 100%, height: 100%"
        :zoom="zoomSet.zoom"
        :center="mapOptions.center"
        :options="zoomSet.options"
        :min-zoom="zoomSet.minZoom"
        :max-zoom="zoomSet.maxZoom"
        @update:zoom="zoomUpdated"
        @update:center="centerUpdated"
        @update:bounds="boundsUpdated"
      >
        <l-tile-layer
          :url="layers.carto.url"
          :attribution="mapOptions.attribution"
        />

        <l-control-zoom v-if="handleResize()" position="bottomright" />

        <div class="my-markes">
          <l-marker
            v-for="item in markesFiltered"
            :key="item.id"
            class="marker-item"
            :lat-lng="item.coordinates"
          >
            <l-icon
              class="icon-marker"
              :icon-size="iconSet.iconSize"
              :icon-anchor="iconSet.iconAnchor"
            >
              <img
                :id="`img-icon#${item.id}`"
                :src="require(`../assets/icons/pins/${item.categoryId}.png`)"
                class="img-icon"
                :height="iconSet.iconSize[0]"
                :width="iconSet.iconSize[1]"
              >
            </l-icon>

            <l-popup :options="popupOptions">
              <pin-view :pin-view="getPinById(item.id)" />
            </l-popup>
          </l-marker>
        </div>

        <!-- <l-control-attribution position="topleft" prefix="Algo+Ritmo - Research Group" /> -->
      </l-map>
    </div>
    <!--END MAP -->

    <!-- <div class="show" style="position: absolute; top: 150px; left: 40%; z-index: 3;">
      {{ pins }}
    </div> -->
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

import PinView from '../components/PinView.vue';
import MyMenu from '../components/Menu.vue';

gsap.registerPlugin(TweenMax, Expo);

export default {
  name: 'HomePage',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LControlZoom,
    LPopup,
    LIcon,
    PinView,
    MyMenu,
  },
  data() {
    return {
      opemNav: false,
      oldCenter: [-20.460277, -54.612277],
      mapOptions: {
        center: [-20.455662, -54.592933],
        bounds: null,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      },
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
      zoomSet: {
        zoom: 14,
        minZoom: 13,
        maxZoom: 16,
        options: {
          zoomSnap: 0.5,
          zoomControl: false,
        },
      },
      iconSet: {
        iconSize: [24, 24],
        iconAnchor: [15, -8],
      },
      popupOptions: {
        autoPan: true,
        keepInView: true,
        autoPanPaddingTopLeft: [240, 16],
        closeButton: false,
      },
      markers: [],
      filterSelections: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'],
    };
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'users/isLoggedIn',
      pins: 'pins/loadPins',
    }),
    markesFiltered() {
      if (this.filterSelections.lehgth === 0) {
        return this.markers;
      }
      const vm = this;
      const filter = this.markers.filter((item) => vm.filterSelections.includes(item.categoryId.toString()));
      return filter;
    },
  },
  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  mounted() {
    this.homeTransition();
    this.setCoordinates();
  },
  unmounted() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    filterThis(el) {
      if (this.filterSelections.includes(el)) {
        // console.log('removeThisFilter', el);
        const index = this.filterSelections.indexOf(el.toString());
        this.filterSelections.splice(index, 1);
      } else {
        // console.log('addThisFilter', el);
        this.filterSelections.push(el.toString());
      }
    },
    opem() {
      this.opemNav = !this.opemNav;
    },
    setCoordinates() {
      const vm = this;
      this.pins.forEach((item) => vm.markers.push({ id: item.id, categoryId: item.categoryId, coordinates: item.coordinates }));
    },
    getPinById(id) {
      const target = this.pins.find((item) => item.id === id);
      return target;
    },
    zoomUpdated(newZoom) {
      this.zoomSet.zoom = newZoom;
    },
    centerUpdated(newCenter) {
      this.mapOptions.center = newCenter;
    },
    boundsUpdated(newBounds) {
      this.mapOptions.bounds = newBounds;
    },
    homeTransition() {
      const { overlay, presentation } = this.$refs;

      TweenMax.to(presentation, 2, {
        opacity: 0,
        y: -60,
        ease: Expo.easeInOut,
      });

      TweenMax.to(overlay, 2, {
        delay: 1,
        top: '-100%',
        ease: Expo.easeInOut,
      });
    },
    handleResize() {
      const size = window.innerWidth;
      if (size < 1200) {
        return false;
      }
      return true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/variables.scss';
@import '../styles/mixins.scss';
@import '../styles/typo.scss';

* {
  box-sizing: border-box;
  font-family: 'Helvetica';
}

.home-page {
  position: relative;
  font-family: 'Poppins';
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
  // font-size: 3.25rem;
  // font-weight: 900;
  // padding: 0.5em 1em;
  // color: #1d1e22;
  // background-color: #f4f4f4;
  // mix-blend-mode: screen;
  // border-radius: 0.2em;
  // pointer-events: none;
  // user-select: none;
}

.aside {
  // display: none;
  width: 200px;
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 2;
  overflow: hidden;
  flex-wrap: nowrap;

  @media screen and (max-width: 1200px) {
    display: none;
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

.marker-item {
  display: none !important;
  z-index: 1;
  height: 50px;
  width: 50px;
  transition: transform 0.5s;
}

.img-icon {
  display: block;

  &:hover {
    transform: scale(1.2);
  }
}

.button-area {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 2;
  overflow: hidden;

  @include for-phone-only {
    display: none;
  }
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
    font-family: 'Helvetica';
    text-transform: none;
    font-weight: 700;
    color: white;
  }
}

// -------------------------------------- for phone view -------------------
.nav-phone {
  width: 50px;
  height: 50px;
  z-index: 3;
  position: absolute;

  @include for-phone-only {
    top: 0px;
    left: 0px;
  }

  @media (min-width: 600px) and (max-width: 1200px) {
    top: 16px;
    left: 16px;
  }

  @media screen and (min-width: 1200px) {
    display: none;
  }
  // border: 2px solid pink;
}

.opemNav {
  width: 100%;
  height: 100vh;
  top: 0px;
  left: 0px;
  overflow: hidden;
  background-color: #f5f5f5;
  animation: 0.2s fadeInOpacity ease-in;
}

@keyframes fadeInOpacity {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

#nav-icon {
  position: relative;
  top: 8px;
  left: 8px;
  width: 32px;
  height: 32px;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: .5s ease-in-out;
  -moz-transition: .5s ease-in-out;
  -o-transition: .5s ease-in-out;
  transition: .5s ease-in-out;
  cursor: pointer;
}

#nav-icon span {
  display: block;
  position: absolute;
  height: 5px;
  width: 100%;
  background: black;
  border-radius: 0px;
  opacity: 1;
  left: 0;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: .25s ease-in-out;
  -moz-transition: .25s ease-in-out;
  -o-transition: .25s ease-in-out;
  transition: .25s ease-in-out;
}

#nav-icon span:nth-child(1) {
  top: 0px;
  -webkit-transform-origin: left center;
  -moz-transform-origin: left center;
  -o-transform-origin: left center;
  transform-origin: left center;
}

#nav-icon span:nth-child(2) {
  top: 10px;
  -webkit-transform-origin: left center;
  -moz-transform-origin: left center;
  -o-transform-origin: left center;
  transform-origin: left center;
}

#nav-icon span:nth-child(3) {
  top: 20px;
  -webkit-transform-origin: left center;
  -moz-transform-origin: left center;
  -o-transform-origin: left center;
  transform-origin: left center;
}

#nav-icon.open span:nth-child(1) {
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
  top: 10px;
  left: 8px;

  @media (min-width: 600px) and (max-width: 1200px) {
    top: 16px;
    left: 24px;
  }
}

#nav-icon.open span:nth-child(2) {
  width: 0%;
  opacity: 0;
}

#nav-icon.open span:nth-child(3) {
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
  top: 32px;
  left: 8px;

  @media (min-width: 600px) and (max-width: 1200px) {
    top: 38px;
    left: 24px;
  }
}

.nav-menu {
  position: relative;
  top: 64px;
  left: 0px;
  width: inherit;
  padding: 0px 32px 32px 32px;
  animation: 0.8s fadeInOpacity ease-in;

  .logo {
    position: relative;
    left: 0px;
  }

  @media (min-width: 600px) and (max-width: 1200px) {
    position: relative;
    top: 64px;
    left: 64px;
  }
}

.link {
  text-decoration: none;

  span {
    font-size: 2rem;
    font-weight: bolder;
    color: black;
  }
}

// ---------------------------------- end nav-menu for phone ----------------

</style>
