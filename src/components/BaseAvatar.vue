<template>
  <div>
    <q-avatar v-if="avatar">
      <img :src="`${$store.getters['services/getImagePath']}${avatar}`">
    </q-avatar>
    <q-avatar
      v-else
      :style="{'background-color': categoryColor}"
    >
      {{ $store.getters['users/getUserInitials'] }}
    </q-avatar>
  </div>
</template>

<script>
export default {
  props: {
    avatar: {
      type: String,
      default: '',
    },
  },
  computed: {
    categoryColor () {
      return this.$store.getters['categories/getCategoryById'](this.$store.getters['users/getCurrentUser'].categoryId).color;
    }
  }
};
</script>
