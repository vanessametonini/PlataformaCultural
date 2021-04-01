<template>
  <div 
    class="logo-box" 
    :class="{ white: true }"
  >
    <pin-form v-if="form === 'pin'" />
    <event-form v-if="form === 'event'" />
    <user-form v-if="form === 'user'" />
  </div>
</template>

<script>
// import { mapGetters } from 'vuex';
import PinForm from "../components/PinForm.vue";
import EventForm from "../components/EventForm.vue";
import UserForm from "../components/UserForm.vue";

export default {
  name: "EventCard",
  components: {
    PinForm,
    EventForm,
    UserForm,    
  },
  props: {
    form: {
      type: String,
      default: 'user',
    },
    bgColor: {
      type: String,
      default: '#254C26',
    },
  },
  emits: ["emit-logout"],
};
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";
@import "../styles/mixins.scss";

* {
  font-family: "Helvetica";
  box-sizing: border-box;
}

.logo-box {
  background-color: blue;
  display: flex;
  color: white;
  cursor: pointer;
  flex-direction: column;
  // height: 540px;
  justify-content: space-between;
  //   max-width: 540px;
  // padding: 16px;
  position: relative;
  overflow: hidden;
  //   width: 100%;

  &.white {
    background-color: white;
    color: white;

    .line {
      background-color: white;
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
