<template>
  <div class="topic-view">
    <!-- header -->
    <div class="header">
      <logo
        class="identity"
        :black-mode="true"
      />

      <base-button
        class="reset-btn mg-top8"
        theme="flat"
        :to="{ name: 'Topics' }"
      >
        <i class="fas fa-arrow-left text-black" />
        <span class="caption bolder mg-left8 text-black"> voltar aos debates </span>
      </base-button>

      <!-- <multicolor-line class="multicolor-line-top"/> -->
    </div>

    <!-- delete field -->
    <base-confirm-dialog
      v-if="false"
      class="confirm-dialog"
      confirm-button-title="delete"
      dismiss-button-title="cancel"
      @dismiss="showConfirmDialog = false"
      @confirm="$emit('delete')"
    >
      <template #title>
        Delete this topic?
      </template>
      <template #default>
        You cannot undo this action.
      </template>
    </base-confirm-dialog>

    <!-- topic -->
    <div class="topic-content">
      <span class="big-title bolder"> {{ topic.title }} </span>
      <multicolor-line class="multicolor-line-top" />

      <div class="author row mg-top8">
        <!-- <span class="body-3 bolder text-gray"> {{ topic.user.name }} </span>  -->
        <span class="body-3 text-gray mg-left8"> - </span>
        <span class="body-3 text-gray mg-left8"> {{ $store.getters.formatDate(topic.createdAt) }} </span>
      </div>

      <p class="body-2 mg-top32">
        {{ topic.content }}
      </p>
    </div>

    <div class="topic-stats">
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
    </div>

    <!-- participate-area -->
    <div class="participate-area">
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
          v-if="!myVote.hasBeen"
          class="row"
        >
          <span class="headline-2 bolder"> Vote, participe! </span>

          <base-button
            class="participate-button"
            theme="secondary"
            @click="supportThis(true)"
          >
            <!-- <q-icon class="vote-icon" :class="{ 'positive-support': myVote.status }"  name="far fa-thumbs-up" size="xs"></q-icon> -->
            <span class="body-3 bolder"> Apoiar </span>
          </base-button>

          <base-button
            class="participate-button"
            theme="secondary"
            @click="supportThis(false)"
          >
            <!-- <q-icon class="vote-icon" :class="{ 'negative-support': !myVote.status }" name="far fa-thumbs-down" size="xs"></q-icon> -->
            <span class="body-3 bolder"> Não apoiar </span>
          </base-button>
        </div>
      </div>
    </div>

    <!-- topic footer and owner actions -->
    <div class="topic-footer">
      <div class="topic-footer-reply">
        <q-icon name="far fa-comment" />
        <span class="headline-3 text-gray bolder mg-left8">{{ replyes.length !== 0 ? `${replyes.length} comentários` : 'seja o primero a comentar.' }}</span>
        <!-- <span class="topic-footer-title headline-2 bolder">Comentários</span> -->
      </div>

      <div class="action-buttons">
        <!-- botao editar -->
        <base-button
          v-if="false"
          class="user-button mg-left8"
          :to="{ name: 'EditTopic', params: { topicId: topic.id } }"
        >
          <i class="fas fa-pencil-alt reply-icon" />
          <span class="body-3 bolder mg-left8"> Editar </span>
        </base-button>

        <!-- v-if cond = > && currentUser && currentUser.canDeleteTopic(topic) -->
        <base-button
          v-if="false"
          class="user-button mg-left8"
          @click="showConfirmDialog = true"
        >
          <i class="fas fa-trash reply-icon" />
          <span class="body-3 bolder mg-left8"> Excluir </span>
        </base-button>
      </div>
    </div>

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
</template>

<script>
import { mapGetters } from 'vuex';
import BaseButton from './BaseButton.vue';
import BaseConfirmDialog from './BaseConfirmDialog.vue';
import ReplyForm from './ReplyForm.vue';
import Reply from './Reply.vue';
import Logo from './Logo.vue';

export default {
  components: {
    Logo,
    BaseButton,
    BaseConfirmDialog,
    ReplyForm,
    Reply,
  },
  data() {
    return {
      showConfirmDialog: true,
    };
  },
  computed: {
    ...mapGetters({
      currentUser: 'users/getCurrentUser',
      topic: 'topics/getCurrentTopic',
      supports: 'topics/supports/getInfoCurrentTopicSupports',
      replyes: 'topics/replies/getCurrentTopicReplyes',
      myVote: 'topics/supports/getMyVoteCurrentTopic',
    }),
  },
  mounted() {
    this.$store.dispatch('topics/loadTopicId', { id: this.$route.params.topicId })
      .then(() => {
        this.$store.dispatch('topics/supports/loadSupportsByTopicId');
        this.$store.dispatch('topics/replies/loadRepliesByTopicId');
        this.$store.dispatch('topics/replies/likes/loadLikesByTopicId');
        this.$store.dispatch('topics/replies/rejoinders/loadRejoindersByTopicId');
      });
  },
  methods: {
    supportThis(triggerType) {
      this.$store.dispatch('topics/supports/supportCurrentTopic', { supportType: triggerType })
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

.topic-view {
  background: #fff;
  border-radius: 3px;
  padding: 0px 32px;
  // border: 2px solid red;
  max-width: 800px;
}

.header {
  width: 100%;
  margin: 0px 0px 8px 0px;
}

// .identity {
//   position: absolute;
//   top: 32px;
//   left: 32px;
// }

.reset-btn {
  margin-top: 8px !important;
  width: 180px;
  padding-left: 0px !important;
}

.multicolor-line-top {
  height: 3px;
  margin-top: 4px;
}

.topic-content {
  margin: 16px 0px 0px 0px;
}

p {
  margin: 16px 0px;
}

.topic-stats {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 4px;
  // margin-bottom: 8px;
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
  // display: flex;
  // flex-direction: row-reverse;
  // align-items: flex-end;
  // justify-items: flex-end;
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

.reply-icon {
  margin-right: 3px;
}

.reply {
  border-top: 1px solid #F0F0F0;
  padding: 30px 0;
}

</style>
