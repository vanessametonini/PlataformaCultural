<template>
  <div
    class="user-card"
    role="button"
    @click="$emit('card-click')"
    :style="{ 'background-color': $store.getters['categories/getCategoryById'](user.categoryId).color }"
  >
    <h3>
      {{ `${user.firstName||''} ${user.lastName||''}` }}
    </h3>
  </div>
</template>

<script>
export default {
  name: 'UserCard',
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
