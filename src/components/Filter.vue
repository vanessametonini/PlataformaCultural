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
          @click="emit(item)"
        >
          <q-item-section
            class="icon-content"
            avata
          >
            <!-- iconId -1 : index of array of icons (0 a 17) -->
            <icon-base
              :id="`icon-${item.value}`"
              :icon-id="item.value -1"
              width="12"
              :set-white="false"
            />
          </q-item-section>

          <q-item-section
            :id="`category-label-${item.value}`"
            class="label-content overline bolder"
          >
            {{ item.label }}
          </q-item-section>
        </q-item>
      </q-list>

      <!-- <span style="color: red"> {{ this.selected }}</span> -->
    </div>
    <!-- end categories -->
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
      selected: [],
      selecteds: [],
      active: false,
    };
  },
  computed: {
    ...mapGetters({
      categories: 'categories/loadCategories',
      category: 'categories/getCategoryByValue',
    }),
  },
  mounted() {
    // this.resetAllColors();
    // this.setColor(2);
  },
  methods: {
    emit(category) {
      if (this.selecteds.length === 0) {
        this.resetAllColors();
        this.selecteds.push(category.id);
        this.setColor(category.value);
      } else if (this.selecteds.includes(category.id)) {
        this.selecteds.splice(this.selecteds.indexOf(category.id), 1);
        this.resetColor(category.value);
      } else {
        this.selecteds.push(category.id);
        this.setColor(category.value);
      }
      this.$store.commit('pins/UPDATE_PIN_LIST_FILTERED_BY_ARRAY_CATEGORY_VALUE', this.selecteds);
      // this.resetColor(sel.value);
      // if (this.selected.includes(sel)) {
      //   const index = this.selected.indexOf(sel);
      //   const element = this.selected[index];
      //   document.getElementById(`icon-${sel.value}`).getElementById('g').setAttribute('fill', `${element.color}`);
      //   document.getElementById(`category-label-${sel.value}`).style.color = '#000';
      //   this.selected.splice(index, 1);
      // } else {
      //   this.selected.push(sel);
      //   document.getElementById(`icon-${sel.value}`).getElementById('g').setAttribute('fill', 'b8bfc2');
      //   document.getElementById(`category-label-${sel.value}`).style.color = '#b8bfc2';
      // }
    },
    resetAllColors() {
      let i = 1;
      for (i; i < 19; i += 1) {
        document.getElementById(`icon-${i}`).getElementById('g').setAttribute('fill', '#b8bfc2');
        document.getElementById(`category-label-${i}`).style.color = '#b8bfc2';
      }
    },
    setAllColors() {
      let i = 1;
      for (i; i < 19; i += 1) {
        document.getElementById(`icon-${i}`).getElementById('g').setAttribute('fill', `${this.category(i).color}`);
        document.getElementById(`category-label-${i}`).style.color = '#000';
      }
    },
    setColor(value) {
      document.getElementById(`icon-${value}`).getElementById('g').setAttribute('fill', `${this.category(value).color}`);
      document.getElementById(`category-label-${value}`).style.color = '#000';
    },
    resetColor(value) {
      document.getElementById(`icon-${value}`).getElementById('g').setAttribute('fill', '#b8bfc2');
      document.getElementById(`category-label-${value}`).style.color = '#b8bfc2';
    },
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
