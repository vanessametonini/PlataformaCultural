
<template>
  <div class="null-state column">
    <div v-if="state" class="column">
      <img src="../assets/statics/pixeltrue-jogging.png" />
      <span class="body-2 bolder"><strong>Só um instante!</strong></span>
      <span class="body-2 bolder">Estamos confirmando seu email.</span>
    </div>
    <div v-if="!state" class="column">
      <img src="../assets/statics/pixeltrue-error-1.png" />
      <span class="body-2 bolder">Não encontramos um usuário com seu código de confirmação.</span>
    </div>
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      state: true,
    }
  },
  created() {
    return this.$store
      .dispatch("users/confirmEmail", {
        confirmToken: this.$route.params.confirmToken,
      })
      .then((response) => {
        this.$store.commit("services/STORAGE_TOKEN", response.data.token);
        this.$store.commit("users/SET_CURRENT_USER", response.data.user);
        this.$store.commit("SET_AUTHENTICATION");
        this.$q.notify({
          color: "black",
          textColor: "white",
          message: "Email confirmado!",
        });
        this.$router.push({ name: "Profile" });
      })
      .catch(() => {
        this.state = false;
      });
  },
};
</script>

<style lang="scss" scoped>
.null-state {
  margin-top: 60px;
  width: 100%;
  height: inherit;

  img {
    height: 50%;
    width: 50%;
    align-self: center;
  }

  span {
    text-align: center;
    font-size: 14px;
    color: #888;
    font-weight: 500;
    line-height: 1.5;
    align-self: center;
  }
}
</style>