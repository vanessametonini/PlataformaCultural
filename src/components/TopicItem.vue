<template>
  <q-card
    class="my-card"
    square
    :style="{ 'background-color': category(topic.categoryId).color }"
    @click="emitThisTopic()"
  >
    <q-card-section class="card">
      <div id="title" class="big-title bolder text-white">
        {{ topic.title }}
      </div>
      <div class="caption bolder mg-top16 text-white">
        {{ category(topic.categoryId).label }}
      </div>
      <div class="row al-items-center mg-top8 text-white">
        <span class="body-3 bolder">
          {{ topic.user.firstName + " " + topic.user.lastName }}
        </span>
        <span class="caption bold mg-left16">
          {{ formatDate(topic.createdAt) }}
        </span>
      </div>
    </q-card-section>
    <multicolor-line class="multicolor-line-top" />
    <q-card-section class="card">
      <div class="body-2 bolder text-white">
        {{ topic.content }}
      </div>
    </q-card-section>
    <q-card-section class="card row no-wrap justify-between">
      <div>
        <span class="caption bolder">
          {{ topic.positiveSupports + topic.negativeSupports }}
        </span>
        <span class="caption bolder">
          {{
            ` ${
              topic.positiveSupports + topic.negativeSupports === 1
                ? "voto"
                : "votos"
            }`
          }}
        </span>
      </div>

      <div>
        <q-icon name="far fa-thumbs-up" />
        <!-- <i class="fas fa-heart"></i> -->
        <span class="caption bolder"> {{ supportsPercentage(true) }}% </span>
      </div>
      <div>
        <q-icon name="far fa-thumbs-down" />
        <!-- <i class="fas fa-heart-broken"></i> -->
        <span class="caption bolder"> {{ supportsPercentage(false) }}% </span>
      </div>
      <div>
        <span class="caption bolder">
          {{ topic.numberOfReplies }}
        </span>
        <span class="caption bolder">
          {{ ` ${topic.numberOfReplies === 1 ? "comentário" : "comentários"}` }}
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
      categories: "categories/loadCategories",
      formatDate: "formatDate",
      category: "categories/getCategoryById",
    }),
    formatDescription() {
      const limit = 150;
      const str = this.topic.content;
      if (str.length > limit) {
        return str.substring(0, limit).concat("...");
      }
      return this.topic.description;
    },
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
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";
@import "../styles/mixins.scss";

div {
  align-content: center;
}
.card {
  padding: 32px;
  position: relative;
}
.my-card {
  &:hover {
    cursor: pointer;
  }
}

#title {
  margin-left: -4px;
  margin-top: 0px;
  line-height: 2.5rem;
}
.my-slide {
  width: 100%;
  max-width: 100px;
}

.fa-thumbs-up {
  color: black;
  font-size: 1rem;
}

.fa-thumbs-down {
  color: black;
  font-size: 1rem;
}

.fa-heart {
  color: black;
  font-size: 1rem;
}

.fa-heart-broken {
  color: black;
  font-size: 1rem;
}
</style>