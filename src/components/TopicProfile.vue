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
          v-ripple
          class="info"
          clickable
          :style="{ 'border-color': $store.getters['categories/getCategoryById'](topic.categoryId).color}"
          :title="topic.title"
        >
          <q-item-section>
            <q-item-label>
              {{ mask(topic.title) }}
            </q-item-label>
            <q-item-label caption>
              {{ $store.getters.formatDate(topic.createdAt) }}
            </q-item-label>
          </q-item-section>
          <q-item-section class="actions">
            <q-item-label 
              class="icon" 
              @click="emitThisTopic(topic)"
            >
              <i class="fas fa-eye" />
            </q-item-label>
            <q-item-label 
              class="icon" 
              @click="$emit('card-click'), $store.commit('topics/SET_CURRENT_TOPIC', topic), fetchStorage()"
            >
              <i class="fas fa-edit" />
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </div>
</template>

<script>
import { createHelpers } from "vuex-map-fields";
const { mapFields } = createHelpers({
  getterType: "topics/getField",
  mutationType: "topics/updateField",
});
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
  computed: {
    ...mapFields({
      title: "topicForm.title",
      categoryId: "topicForm.categoryId",
      categoriesTagged: "topicForm.categoriesTagged",
      userId: "topicForm.userId",
      createdAt: "topicForm.createdAt",
      positiveSupports: "topicForm.positiveSupports",
      negativeSupports: "topicForm.negativeSupports",
      numberOfReplies: "topicForm.numberOfReplies",
      content: "topicForm.content",
      views: "topicForm.views",
    })
  },
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
    fetchStorage() {
      this.$store.dispatch('topics/fetchStorage');
    }
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

  .info  {
    position: relative;
    display: flex;
    cursor: pointer;
  }

  .info:hover .actions {
      position: absolute;
      display: flex;
      flex-direction: row;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      margin: 0;
      justify-content: space-around;
      align-items: center;
      background-color: rgba(0, 0, 0, .7);
  }

  .actions {
    display: none;   
  }

  .icon {
      margin: 0;
      padding: 6px;
    }
}

</style>
