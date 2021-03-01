<template>
  <div class="filter">
    <!-- start categories -->
    <div class="filter-list">
      <q-list>
        <q-item
          v-for="item in categories"
          :id="`item-${item.id}`"
          :key="item.value"
          class="item"
          clickable
          @click="$store.commit('pins/UPDATE_CATEGORIES_SELECTEDS', item.id)"
        >
          <q-item-section
            class="icon-content"
            avata
          >
            <icon-base
              :id="`icon-${item.value}`"
              :icon-id="item.value - 1"
              width="12"
              :set-white="false"
              :color="colors(item)"
            />
          </q-item-section>

          <q-item-section
            :id="`category-label-${item.value}`"
            class="label-content overline bolder"
            :style="`color: ${colors(item)}`"
          >
            {{ item.label }}
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
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
  // width: inherit;
  width: 180px;
  overflow: hidden;
}

.item {
  height: 20px;
  padding: 8px 8px 8px 12px;
}

.icon-content {
  margin-right: 0px;
  padding: 0px !important;
  min-width: 22px !important;
  // border: 2px solid red;
}

</style>
