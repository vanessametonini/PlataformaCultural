<template>
  <div class="reply-component row no-wrap">
    <div class="avatar">
      <base-avatar :avatar="reply.user.avatarId" />
    </div>

    <div class="reply-container column">
      <!-- reply author and current-user-action -->
      <div class="reply-header">
        <div class="author-right">
          <span class="author-name body-3 bolder">
            {{ `${reply.user.firstName} ${reply.user.lastName}` }}
          </span>
          <span class="date caption bold">
            {{ $store.getters.formatDate(reply.createdAt) }}
          </span>
        </div>
        <div>
          <q-btn
            v-if="$store.getters['users/getCurrentUser'].id === reply.userId"
            flat
            round
            color="gray"
            icon="delete"
            size="10px"
            @click="deleteReply()"
          />
        </div>
      
        <!-- reply-this and like -->
        <div class="action-replying row">
          <base-button
            class="reply-button"
            theme="transparent"
            @click="comment = !comment"
          >
            <span class="caption bolder" style="color: black">{{
              comment ? "ocultar comentários" : "ver comentários"
            }}</span>
          </base-button>

          <q-rating
            v-model="like"
            max="1"
            size="1.3em"
            color="red"
            color-selected="red-9"
            icon="favorite_border"
            icon-selected="favorite"
            no-dimming
          />

          <span class="caption bolder no-pointer text-black mg-left8">{{
            numberOfReplyLikes(reply.id)
          }}</span>
        </div>
        <!-- end reply action -->
      </div>

      <!-- this reply -->
      <div class="reply-content body-3">
        <template v-if="!editing">
          <span class="body-2 bolder">{{ reply.content }}</span>
          <rejoinders
            v-if="comment"
            :rejoinders="rejoinders(reply.id)"
            :reply="reply"
          />
          <!-- <div>
            <span class="content-text">formulário de resposta</span>
          </div> -->
        </template>

        <!-- edit -->
        <template v-else>
          <!-- <span class="content-text">{{ reply.content }}</span> -->
          <q-input
            v-model="content"
            class="mg-top8"
            :disabled="loading"
            :label="reply.content"
            filled
            square
            autogrow
            dense
          />

          <div class="action-editing">
            <base-button
              class="cancel-button"
              theme="secondary"
              @click="editing = false"
            >
              <span class="caption bolder">Cancelar</span>
            </base-button>

            <base-button
              class="save-button"
              theme="primary"
              :disabled="loading"
              @click="editReply"
            >
              <span class="caption bolder">
                {{ loading ? "Salvando..." : "Salvar" }}
              </span>
            </base-button>
          </div>
        </template>
      </div>
      <!-- end reply -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import BaseConfirmDialog from './BaseConfirmDialog.vue';
import BaseAvatar from "./BaseAvatar.vue";
import BaseButton from "./BaseButton.vue";
import Rejoinders from "./Rejoinders.vue";

export default {
  components: {
    BaseAvatar,
    BaseButton,
    Rejoinders,
    // BaseConfirmDialog,
  },
  props: {
    reply: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ["call-reply"],
  data() {
    return {
      showConfirmDialog: false,
      content: "",
      editing: false,
      loading: false,
      comment: false,
      deleteAction: false,
      liked: false,
    };
  },
  computed: {
    like: {
      get() {
        return this.myLike(this.reply.id).length;
      },
      set() {
        if (this.myLike(this.reply.id).length) {
          this.$store.dispatch("topics/replies/likes/removeLike", {
            reply: this.reply,
            like: this.myLike(this.reply.id)[0],
            $socket: this.$socket,
          });
        } else {
          this.$store.dispatch("topics/replies/likes/createLike", {
            reply: this.reply,
            $socket: this.$socket,
          });
        }
      },
    },
    ...mapGetters({
      currentUser: "users/getCurrentUser",
      numberOfReplyLikes: "topics/replies/likes/getNumberOfReplyLikes",
      myLike: "topics/replies/likes/getMyLikeCurrentTopicByReplyId",
      rejoinders:
        "topics/replies/rejoinders/getMyRejoindersCurrentTopicByReplyId",
    }),
    hasBeenLiked() {
      return 0;
      // return this.myLikes.some((el) => el.replyId === this.reply.id);
    },
  },
  created() {
    console.log(this.myLike(this.reply.id));
  },
  methods: {
    deleteReply() {
      this.$q.notify({
        type: "warning",
        textColor: "black",
        message: "Tem certeza que deseja excluir esse comentário?",
        actions: [
          {
            label: "Sim",
            color: "black",
            handler: () => this.$store.dispatch('topics/replies/deleteReply', { reply: this.reply, $socket: this.$socket, $q: this.$q }),
          },
          { label: "Não", color: "black", handler: () => {} },
        ],
      });
    },
    editReply() {
      this.loading = true;
    },
    likeReply() {
      if (this.myLike(this.reply.id).length) {
        this.$store.dispatch("topics/replies/likes/removeLike", {
          replyId: this.reply.id,
        });
      } else {
        this.$store.dispatch("topics/replies/likes/createLike", {
          replyId: this.reply.id,
        });
      }
    },
    canEditTopic() {
      if (
        this.currentUser !== null &&
        this.currentUser?.user?.id === this.reply?.user?.id
      ) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";
@import "../styles/mixins.scss";

$primaryColor: #000;
$textBlack: #000;

$textBlack: #000;

.reply-component {
  margin: 8px 0px 24px 0px;
}

.reply-header {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  position: relative;
  background-color: $gray1;
  padding: 4px 8px 4px 8px;
  max-height: 32px;
  width: 100%;
}

.author-right {
  // width: 40%;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  max-height: 24px;
}

.author-name {
  color: $textBlack;
  margin-right: 8px;
  margin-top: 0px;
}

.date {
  color: $textBlack;
  text-align: end !important;
  line-height: 20px;
}

.owner-actions {
  position: absolute;
  right: 8px !important;
  display: flex;
  align-items: center;
  justify-self: flex-end;
}

.action-icon {
  margin-left: 16px;
  color: $primaryColor;
  cursor: pointer;
}

.no-pointer {
  cursor: default;
}

.liked {
  color: #c95b40;
}

.reply-container {
  margin-left: 8px;
  background-color: #fff;
  width: 100%;
  border: 1px solid $borderGray;
  border-radius: 0px;
}

.reply-content {
  padding: 8px 8px 8px 8px;
  line-height: 1.7;
  border-top: 0px;
}

.content-text {
  color: $textBlack;
  margin-left: 4px;
}

.action-editing {
  padding: 8px 8px 8px 0px;
}

.save-button {
  margin-right: 8px;
  background-color: #222;
  padding: 4px 12px;

  &:hover {
    cursor: pointer;
  }
}

.cancel-button {
  margin-right: 8px;
  padding: 2px 12px;

  &:hover {
    cursor: pointer;
  }
}

.action-replying {
  flex-wrap: nowrap;
  align-items: center;
  overflow: hidden;
  position: absolute;
  right: 8px !important;
}

.reply-button {
  &:hover {
    cursor: pointer;
  }
}
</style>
