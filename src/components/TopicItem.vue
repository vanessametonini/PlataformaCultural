<template>
  <q-card
    class="my-card"
    square
    :style="{ 'background-color': $store.getters['categories/getCategoryById'](topic.categoryId).color }"
    @click="emitThisTopic()"
  >
      <q-card-section class="card">
        <div class="title" :title="topic.title">
          {{ mask(topic.title, 30)}}
        </div>
        <div class="bolder mg-top8 text-white">
          {{ $store.getters['categories/getCategoryById'](topic.categoryId).label }}
        </div>
        <div class="row al-items-center text-white caption">
          <span class="">
            {{ topic.user.firstName}} {{topic.user.lastName }}
          </span>
          <span class="mg-left16">
            {{ formatDate(topic.createdAt) }}
          </span>
        </div>
      </q-card-section>
      <q-card-section class="card-description">
        <p class="text-white">
          {{ mask(topic.content, 120) }}
        </p>
      </q-card-section>

    <q-card-section class="card card-bottom">
      <div class="thumbs">
        <q-icon name="fa fa-thumbs-up" />
        <span class="votesPercent"> {{ supportsPercentage(true) }}% </span>
        <q-icon name="fa fa-thumbs-down" />
        <span class="votesPercent"> {{ supportsPercentage(false) }}% </span>
      </div>

      <div class="supports-comments caption">
        <span class="supports">
          {{ topic.positiveSupports + topic.negativeSupports }}

          {{
            ` ${
              topic.positiveSupports + topic.negativeSupports === 1
                ? "Apoio"
                : "Apoios"
            }`
          }}
        </span>
        |
        <span class="comments">
            {{ topic.numberOfReplies }}
            {{ ` ${topic.numberOfReplies === 1 ? "Comentário" : "Comentários"}` }}
        </span>
      </div>

    </q-card-section>
  </q-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "TopicItem",
  props: {
    topic: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    ...mapGetters({
      formatDate: "formatDate",
    })
  },
  methods: {
    ...mapActions("topics", [
      "localLoadCurrentTopic",
      "localLoadCurrentTopicReplyes",
    ]),
    async emitThisTopic() {
      this.$store.commit("topics/SET_CURRENT_TOPIC", this.topic);
      this.$router.push({
        name: "TopicPage",
        params: { topicId: this.topic.id },
      });
    },
    supportsPercentage(type) {
      const posAmount = parseInt(this.topic.positiveSupports, 10);
      const negAmount = parseInt(this.topic.negativeSupports, 10);
      const totalSupports = parseInt(posAmount + negAmount, 10);
      if (type === true) {
        return totalSupports
          ? parseInt((posAmount / totalSupports) * 100, 10)
          : 0;
      }
      return totalSupports
        ? parseInt((negAmount / totalSupports) * 100, 10)
        : 0;
    },
    mask(text, limit = 20){
      if (text.length>limit) return text.substring(0, limit)+'...';
      return text;
    },
  },
};
</script>

<style lang="scss" scoped>

.card {
  color: white;
  padding: 32px;
  position: relative;
}

.card-bottom {
  padding-top: 16px;
}

.my-card {
  margin-bottom: 10px;
  &:hover {
    cursor: pointer;
  }
}

.card-description {
  padding: 0 64px 16px 32px;

  p {
    margin: 0;
  }
}

.title {
  font-size: 2.5rem;
  font-weight: bolder;
  line-height: 2.5rem;
  margin: 0;
}

.thumbs {
  margin-bottom: 24px;
  text-align: center;
}

.supports-comments {
  text-align: center;
}

.fa-thumbs-up,
.fa-thumbs-down {
  color: white;
  font-size: 2.8em;
  position: relative;
}

.fa-thumbs-down {
  top: 7px;
}

.votesPercent {
  color: black;
  font-weight: bolder;
  font-size: 1.2em;
  position: relative;
  top: -18px;
  letter-spacing: -.05em;
}
</style>