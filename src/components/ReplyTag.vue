<template>
  <div class="reply-tag row no-wrap">
    <div class="left-line" />

    <div class="reply-content column">
      <div class="row">
        <span class="caption bolder">{{ replyTag.user.name }} </span>
        <span class="caption bold mg-left8"> {{ $store.getters.formatDate(replyTag.createdAt) }} </span>
      </div>

      <span class="caption bold"> {{ replyTag.content }} </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReplyTag',
  props: {
    replyTag: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
    };
  },
  computed: {},
  methods: {},
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
