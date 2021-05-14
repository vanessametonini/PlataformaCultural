<template>
  <ul class="filter">
    <li
      v-for="(item) in categories"
      :id="`item-${item.id}`"
      :key="item.value"
      class="item"
      clickable
      :style="`color: ${colors(item)}`"
      @click="$store.commit('pins/UPDATE_CATEGORIES_SELECTEDS', item.id)"
    >
      <span :class="`icon-${item.value}`" />
      {{ item.label }}
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'MyFilter',
  emits: ['call-filter'],
  data() {
    return {
      active: false,
      publicPath: process.env.BASE_URL
    };
  },
  computed: {
    ...mapGetters({
      categories: 'categories/loadCategories',
      colors: 'pins/getColors',
    }),
  }
};
</script>

<style lang="scss" scoped>
@import '../styles/mixins.scss';
@import '../styles/categories.scss';

.filter {
  margin: 0;
  max-height: calc(100vh - 272px);
  overflow: auto;

  @include for-tablet-landscape-up {
    max-height: calc(100vh - 300px);
  }

  @include for-desktop-up {
    max-height: calc(100vh - 338px);
  }

  @include for-big-desktop-up {
    max-height: calc(100vh - 368px);
  }
}

.item {
  border-radius: 2px;
  box-sizing: border-box;
  clear: left;
  cursor: pointer;
  display: grid;
  font-size: 1em;
  grid-template-columns: 36px auto;
  line-height: initial;
  list-style: none;
  margin-bottom: 4px;

  span[class^="icon-"] {
    font-size: 2em;
    position: relative;
    top: -6px;
  }
}

</style>
