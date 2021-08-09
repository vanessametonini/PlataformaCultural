<template>
  <aside class="filter">
    <h2 class="title-4">Categorias no mapa</h2>
    <q-scroll-area :bar-style="barStyle">
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
  </aside>
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

  background-color: white;
  min-height: 100px;
  max-height: 700px;
  height: calc(100vh - #{$logoMobileSize} - #{$logoMargin} - #{$footerMargin * 2} - #{$verticalPadding});
  width: $logoMobileSize;

  @include for-tablet-landscape-up {
    height: calc(100vh - #{$logoDesktopSize} - #{$logoMargin} - #{$footerMargin} - #{$verticalPadding});
    top: calc( #{$logoDesktopSize} + #{$logoMargin} + 4px);
    width: $logoDesktopSize;
  }

  @include for-big-desktop-up {
    height: calc(100vh - #{$logoLargeSize} - #{$logoMargin} - #{$footerMargin} - #{$verticalPadding});
    top: calc( #{$logoLargeSize} + #{$logoMargin} + 4px);
    width: $logoLargeSize;
  }

  .title-4 {
    background-color: #cbcbcb;
    color: white;
    font-weight: bold;
    line-height: 1em;
    padding: 10px;
    margin-bottom: #{$verticalPadding / 2};
  }

  ul {
    margin: 0;
    padding: 0;
  }
}

.q-scrollarea {
  padding: 0 4px;

  //100% do elemento pai, menos altura do h2, menos tamanho do padding
  height: calc(100% - 36px - #{$verticalPadding});

  @include for-tablet-portrait-up {
    height: calc(100% - 56px - #{$verticalPadding});
  }

  @include for-tablet-landscape-up {
    height: calc(100% - 38px - #{$verticalPadding});
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
