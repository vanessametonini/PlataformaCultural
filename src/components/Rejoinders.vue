<template>
  <div>
    <q-separator />
    <div
      v-for="rejoinder in rejoinders"
      :key="rejoinder.id"
      class="reply-component row no-wrap"
    >
      <div class="avatar">
        <base-avatar :avatar="rejoinder.user.avatarId" />
      </div>

      <div class="reply-container column">
        <!-- <div class="left-line" /> -->

        <div class="reply-header">
          <div class="author-right">
            <span
              class="caption bolder"
            >{{ `${rejoinder.user.firstName} ${rejoinder.user.lastName}` }}
            </span>
            <span class="caption bold mg-left8">
              {{ $store.getters.formatDate(rejoinder.createdAt) }}
            </span>
          </div>
          <div>
            <q-btn
              v-if="$store.getters['users/getCurrentUser'].id === rejoinder.userId"
              flat
              round
              color="gray"
              icon="delete"
              size="10px"
              @click="deleteRejoinder(rejoinder)"
            />
          </div>
        </div>
        <span class="reply-content body-3"> {{ rejoinder.content }} </span>
      </div>
    </div>
    <div>
      <rejoinder-form :reply="reply" />
    </div>
  </div>
</template>

<script>
import RejoinderForm from "./RejoinderForm.vue";
import BaseAvatar from "./BaseAvatar.vue";

export default {
  name: "Rejoinder",
  components: {
    RejoinderForm,
    BaseAvatar,
  },
  props: {
    reply: {
      type: Object,
      default: () => ({}),
    },
    rejoinders: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  computed: {},
  created() {
    console.log("rejoinders: ", this.rejoinders);
  },
  methods: {
    deleteRejoinder(rejoinder) {
      this.$q.notify({
        type: "warning",
        textColor: "black",
        position: 'top-right',
        message: "Tem certeza que deseja excluir essa resposta?",
        actions: [
          {
            label: "Sim",
            color: "black",
            handler: () => this.$store.dispatch('topics/replies/rejoinders/deleteRejoinder', { rejoinder, reply: this.reply, $socket: this.$socket }),
          },
          { label: "Não", color: "black", handler: () => {} },
        ],
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";
@import "../styles/mixins.scss";
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
.reply-content {
  padding: 8px 8px 8px 8px;
  line-height: 1.7;
  border-top: 0px;
}
.reply-tag {
  padding: 0px;
  margin-bottom: 8px;
  background-color: $gray1;
  position: relative;
  width: 100%;
}

.left-line {
  width: 4px;
  background-color: $borderGray;
  position: relative;
  top: 0px;
  left: 0px;
}
.reply-container {
  margin-left: 8px;
  background-color: #fff;
  width: 100%;
  border: 1px solid $borderGray;
  border-radius: 0px;
}
.reply-content {
  padding: 8px;
}
</style>
