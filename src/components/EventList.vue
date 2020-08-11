<template>
  <div class="app-component topics-list">
    <div
      v-if="eventsLoaded.length === 0"
      class="null-state column"
    >
      <img src="../assets/statics/pixeltrue-idea.png">
      <span class="body-2 bolder"><strong>Ops!</strong> ainda não possuimos eventos.</span>
      <span class="body-2 bolder">você pode ser o primeiro</span>
    </div>

    <!-- IMPLEMENTAR O SCROOL AREA E O TRIGGER GET_MORE_TOPICS, JUNTO AO TRIGGER GHANGE_FILTER -->
    <div
      v-else
      class="content"
    >
      <q-scroll-area
        v-if="handleResize"
        class="scroll-area"
        :thumb-style="thumbStyle"
        :bar-style="barStyle"
      >
        <masonry
          class="grid"
          :cols="{ default: 3, 1200: 3, 1130: 2, 600: 1 }"
          :gutter="{ default: '16px', 1200: '4px', 1130: '8px', 600: '4px'}"
        >
          <div
            v-for="item in events"
            :key="item.id"
          >
            <schedule-item
              class="item"
              :item="item"
            />
          </div>
        </masonry>
      </q-scroll-area>
    </div>
  </div>
</template>

<script>
// import { mapState } from 'vuex';
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
    // ...mapState('events', {
    //   events: (state) => state.list,
    // }),
    hasAnyFilter() {
      let filterState = false;
      if (this.filter.length !== 0) {
        filterState = true;
      }
      return filterState;
    },
    // ...mapGetters({
    //   topics: 'loadTopics',
    // }),
  },
  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  beforeMount() {
    this.getInitialTopics('mostRecents');
  },
  mounted() {
    this.$nextTick(function scrollListener() {
      window.addEventListener('scroll', this.onScroll);
      this.onScroll(); // needed for initial loading on page
    });
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  },
  unmounted() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    changeFilter(type) {
      // click in filter options  trigger this action
      if (type !== this.lastFilter) {
        this.currentFilter = type; // used to set logic getMoreTopics.
        this.lastFilter = type; // used to call getInitialTopics whenever filter changes
        this.streamCount = 0;
        this.getInitialTopics(type);
      } else {
        console.log('filter dont changed');
      }
    },
    getInitialTopics(type) {
      this.$store.dispatch('events/loadInitialEvents', {
        type,
        streamCount: 0,
      })
        .then((response) => {
          this.streamCount = 1; // records the value of the new streamCount
          this.eventsLoaded.push(response.data);
        })
        .catch((error) => {
          console.log('EventList/getInitialEvents - ERROR', error.message);
        });
    },
    getMoreTopics() {
      // stream continue get 'currentFilter' and increment streamCount
      this.$store.dispatch('events/loadMoreEvents', {
        type: this.currentFilter, // {}
        streamCount: this.streamCount,
      })
        .then((response) => {
          this.streamCount += 1; // increment
          this.eventsLoaded.push(response.data);
        })
        .catch((error) => {
          console.log('EventList/getMoreEvents - ERROR', error.message);
        });
    },
    onScroll() {
      window.onscroll = () => {
        const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;

        if (bottomOfWindow) {
          console.log('onScroll - trigger');
          this.getMoreTopics();
        }
      };
    },
    handleResize() {
      const size = window.innerWidth;
      if (size > 600) {
        return false;
      }
      return true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/variables.scss';
@import '../styles/mixins.scss';
@import '../styles/typo.scss';

.topics-list {
  width: 100%;
  height: inherit;
}

.content {
  overflow: hidden;
}

.scroll-area {
  height: 100%;
  // width: 100%;
  padding-right: 16px;

  @include for-phone-only {
    display: none;
    padding: 4px 8px 4px 8px;
  }
}

.grid {
  border-radius: 0px !important;
  box-shadow: none !important;
}

.topic-item + .topic-item {
  border-top: 1px solid #F0F0F0;
}

.topics-list-title {
  font-size: 18px;
  color: #777;
  font-weight: 400;
}

.null-state {
  margin-top: 60px;

  img {
    height: 120px;
    // width: 90px;
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
