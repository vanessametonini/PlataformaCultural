<template>
  <div>
    <q-separator />
    <div class="reply-form">
      <span class="caption bolder">Deixe seu comentário</span>
      <div class="reply-content">
        <q-input
          ref="input"
          v-model="content"
          class="text-area"
          placeholder="Escreva aqui..."
          :errors="$v.content"
          :disabled="loading"
          square
          dense
        />

        <div class="row no-wrap mg-top8">
          <base-button
            class="reply-button cancel-button"
            :theme="content !== '' ? 'secondary' : 'disabled'"
            @click="cancel"
          >
            <span class="caption bolder"> Cancelar </span>
          </base-button>

          <base-button
            class="reply-button"
            theme="primary"
            @click="rejoin"
          >
            <span class="caption bolder"> {{ loading ? 'Comentando...' : 'Comentar' }} </span>
          </base-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapActions } from 'vuex';
// import { createHelpers } from 'vuex-map-fields';
import { required } from 'vuelidate/lib/validators';
import BaseButton from './BaseButton.vue';

// const { mapFields } = createHelpers({
//   getterType: 'topics/rejoinders/getField',
//   mutationType: 'topics/rejoinders/updateField',
// });

export default {
  components: {
    BaseButton,
  },
  props: {
    reply: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  validations: {
    content: { required },
  },
  computed: {
    content: {
      get() {
        return this.$store.getters['topics/replies/rejoinders/getRejoinderFormByReplyId'](this.reply.id);
      },
      set(value) {
        this.$store.commit('topics/replies/rejoinders/SET_REJOINDER_FORM_BY_REPLY_ID', { replyId: this.reply.id, content: value });
      },
    },
  },
  created() {},
  methods: {
    rejoin() {
      this.loading = true;
      this.$v.$touch();
      if (!this.$v.$anyError && this.content !== '') {
        this.$store.dispatch('topics/replies/rejoinders/addRejoinder', { data: { replyId: this.reply.id, content: this.content }, $socket: this.$socket }).then(() => {
          this.content = '';
          this.$v.$reset();
          this.loading = false;
        });
      } else {
        this.loading = false;
      }
    },
    cancel() {
      this.content = '';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/variables.scss';

.reply-form {
  display: flex;
  // justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  margin: 16px 0px 32px 0px;
  width: 100%;
}

.reply-content {
  border: 1px solid $borderGray;
  width: 100%;
  padding: 8px;
  margin-top: 4px;
}

.text-area {
  margin-top: 0px;
  width: 100%;
}

.reply-button {
  align-self: flex-start;
  margin-top: 8px;
}

.cancel-button {
  margin-right: 8px;
  padding: 6px;

  &:hover {
    cursor: pointer;
  }
}

</style>
