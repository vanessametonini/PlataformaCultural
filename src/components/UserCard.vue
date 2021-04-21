<template>
  <div
    class="user-card"
    role="button"
    @click="$emit('card-click')"
    :style="{ 'background': categoriesById(user.categoryId).color}"
  >
    <h3>
      {{ `${user.firstName||''} ${user.lastName||''}` }}
    </h3>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
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
  computed: {
    ...mapGetters({
      categoriesById: 'categories/getCategoryById',
    })
  }
};
</script>

<style lang="scss" scoped>
@import '../styles/mixins.scss';

.user-card {
  @include profile-box;
}

</style>
