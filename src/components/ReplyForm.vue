<template>
  <div class="reply-form">

    <span class="body-2 bolder">Deixe seu comentário</span>
    <!-- <q-separator/> -->

    <div class="reply-content">

      <reply-tag v-if="replyToTag != null" :replyTag="replyToTag"/>

      <q-input
        v-model="content"
        ref="input"
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
          @click="cancel"
          :theme="this.content !== '' ? 'secondary' : 'disabled'"
        >
          <span class="caption bolder"> Cancelar </span>
        </base-button>

        <base-button
          class="reply-button"
          @click="reply"
          theme="primary"
        >
          <span class="caption bolder"> {{ loading ? 'Comentando...' : 'Comentar' }} </span>
        </base-button>

      </div>

    </div>

  </div>
</template>

<script>
// import { mapActions } from 'vuex';
import { required } from 'vuelidate/lib/validators';

import BaseButton from './BaseButton.vue';
import ReplyTag from './ReplyTag.vue';

export default {
  components: {
    BaseButton,
    ReplyTag,
  },
  data() {
    return {
      content: '',
      loading: false,
    };
  },
  props: {
    replyToTag: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  validations: {
    content: { required },
  },
  methods: {
    reply() {
      this.$v.$touch();
      if (!this.$v.$anyError && this.content !== '') {
        this.loading = true;
        let tagId = null;
        if (this.replyToTag != null) {
          tagId = this.replyToTag.id;
        }
        const newReply = { content: this.content, replyTag: tagId };
        this.$store.dispatch('topics/addReply', { data: newReply })
          .then(() => {
            this.content = '';
            // this.replyToTag = {};
            this.$v.$reset();
            this.loading = false;
          })
          .catch((error) => {
            console.log(error);
            this.loading = false;
            // this.replyToTag = {};
          });
      }
    },
    cancel() {
      // this.replyToTag = {};
      this.content = '';
    },
    focus() {
      this.$refs.input.focus();
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
