<template>
  <div class="topics-list">
    <div
      v-if="topics.length == 0"
      class="null-state column"
    >
      <img src="../assets/statics/pixeltrue-idea.png">
      <span class="body-2 bolder"><strong>Ops!</strong> ainda não possuimos diálogos abertos.</span>
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
        <!-- topic-item -->
        <topic-item
          v-for="(topic, index) in topics"
          ref="users"
          :key="index"
          :topic="topic"
        />
      </masonry>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
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
    ...mapGetters({
      topics: 'topics/loadTopicsFiltered',
    }),
  },
  mounted() {
    this.$store.dispatch('topics/loadTopics');
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
