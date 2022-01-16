<template>
<div class="topics-profile">
    <carousel
      :scrollPerPage="true"
      :perPage=1
      :perPageCustom="[
        [640, 2],
        [1366, 3],
        [1600, 5]
      ]"
      :paginationEnabled="pagination"
      class="carousel"
    >
      <slide
        v-for="topic in $store.getters['topics/getMyTopics']"
        :key="topic.id"  
      >
      <div
      class="content" :style="{'background': $store.getters['categories/getCategoryById'](topic.categoryId).color}">
        <q-fab class="btn-actions no-border-radius" square color="black" padding="13px" text-color="white" icon="more_vert" direction="left">
          <q-fab-action class="no-border-radius" square color="black" text-color="white" @click="emitThisTopic(topic)" icon="visibility" />
          <q-fab-action class="no-border-radius" square color="black" text-color="white" @click="$store.commit('topics/SET_CURRENT_TOPIC', topic), confirm=true" icon="delete" />
          <q-fab-action class="no-border-radius" square color="black" text-color="white" @click="$router.push(`/perfil/topics/edit/${topic.id}`), $store.commit('topics/SET_CURRENT_TOPIC', topic)" icon="edit" />
          <!-- <q-fab-action class="no-border-radius" square color="black" text-color="white" @click="$router.push('/perfil/topics/add')" icon="add" /> -->
  
        </q-fab>
        <div>
          <div class="title text-h4">
            {{ topic.title }}
          </div>
          <div class="description text-subtitle1 text-left q-mt-xl">
            {{ $store.getters.formatDate(topic.createdAt) }}
            <br>
            {{ $store.getters['categories/getCategoryById'](topic.categoryId).label }}
          </div>
        </div>

        <q-dialog
          v-model="confirm"
          persistent
        >
        <q-card>
          <q-card-section class="row items-center">
          <q-avatar
              icon="fas fa-trash"
              color="negative"
              text-color="white"
          />
          <span class="q-ml-sm">Tem certeza que deseja remover esse debate?</span>
          </q-card-section>

          <q-card-actions align="right">
          <q-btn
              v-close-popup
              flat
              label="Cancelar"
              color="negative"
          />
          <q-btn
              v-close-popup
              flat
              label="Remover"
              color="negative"
              @click="removeTopic()"
          />
          </q-card-actions>
        </q-card>
        </q-dialog>
  
      </div>
      </slide>
    </carousel>
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
  emits: ['card-click'],
  data() {
    return {
      navigation: false,
      confirm: false
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
    }),
    pagination() {
      return this.$q.screen.width < 768 ? false : true;
    } 
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
    // fetchStorage() {
    //   this.$store.dispatch('topics/fetchStorage');
    // },
    removeTopic() {
      this.$store.dispatch("topics/deleteTopic", { $socket: this.$socket });
    }
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/mixins.scss';

.topics-profile {
  width: 100%;
  overflow: hidden;
  padding-top: 26px;

  .VueCarousel {
    .VueCarousel-inner {
      .VueCarousel-slide {
        .content {
          display: flex;
          text-align: left;
          padding: 60px 35px;

          .title {
            font-size: 2rem;
          }

          .description {
            position: absolute;
            bottom: 55px;
            left: 38px;
          }
        }
      }
    }
  }
}

</style>
