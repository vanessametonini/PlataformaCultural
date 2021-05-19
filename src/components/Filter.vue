<template>
  <q-scroll-area class="filter" :bar-style="barStyle">
    <ul>
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
  </q-scroll-area>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'MyFilter',
  emits: ['call-filter'],
  data() {
    return {
      barStyle: {
        right: "0",
        borderRadius: "4px",
        backgroundColor: "#eee",
        width: "4px",
        opacity: .8,
      },
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
  &.q-scrollarea {

    height: calc(100vh - 272px);

    @include for-tablet-landscape-up {
      height: calc(100vh - 300px);
    }

    @include for-desktop-up {
      height: calc(100vh - 338px);
    }

    @include for-big-desktop-up {
      height: calc(100vh - 368px);
    }
  }

  ul {
    margin: 0;
    padding: 0;
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
