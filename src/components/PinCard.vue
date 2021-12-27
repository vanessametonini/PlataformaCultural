<template>
  <div
    class="user-card"
    role="button"
    @click="$router.push('/perfil/pins/add')"
  >
    <h3>
      Adicionar no Mapa
    </h3>
  </div>
</template>

<script>
export default {
  name: "PinCard",
};
</script>

<style lang="scss" scoped>
@import '../styles/mixins.scss';

.user-card {
  @include profile-box;
}

</style>
