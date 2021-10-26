<template>
  <div
    id="app"
    aria-live="polite"
  >
    <router-view :key="$route.path" />
  </div>
</template>

<style lang="scss">
@import "./styles/variables.scss";
@import "./styles/mixins.scss";

// ----------------- leaflet reset popup --------------------
.leaflet-popup-content-wrapper {
  box-shadow: none !important;
  border-radius: 0px !important;
  padding: 0px !important;
}

.leaflet-popup-content {
  margin: 0px;
  box-shadow: none !important;
  padding: 0px;
}

.leaflet-popup-tip {
  display: none !important;
}

@include for-phone-only {

  /* classe gerenciada em Home.vue */
  .a-pin-is-open {

    .aside, .button-area, .leaflet-top, .leaflet-bottom, .footer {
      z-index: -1 !important;
    }

    .leaflet-pane.leaflet-map-pane {
      transform: none !important;
    }
  }

  .leaflet-popup.leaflet-zoom-animated {
    width: 100vw;
    height: 100vh;
    top: 0 !important;
    left: 0 !important;
    position: fixed !important;
    transform: none !important;
    z-index: 99999 !important;
    bottom: unset !important;

    .leaflet-popup-content-wrapper {
      width: 100vw;
      height: 100vh;

      .leaflet-popup-content {
        width: 100vw !important;
        height: 100vh;

        > div {
         height: 100vh; 
        }
      }
    }

  }

  .leaflet-container a.leaflet-popup-close-button {
    padding: 0;
    width: 36px;
    height: 36px;
    background: black;
    font-size: 30px;
    line-height: 36px;
    display: block;
  }

}
// --------------- quasar reset class -----------------------

.q-item__section--main {
  flex: none !important;
}

.q-item {
  min-height: 32px !important;
  padding: 4px;
}

.drawer-menu {

  .q-drawer {
    background-color: black;
  }
}

// ----------------- typograph styleguide -------------------


.big-title {
  font-size: 2.5rem;
  letter-spacing: -0.5px;
  line-height: 2.25rem;
}

.title-1, .title-2, .title-3, .title-4 {
  line-height: inherit;
  margin: 0;
  padding: 0;
}

.title-1 {
  font-size: 2.125rem;
}

.title-2 {
  font-size: 1.75rem;
}

.title-3 {
  font-size: 1.5rem;
}

.title-4 {
  font-size: 1.125rem;

  @include for-phone-only {
    font-size: 1rem;
  }
}

.headline {
  font-size: 1.375rem;  // 22 px
  letter-spacing: 0.25px;
}

.headline-2 {
  font-size: 1.125rem;  // 18 px
}

.headline-3 {
  font-size: 1rem;  // 16 px
  letter-spacing: 0.15px;
}

.body-1 {
  font-size: 1.125rem;  // 18 px
  letter-spacing: 0.15px;
}

.body-2 {
  font-size: 1rem;  // 16 px
  letter-spacing: 0.15px;
}

.body-3 {
  font-size: 0.875rem;  // 14 px
  letter-spacing: 0.15px;
}

.body-large {
  font-size: 1.125rem;  // 18 px
  letter-spacing: 0.15px;
  font-weight: bold;
}

.body-large2 {
  font-size: 1rem;  // 16 px
  letter-spacing: 0.15px;
  font-weight: bold;
}

.caption {
  font-size: 0.75rem;  // 12 px
  letter-spacing: 0.4px;
}

.overline {
  font-size: 0.625rem; // 10 px
  letter-spacing: 1.5px;
}

.btn-text {
  font-size: 0.875em;  // 14 px
  letter-spacing: 1.25px;
}

.ligth {
  font-weight: lighter;
}

.bold {
  font-weight: 500;
}

.bolder {
  font-weight: 700;
}

.text-white {
  color: white;
}

.text-black {
  color: black;
}

.line-h16 {
  line-height: 1em;
}

.text-uppercase {
  text-transform: uppercase;
}

.text-lowercase {
  text-transform: lowercase;
}

.text-gray {
  color: $gray4;
}

.txt-al-jus {
  text-align: justify;
}

.content-center {
  display: flex;
  align-items: center;
}

.fixed-logo {
  position: absolute;
  top: 32px;
  left: 32px;
}

// ------------------- transitions ---------------------------
.slide-enter-active,
.slide-leave-active {
  transition: opacity 1s, transform 1s;
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateX(-30%);
}

.moveUp-enter-active {
  animation: fadeIn 1s ease-in;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

.moveUp-leave-active {
  animation: moveUp 0.5s linear;
}

@keyframes moveUp {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-200px);
  }
  100% {
    transform: translateY(-500px);
  }
}

// ---------------- patterns components -------------------
.reset-btn {
  border-radius: 0px !important;
  box-shadow: none;
}

// --------------- flexbox instances ----------------------
.column {
  display: flex;
  flex-direction: column;
}

.row {
  display: flex;
  flex-direction: row;
}

.row-reverse {
  display: flex;
  flex-direction: row-reverse;
}

.jus-items-end {
  justify-content: flex-end;
}

.jus-items-center {
  justify-content: center;
}

.al-items-end {
  align-items: flex-end;
}

.al-items-center {
  align-items: center;
}

.al-self-end {
  align-self: flex-end;
}

.al-self-center {
  align-self: center;
}

.full-width {
  width: 100%;
}

.padding-0 {
  padding: 0px !important;
}

.justify-around {
  justify-content: space-around;
}

.justify-between {
  justify-content: space-between;
}

.no-wrap {
  flex-wrap: nowrap;
}

// ------------------- margins ---------------------------
.mg-top4 {
  margin-top: 4px;
}

.mg-top8 {
  margin-top: 8px;
}

.mg-top-n8 {
  margin-top: -8px;
}

.mg-top-n10 {
  margin-top: -10px;
}

.mg-top16 {
  margin-top: 16px;
}

.mg-top-n16 {
  margin-top: -16px;
}

.mg-top24 {
  margin-top: 24px;
}

.mg-top32 {
  margin-top: 32px;
}

.mg-bottom8 {
  margin-bottom: 8px;
}

.mg-bottom-n8 {
  margin-bottom: -8px;
}

.mg-bottom16 {
  margin-bottom: 16px;
}

.mg-left-n4 {
  margin-left: -4px;
}

.mg-left8 {
  margin-left: 8px;
}

.mg-left-n8 {
  margin-left: -8px;
}

.mg-left16 {
  margin-left: 16px;
}

.mg-left32 {
  margin-left: 32px;
}

.mg-right8 {
  margin-right: 8px;
}

.mg-right16 {
  margin-right: 16px;
}

// ------------- spaced -> mix margins -------------------
.spaced-8 {
  margin-top: 4px;
  margin-bottom: 4px;
  margin-left: 0;
}

.spaced-16 {
  margin-top: 8px;
  margin-bottom: 8px;
  margin-left: 0;
}

.spaced-32 {
  margin-top: 16px;
  margin-bottom: 16px;
  margin-left: 0;
}

// ----------------- paddings ----------------------------
.padding-0 {
  padding: 0px;
}

.padding-8 {
  padding: 8px;
}

// ---------------- borders -----------------------------

.border-white {
  border: 2px solid white;
}

.bl-4 {
  border-left: 4px solid white;
}

.bl-8 {
  border-left: 8px solid white;
}

.uppercase {
  text-transform: uppercase;
}

// ------------------------------- span effects -----------------------------

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

.custom-caption {
  text-align: center;
  padding: 12px;
  color: white;
  background-color: rgba(0, 0, 0, .3);
}
</style>
