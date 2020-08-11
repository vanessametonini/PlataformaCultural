<template>
  <div class="topics-list">
    <div
      v-if="topicsLoaded.length === 0"
      class="null-state column"
    >
      <img src="../assets/statics/pixeltrue-idea.png">
      <span class="body-2 bolder"><strong>Ops!</strong> ainda não possuimos diálogos abertos.</span>
      <span class="body-2 bolder">você pode ser o primeiro</span>
    </div>

    <!-- IMPLEMENTAR O SCROOL AREA E O TRIGGER GET_MORE_TOPICS, JUNTO AO TRIGGER GHANGE_FILTER -->
    <div
      v-else
      class="content"
    >
      <masonry
        class="grid"
        :cols="{ default: 3, 1200: 3, 1130: 2, 600: 1 }"
        :gutter="{ default: '16px', 1200: '4px', 1130: '8px', 600: '4px'}"
      >
        <!-- topic-item -->
        <topic-item
          v-for="topic in topics"
          ref="users"
          :key="topic._id"
          :topic="topic"
        />
      </masonry>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
// import { mapGetters } from 'vuex';
import TopicItem from './TopicItem.vue';

export default {
  components: { TopicItem },
  props: {
    filter: {
      type: String,
      default: () => 'mostRecents',
    },
  },
  data() {
    return {
      loading: false,
      topicsLoaded: [], // array to be iterated
      filterOption: [], // void array => mostRecents
      currentFilter: 'mostRecents',
      lastFilter: 'mostRecents',
      streamCount: 0, // most actives
    };
  },
  computed: {
    ...mapState('topics', {
      topics: (state) => state.list,
    }),
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
      this.$store.dispatch('topics/loadInitialTopics', {
        type,
        streamCount: 0,
      })
        .then((response) => {
          this.streamCount = 1; // records the value of the new streamCount
          this.topicsLoaded.push(response.data);
        })
        .catch((error) => {
          console.log('topicsList/getInitialTopics - ERROR', error.message);
        });
    },
    getMoreTopics() {
      // stream continue get 'currentFilter' and increment streamCount
      this.$store.dispatch('topics/loadMoreTopics', {
        type: this.currentFilter, // {}
        streamCount: this.streamCount,
      })
        .then((response) => {
          this.streamCount += 1; // increment
          this.topicsLoaded.push(response.data);
        })
        .catch((error) => {
          console.log('topicsList/getMoreTopics - ERROR', error.message);
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
  },
};
</script>

<style lang="scss" scoped>
.topics-list {
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
