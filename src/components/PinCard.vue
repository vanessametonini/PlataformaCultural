<template>
  <div class="user-card" @click="$emit('card-click')" role="button">
    <h3>
      Adicionar PIN
    </h3>
  </div>
</template>

<script>
export default {
  name: "PinCard",
  props: {},
  emits: ['card-click'],
};
</script>

<style lang="scss" scoped>
@import '../styles/mixins.scss';

.user-card {
  @include profile-box;
}

</style>
