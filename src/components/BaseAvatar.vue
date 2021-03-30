<template>
  <q-avatar>
    <img :src="`${$store.getters['services/getImagePath']}${avatar}`">
  </q-avatar>
</template>

<script>
export default {
  props: {
    avatar: {
      type: String,
      default: '',
    },
  },
};
</script>
