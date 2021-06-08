<template>
  <div class="app-component events-list">
    <div
      v-if="false"
      class="null-state column"
    >
      <img src="../assets/statics/pixeltrue-idea.png">
      <span class="body-2 bolder"><strong>Ops!</strong> ainda não possuimos eventos.</span>
      <span class="body-2 bolder">você pode ser o primeiro</span>
    </div>

    <div
      v-else
      class="content"
    >
      <masonry
        class="grid"
        :cols="{ default: 3, 1200: 3, 1130: 2, 600: 1 }"
        :gutter="{ default: '16px', 1200: '4px', 1130: '8px', 600: '4px'}"
      >
        <div
          v-for="(item, index) in events"
          :key="index"
        >
          <schedule-item
            :id="item.id"
            class="item"
            :item="item"
          />
        </div>
      </masonry>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ScheduleItem from './ScheduleItem.vue';

export default {
  components: { ScheduleItem },
  props: {
    filter: {
      type: String,
      default: () => 'mostRecents',
    },
  },
  data() {
    return {
      loading: false,
      eventsLoaded: [], // array to be iterated
      filterOption: [], // void array => mostRecents
      currentFilter: 'mostRecents',
      lastFilter: 'mostRecents',
      streamCount: 0, // most actives
      thumbStyle: {
        right: '0px',
        top: '16px',
        borderRadius: '0px',
        backgroundColor: '#111111',
        width: '9px',
        heigth: '8px',
        opacity: 0.75,
      },
      barStyle: {
        right: '0px',
        top: '16px',
        borderRadius: '0px',
        backgroundColor: '#eeeeee',
        width: '9px',
        opacity: 0.2,
      },
    };
  },
  computed: {
    ...mapState('events', {
      events: (state) => state.list,
    })
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/variables.scss';
@import '../styles/mixins.scss';

.events-list {
  width: 100%;
  height: inherit;
}

.content {
  overflow: hidden;
}

.grid {
  border-radius: 0px !important;
  box-shadow: none !important;
}


.null-state {
  margin-top: 60px;

  img {
    height: 120px;
    align-self: center;
  }

  span {
    text-transform: lowercase;
    text-align: center;
    font-size: 14px;
    color: #888;
    font-weight: 500;
    line-height: 1.5;
    align-self: center;
  }
}

</style>
