<template>
  <!-- item to be selected in topics-page -->
  <div
    class="topic-item"
    :style="{ 'background-color': category(topic.categoryId).color }"
    @click="emitThisTopic()"
  >
    <div class="card column">
      <!-- <span id="category-label" class="headline-3 bolder"> {{ category.label }} </span> -->

      <span
        id="title"
        class="big-title bolder"
      > {{ topic.title }} </span>

      <span class="caption bolder mg-top16"> {{ category(topic.categoryId).label }} </span>
      <!-- topicOwner & date -->
      <div class="row al-items-center mg-top8">
        <span class="body-3 bolder"> {{ topic.user.firstName + ' ' + topic.user.lastName }} </span>

        <span class="caption bold mg-left16"> {{ formatDate(topic.createdAt) }} </span>
      </div>

      <span class="caption bold mg-top16"> {{ formatDescription }} </span>

      <div class="row no-wrap justify-between mg-top32">
        <span class="caption bolder"> {{ topic.positiveSupports + topic.negativeSupports }} votos </span>

        <div class="stats-item">
          <!-- <q-icon class="vote-icon" name="far fa-thumbs-down" size="xs"></q-icon> -->
          <i class="far fa-thumbs-up" />
          <span class="caption bolder"> {{ supportsPercentage(true) }}% </span>
        </div>

        <div class="stats-item">
          <q-icon
            class="vote-icon"
            name="far fa-thumbs-down"
            size="xs"
          />
          <span class="caption bolder"> {{ supportsPercentage(false) }}% </span>
        </div>

        <span class="caption bolder"> {{ topic.numberOfReplies }} comentários </span>
      </div>

      <!-- <div class="row mg-top8">
        <span class="caption bolder"> {{ topic.positiveSupports + topic.negativeSupports }} votos </span>
        <span class="caption bolder mg-left8"> {{ topic.numberOfReplies }} comentários </span>
      </div> -->
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'TopicItem',
  props: {
    topic: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    ...mapGetters({
      categories: 'categories/loadCategories',
      formatDate: 'formatDate',
      category: 'categories/getCategoryById',
    }),
    formatDescription() {
      const limit = 150;
      const str = this.topic.content;
      if (str.length > limit) {
        return str.substring(0, limit).concat('...');
      }
      return this.topic.description;
    },
  },
  methods: {
    ...mapActions('topics', [
      'localLoadCurrentTopic',
      'localLoadCurrentTopicReplyes',
    ]),
    async emitThisTopic() {
      this.$store.commit('topics/SET_CURRENT_TOPIC', this.topic);
      this.$router.push({ name: 'TopicPage', params: { topicId: this.topic.id } });
    },
    supportsPercentage(type) {
      const posAmount = parseInt(this.topic.positiveSupports, 10);
      const negAmount = parseInt(this.topic.negativeSupports, 10);
      const totalSupports = parseInt(posAmount + negAmount, 10);
      if (type === true) {
        return totalSupports ? parseInt((posAmount / totalSupports) * 100, 10) : 0;
      }
      return totalSupports ? parseInt((negAmount / totalSupports) * 100, 10) : 0;
    },
  },
};
</script>

<style lang="scss" scoped>

@import '../styles/variables.scss';
@import '../styles/mixins.scss';

* {
  font-family: 'Helvetica';
  box-sizing: border-box;
}

.topic-item {
  overflow: hidden;
  width: 350px;
  margin: 0px 4px 8px 0px;
  transition: 0.2s ease-in;

  @include for-phone-only {
    width: 350px;
    margin: 8px 4px 24px 4px;
  }

  &:hover {
    cursor: pointer;
  }
}

.card {
  padding: 32px;
  position: relative;
}

#category-label {
  position: absolute;
  top: 16px;
}

#title {
  margin-left: -4px;
  margin-top: 0px;
  line-height: 2.3rem;
}

.line-h16 {
  line-height: 1em;
}

.img-box {
  display: none;
  padding: 0px;
  margin: 0px;
  width: 100%;
  max-height: 250px;
  overflow: hidden;

  .img {
    height: auto;
    width: 100%;
  }
}

span {
  color: white;
}

.link {
  text-decoration: none;
  color: white;
}

.vote-icon {
  color: black;
  margin-right: 4px;
}

</style>
