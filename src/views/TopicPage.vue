<template>
  <div class="app-page topic-page">
    <div class="content">
      <base-spinner
        v-if="loading"
        class="page-spinner"
      />

      <template v-else>
        <topic-view
          :topic="topic"
          :replyes="replyes"
          @delete="onDeleteTopic"
        />
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import TopicView from '../components/TopicView.vue';

export default {
  components: {
    TopicView,
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapGetters({
      topic: 'topics/getCurrentTopic',
      replyes: 'topics/getCurrentTopicReplyes',
      isLoggedIn: 'users/isLoggedIn',
    }),
  },
  methods: {
    ...mapActions([
      'topics/deleteTopic',
    ]),
    async onDeleteTopic() {
      this.loading = true;
      await this.deleteTopic({ topicId: this.topic.id });
      this.$router.push({
        name: 'Topics',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.topic-page {
  width: 100%;
  min-height: 100vh;
  height: 100%;
  padding: 32px;
  display: flex;
  // justify-items: center;
  justify-content: center;
}

.content {
  // justify-self: center;
  min-width: 800px;
  max-width: 900px;
  // height: inherit;
}

</style>
