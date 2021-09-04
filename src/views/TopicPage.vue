<template>
  <div class="topic-page column">
    <!-- header -->
    <header
      class="header"
      role="banner"
    >
      <logo-card />
      <base-button
        class="reset-btn mg-top8"
        theme="flat"
        :to="{ name: 'Topics' }"
      >
        <i class="fas fa-arrow-left text-black" />
        <span class="caption bolder mg-left8 text-black"> voltar aos debates </span>
      </base-button>
    </header>

    <q-inner-loading :showing="loading">
      <q-spinner
        color="black"
        size="3em"
        :thickness="2"
      />
    </q-inner-loading>

    <div v-show="!loading" class="topic-wrapper">
      <!-- topic -->
      <article
        class="topic-content"
        role="main"
      >
        <header>
          <div class="action">
            <h2 class="big-title bolder">
              {{ topic.title }}
            </h2>
            <q-item-label 
              class="edit-icon" 
              @click="$emit('card-click'), setTopic()"
              v-if="owner"
            >
              <i class="fas fa-edit" />
            </q-item-label>
          </div>
          <multicolor-line class="multicolor-line-top" />
          <section class="author row mg-top8">
            <span class="body-3 bolder text-gray">
              {{ topic.user.firstName }} {{ topic.user.lastName }} -
            </span>
            <span class="body-3 text-gray mg-left8">
              {{ $store.getters.formatDate(topic.createdAt) }}
            </span>
          </section>
        </header>
        <section
          v-sanitize="topic.content"
          class="main"
        />
        <section class="categories">
          <p
            class="main"
            :style="{'color': $store.getters['categories/getCategoryById'](topic.categoryId).color}"
          >
            <strong>
              {{ $store.getters['categories/getCategoryById'](topic.categoryId).label }}
            </strong>
          </p>
          <ul v-if="topic.categoriesTagged.length > 0">
            <li
              v-for="(category, index) in topic.categoriesTagged"
              :key="index"
              class="tagged"
              :style="{'color': $store.getters['categories/getCategoryById'](category).color}"
            >
              <span>
                {{ $store.getters['categories/getCategoryById'](category).label }}
              </span>
            </li>
          </ul>
        </section>
      </article>

      <section class="topic-stats">
        <span class="body-3 bold mg-right16"> {{ supports.positiveSupports + supports.negativeSupports }} <strong>votos</strong> </span>

        <q-icon
          class="vote-icon mg-top-n8"
          name="far fa-thumbs-up"
          size="xs"
        />
        <span class="body-3 bolder mg-right16"> {{ supportsPercentage(true) }}%</span>

        <q-icon
          class="vote-icon"
          name="far fa-thumbs-down"
          size="xs"
        />
        <span class="body-3 bolder mg-right16"> {{ supportsPercentage(false) }}%</span>

        <!-- <span class="body-3 bolder mg-right16"> votei: {{ myVote.hasBeen }}</span> -->
      </section>

      <!-- participate-area -->
      <section class="participate-area">
        <!-- registered user -->
        <div
          class="participate-content row"
        >
          <div
            v-if="myVote.hasBeen"
            class="row"
          >
            <q-icon
              v-if="myVote.status"
              class="vote-icon"
              name="far fa-thumbs-up"
              size="xs"
            />
            <q-icon
              v-if="!myVote.status"
              class="vote-icon mg-top4"
              name="far fa-thumbs-down"
              size="xs"
            />
            <span
              id="vote-text"
              class="body-2 bolder"
            > {{ myVote.status ? 'Apoiei este Tópico' : 'Não apoiei este Tópico' }} </span>
          </div>

          <div
            v-if="!myVote.hasBeen && isLoggedIn"
            class="row"
          >
            <span class="headline-2 bolder"> Vote, participe! </span>

            <base-button
              class="participate-button"
              theme="secondary"
              @click="confirmSupport(true)"
            >
              <span class="body-3 bolder"> Apoiar </span>
            </base-button>

            <base-button
              class="participate-button"
              theme="secondary"
              @click="confirmSupport(false)"
            >
              <span class="body-3 bolder"> Não apoiar </span>
            </base-button>
          </div>
        </div>

        <q-dialog
          v-model="showConfirmDialog"
          persistent
        >
          <q-card>
            <q-card-section class="row items-center">
              <span class="q-ml-sm">Esta ação é irreversível, deseja continuar?</span>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn
                v-close-popup
                flat
                label="Cancelar"
                color="black"
              />
              <q-btn
                v-close-popup
                flat
                label="Continuar"
                color="red"
                @click="computeSupport()"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </section>

      <section class="replies">
        <!-- topic footer and owner actions -->
        <div class="topic-footer">
          <div class="topic-footer-reply">
            <q-icon name="far fa-comment" />
            <span class="headline-3 text-gray bolder mg-left8">{{ topic.numberOfReplies !== 0 ? `${topic.numberOfReplies} comentário(s)` : 'seja o primero a comentar.' }}</span>
            <!-- <span class="topic-footer-title headline-2 bolder">Comentários</span> -->
          </div>
        </div>

        <div v-if="isLoggedIn">
          <!-- reply-section -->
          <div class="replies-content mg-top16">
            <reply
              v-for="reply in replyes"
              :key="reply.id"
              :reply="reply"
            />
          </div>

          <q-separator />

          <div class="reply-form">
            <reply-form />
          </div>
        </div>
      </section>
      <section
        v-if="!isLoggedIn"
        class="replies-call"
      >
        <router-link
          ref="link"
          :to="{ name: 'SignUp' }"
        >
          Cadastre-se
        </router-link>
        ou
        <router-link
          ref="link"
          :to="{ name: 'SignIn' }"
        >
          faça login
        </router-link>
        para participar do debate!
      </section>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseButton from '../components/BaseButton.vue';
