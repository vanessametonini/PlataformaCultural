<template>
    <div
    class="logo-box"
    :class="{ 'white': true }"
  >
    <div class="top">
      <h1 class="title">
        Pins
      </h1>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex';

export default {
  name: 'PinsProfile',
  props: { },
  emits: ['emit-logout'],
  data() {
    return {};
  },
  computed: {},
  methods: {},
  created(){
    console.log(this.user);
  }
};
</script>

<style lang="scss" scoped>

@import '../styles/variables.scss';
@import '../styles/mixins.scss';

* {
  font-family: 'Helvetica';
  box-sizing: border-box;
}

.logo-box {
  background-color: black;
  display: flex;
  color: white;
  cursor: pointer;
  flex-direction: column;
  height: 360px;
  justify-content: space-between;
//   max-width: 180px;
  padding: 16px;
  position: relative;
  overflow: hidden;
  width: 180px;
  

  &.white {
    background-color: black;
    color: white;

    .line {
      background-color: black;
    }
  }

//   @include for-tablet-landscape-up {
//     height: 200px;
//     max-width: 200px;
//   }

//   @include for-desktop-up {
//     height: 225px;
//     max-width: 225px;
//   }

//   @include for-big-desktop-up {
//     height: 250px;
//     max-width: 250px;
//   }

}

.logo-box .title {
  font-size: 1.8em;
  font-weight: bold;
  line-height: initial;
  margin: 0;

//   @include for-tablet-landscape-up {
//     font-size: 2.2em;
//   }

//   @include for-desktop-up {
//     font-size: 2.5em;
//   }

//   @include for-big-desktop-up {
//     font-size: 3em;
//   }
}


</style>
