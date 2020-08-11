<template>
  <div class="filter">
    <!-- start options -->
    <div class="filter-list">
      <q-list>
        <q-item
          v-for="item in options"
          :id="`item-${item.value}`"
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
    <!-- end options -->
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
  data() {
    return {
      selected: [],
      active: false,
    };
  },
  computed: {
    ...mapGetters({
      options: 'categories/loadCategories',
    }),
  },
  methods: {
    emit(sel) {
      if (this.selected.includes(sel)) {
        this.$emit('call-filter', sel.value);
        // console.log('delete', sel);
        const index = this.selected.indexOf(sel); // resgata do array o index fo elemento selecionado
        const element = this.selected[index]; // resgata o elemento selecionado
        // console.log('restore', element);
        document.getElementById(`icon-${sel.value}`).getElementById('g').setAttribute('fill', `${element.color}`); // restaura a cor do svg icon
        document.getElementById(`category-label-${sel.value}`).style.color = '#000'; // restaura a cor do label
        this.selected.splice(index, 1); // remove elemento do array backup
      } else {
        this.$emit('call-filter', sel.value);
        // console.log('push selected', sel);
        this.selected.push(sel); // salva elemento selecionado no array
        document.getElementById(`icon-${sel.value}`).getElementById('g').setAttribute('fill', '#b8bfc2'); // seta a nova cor para o svg icon
        document.getElementById(`category-label-${sel.value}`).style.color = '#b8bfc2'; // seta a nova cor para label
      }
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
