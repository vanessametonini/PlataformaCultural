
<template>
  <div></div>
</template>
<script>
export default {
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
          message: 'Email confirmado!',
        });
        this.$router.push({ name: "Profile" });
      })
      .catch((error) => error);
  },
};
</script>