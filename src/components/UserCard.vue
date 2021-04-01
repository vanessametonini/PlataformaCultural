<template>
  <div class="user-card" @click="$emit('card-click')" role="button">
    <h3>
      {{ `${user.firstName} ${user.lastName}` }}
    </h3>
  </div>
</template>

<script>
export default {
  name: 'UserCard',
  emits: ['card-click'],
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
};
</script>

<style lang="scss" scoped>
@import '../styles/mixins.scss';

.user-card {
  @include profile-box;
}

</style>