import ReplyForm from '../components/ReplyForm.vue';
import Reply from '../components/Reply.vue';

export default {
  components: {
    BaseButton,
    ReplyForm,
    Reply,
  },
  data() {
    return {
      showConfirmDialog: false,
      support: null,
      isConnected: false,
      socketMessage: '',
      loading: true,
    };
  },
  computed: {
    ...mapGetters({
      topic: 'topics/getCurrentTopic',
      supports: 'topics/supports/getInfoCurrentTopicSupports',
      replyes: 'topics/replies/getCurrentTopicReplyes',
      myVote: 'topics/supports/getMyVoteCurrentTopic',
      isLoggedIn: 'users/isLoggedIn',
      currentUser: 'users/getCurrentUser'
    }),
    owner() {
      if (this.currentUser.id === this.topic.userId) {
        return true;
      }
      return false;
    }
  },
  mounted() {
    this.$store
        .dispatch('topics/loadTopicId', { id: this.$route.params.topicId })
        .then(() => {
          this.$store.dispatch('topics/supports/loadSupportsByTopicId');
          this.$store.dispatch('topics/replies/loadRepliesByTopicId');
          this.$store.dispatch('topics/replies/likes/loadLikesByTopicId');
          this.$store.dispatch('topics/replies/rejoinders/loadRejoindersByTopicId');
          this.loading = false;
        });
  },
  methods: {
    setTopic() {
      this.$store.commit('topics/SET_CURRENT_TOPIC', this.topic);
      this.$store.commit('users/SET_SELECTED_FORM', 'topic-editor');
      this.$store.dispatch('topics/fetchStorage');
      
      this.$router.push('/profile')
    },
    confirmSupport (triggerType){
      this.showConfirmDialog = true;
      this.support = triggerType;
    },
    computeSupport() {
      this.$store.dispatch('topics/supports/supportCurrentTopic', { supportType: this.support, $socket: this.$socket })
    },
    supportsPercentage(type) {
      const posAmount = parseInt(this.supports.positiveSupports, 10);
      const negAmount = parseInt(this.supports.negativeSupports, 10);
      const totalSupports = parseInt(posAmount + negAmount, 10);
      if (!totalSupports) {
        return 0;
      }
      if (type === true) {
        return parseInt((posAmount / totalSupports) * 100, 10);
      }
      return parseInt((negAmount / totalSupports) * 100, 10);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/variables.scss';
@import '../styles/mixins.scss';

.topic-page {
  @include centered-column;
  background-color: white;
  max-width: 800px;
  padding-bottom: 72px;
}

p {
  margin-bottom: 8px;
}

.header {
  width: 100%;
  margin: 0px 0px 8px 0px;
}

.reset-btn {
  margin-top: 8px !important;
  width: 180px;
  padding-left: 0px !important;
}

.multicolor-line-top {
  height: 3px;
  margin-top: 4px;
}

.topic-wrapper {
  width: 100%;
}

.topic-content {
  margin: 16px 0px 0px 0px;

  h2 {
    margin: 0;
  }

  section.main {
    margin: 32px 0;
  }
}

.action {
  display: flex;
  justify-content: space-between;

  .edit-icon {
    cursor: pointer;
  }
}

.categories {
  font-size: 1em;
  margin-bottom: 32px;
  text-align: right;

  p {
    margin-bottom: 0;
  }

  ul, li {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  ul {
    max-width: 300px;
    margin-left: auto;
  }

  li {
    padding-left: 10px;
    display: inline-block;
  }

  .tagged {
    font-size: .8em;
  }
}

.topic-stats {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 4px;
  border-bottom: 1px solid $borderGray;
}

.participate-content {
  position: relative;
  align-self: flex-end;
  align-items: center;
  justify-content: flex-end;
}

.participate-area {
  width: 100%;
  padding: 8px;
  position: relative;
}

#vote-text {
  color: black;
  margin: 0px 0px 0px 0px;
  text-align: end;
}

.participate-button {
  margin-left: 8px;
}

.vote-icon {
  color: black;
  margin-right: 8px;
  margin-left: 16px;
}

.positive-support {
  color: #254C26 !important;
}

.negative-support {
  color: #AD3B3B !important;
}

#vote-span1, #vote-span2 {
  color: black;
}

.topic-footer {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  margin-top: 0px;
  padding: 8px 8px 4px 0px;
  border-bottom: 1px solid $borderGray;
}

.topic-footer-reply {
  width: 50%;
  display: flex;
  justify-items: flex-end;
  align-items: center;
}

.topic-footer-title {
  margin-left: 8px;
  color: $gray4;
}

.action-buttons {
  display: none;
  width: 50%;
}

.user-button {
  color: #fff;
  cursor: pointer;
}

.reset-button {
  height: 35px;
  margin-right: 16px;
}

.scroll-area {
  height: 700px;
  width: 100%;
  padding-right: 16px;
  margin-top: 8px;
}

.reset-reply-icon {
  font-size: 12px;
}

.replies-call,
.replies {
  width: 100%;
}

.reply-icon {
  margin-right: 3px;
}

.reply {
  border-top: 1px solid #F0F0F0;
  padding: 30px 0;
}

.replies-call {
  padding-top: 32px;

  a {
    color: black;
  }
}

</style>
