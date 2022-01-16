<template>
  <div
    class="user-card"
    role="button"
    @click="$router.push('/profile/events/add')"
  >
    <h3>
      Adicionar Evento
    </h3>
  </div>
</template>

<script>
export default {
  name: 'EventCard',
};
</script>

<style lang="scss" scoped>
@import '../styles/mixins.scss';

.user-card {
  @include profile-box;
}

</style>
