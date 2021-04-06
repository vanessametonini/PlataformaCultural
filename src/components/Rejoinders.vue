<template>
  <div>
    <div
      v-for="rejoinder in rejoinders"
      :key="rejoinder.id"
    >
      <div class="reply-tag row no-wrap">
        <div class="left-line" />
        <div class="avatar">
          <base-avatar
            :avatar="rejoinder.user.avatarId"
          />
        </div>
        <div class="reply-content column">
          <div class="row">
            <span class="caption bolder">{{ `${rejoinder.user.firstName} ${rejoinder.user.lastName}` }} </span>
            <span class="caption bold mg-left8"> {{ $store.getters.formatDate(rejoinder.createdAt) }} </span>
          </div>

          <span class="caption bold"> {{ rejoinder.content }} </span>
        </div>
      </div>
    </div>
    <rejoinder-form :reply="reply" />
  </div>
</template>

<script>
import RejoinderForm from './RejoinderForm.vue';
import BaseAvatar from './BaseAvatar.vue';

export default {
  name: 'Rejoinder',
  components: {
    RejoinderForm,
    BaseAvatar
  },
  props: {
    reply: {
      type: Object,
      default: () => ({}),
    },
    rejoinders: {
      type: Array,
      default: () => ([]),
    },
  },
  data() {
    return {
    };
  },
  computed: {},
  methods: {},
  created(){
    console.log('rejoinders: ', this.rejoinders);
  }
};
</script>

<style lang="scss" scoped>
@import '../styles/variables.scss';
@import '../styles/mixins.scss';

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

.reply-content {
  padding: 8px;
}

</style>
