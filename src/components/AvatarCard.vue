<template>
  <q-img
    class="logo-box"
    :src="`${$store.getters['services/getImagePath']}${user.avatar}`"
  />
</template>

<script>

export default {
  name: "AvatarCard",
  props: {
    user: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";
@import "../styles/mixins.scss";

.logo-box {
  background-color: white;
  display: flex;
  color: white;
  cursor: pointer;
  flex-direction: column;
  height: 180px;
  justify-content: space-between;
  width: 180px;
  padding: 16px;
  position: relative;
  overflow: hidden;
  width: 100%;

  &.white {
    background-color: black;
    color: white;

    .line {
      background-color: black;
    }
  }

  // @include for-tablet-landscape-up {
  //   height: 200px;
  //   max-width: 200px;
  // }

  // @include for-desktop-up {
  //   height: 225px;
  //   max-width: 225px;
  // }

  // @include for-big-desktop-up {
  //   height: 250px;
  //   max-width: 250px;
  // }
}
</style>
