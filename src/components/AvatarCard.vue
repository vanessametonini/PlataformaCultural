<template>
  <q-img class="avatar" :src="`${$store.getters['services/getImagePath']}${user.avatarId}`" />
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
@import "../styles/mixins.scss";

.avatar {
  box-sizing: border-box;
  height: 180px;
  max-width: 180px;
  width: 100%;

  @include for-tablet-landscape-up {
    height: 200px;
    max-width: 200px;
  }

  @include for-big-desktop-up {
    height: 225px;
    max-width: 225px;
  }
}

</style>
