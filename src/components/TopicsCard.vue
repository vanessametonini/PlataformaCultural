<template>
  <div
    class="user-card"
    role="button"
    @click="$emit('card-click')"
  >
    <h3>
      Adicionar Debate
    </h3>
  </div>
</template>

<script>
export default {
  name: 'TopicCard',
  props: {
    user: {
      type: Object,
      default: () => {},
    },
    theme: {
      type: Object,
      default: () => {},
    },
  },
  emits: ['card-click'],
};
</script>

<style lang="scss" scoped>
@import '../styles/mixins.scss';

.user-card {
  @include profile-box;
}

</style>
