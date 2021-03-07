<template>
  <ul class="filter">
    <li
      v-for="item in categories"
      :id="`item-${item.id}`"
      :key="item.value"
      class="item"
      clickable
      @click="$store.commit('pins/UPDATE_CATEGORIES_SELECTEDS', item.id)"
    >
      <div
        class="icon-content"
        avata
      >
        <icon-base
          :id="`icon-${item.value}`"
          :icon-id="item.value - 1"
          :set-white="false"
          :color="colors(item)"
        />
      </div>

      <div
        :id="`category-label-${item.value}`"
        :style="`color: ${colors(item)}`"
      >
        {{ item.label }}
      </div>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex';

import iconBase from './iconBase.vue';

export default {
  name: 'MyFilter',
  components: {
    iconBase,
  },
  emits: ['call-filter'],
  data() {
    return {
      active: false,
    };
  },
  computed: {
    ...mapGetters({
      categories: 'categories/loadCategories',
      colors: 'pins/getColors',
    }),
  },
};
</script>

<style lang="scss" scoped>
.filter {
  margin: 0;
  max-height: calc(100vh - 368px);
  overflow: auto;
}

.item {
  box-sizing: border-box;
  border-radius: 2px;
  display: flex;
  line-height: initial;
  padding: 8px;
}

.icon-content {
  padding-right: 14px;
}

</style>
