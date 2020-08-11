<template>
  <div id="app">
      <router-view :key="$route.path" />
  </div>
</template>

<style lang="scss">
@import './styles/variables.scss';
@import './styles/mixins.scss';
@import './styles/typo.scss';

#app {
  // font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

// ----------------- leaflet reset popup --------------------
.leaflet-popup-content-wrapper {
  box-shadow: none  !important;
  border-radius: 0px  !important;
  padding: 0px !important;
}

.leaflet-popup-content {
  margin: 0px;
  box-shadow: none  !important;
  padding: 0px;
}

.leaflet-popup-tip {
  display: none !important;
}

// --------------- quasar reset class -----------------------

.q-item__section--main {
  flex: none !important;
}

.q-item {
  min-height: 32px !important;
  padding: 4px;
}

// ----------------- typograph styleguide -------------------
* {
  box-sizing: border-box;
  padding: 0;
  font-family: 'Helvetica';
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
  0%{
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

</style>
