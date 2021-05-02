<template>
  <div class="topics-profile">
    <h3>Meus Debates</h3>
    <q-scroll-area
      :bar-style="barStyle"
    >
      <q-list>
        <q-item
          v-for="topic in $store.getters['topics/getMyTopics']"
          :key="topic.id"
          clickable
          v-ripple
          @click="emitThisTopic(topic)"
          :style="{ 'border-color': $store.getters['categories/getCategoryById'](topic.categoryId).color}"
          :title="topic.title"
        >
          <q-item-section>
            <q-item-label>
              {{mask(topic.title)}}
            </q-item-label>
            <q-item-label caption>
              {{ $store.getters.formatDate(topic.createdAt) }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </div>
</template>

<script>
export default {
  name: "TopicProfile",
  props: {},
  data() {
    return {
      barStyle: {
        right: "0",
        borderRadius: "4px",
        backgroundColor: "#fff",
        width: "4px",
        opacity: .8,
      },
    };
  },
  computed: {},
  methods: {
    mask(text){
      const limit = 20;
      if (text.length>limit) return text.substring(0, limit)+'...';
      return text;
    },
    async emitThisTopic(topic) {
      this.$router.push({
        name: "TopicPage",
        params: { topicId: topic.id },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/mixins.scss';

.topics-profile {
  @include profile-box;
  @include profile-scrolls;

  .q-scrollarea {
    height: 87px;
  }
}

</style>
