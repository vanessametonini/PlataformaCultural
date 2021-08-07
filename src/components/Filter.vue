<template>
  <q-scroll-area
    class="filter"
    :bar-style="barStyle"
  >
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
@import '../styles/variables.scss';
@import '../styles/mixins.scss';
@import '../styles/categories.scss';

$verticalPadding: 10px;
$footerMargin: 24px;

.filter {

  box-shadow: 5px 5px 5px rgba(0,0,0,1);
  background-color: white;
  min-height: 100px;
  max-height: 662px;
  padding-bottom: $verticalPadding;
  padding-top: $verticalPadding;
  padding-left: 4px;
  padding-right: 4px;

  &.q-scrollarea {

    height: calc(100vh - #{$logoMobileSize} - #{$logoMargin} - #{$footerMargin * 2} - #{$verticalPadding});

    @include for-tablet-landscape-up {
      height: calc(100vh - #{$logoDesktopSize} - #{$logoMargin} - #{$footerMargin} - #{$verticalPadding});
    }

    @include for-big-desktop-up {
      height: calc(100vh - #{$logoLargeSize} - #{$logoMargin} - #{$footerMargin} - #{$verticalPadding});
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

  &:last-of-type {
    margin-bottom: 0;
  }
}

</style>
