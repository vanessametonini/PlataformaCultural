<template>
  <div class="reply-tag row no-wrap">
    <div class="left-line" />

    <div class="reply-content column">
      <div class="row">
        <span class="caption bolder">{{ replyTag.user.name }} </span>
        <span class="caption bold mg-left8"> {{ formatDate }} </span>
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
  computed: {
    formatDate() {
      const d = new Date(this.replyTag.createdAt);
      const monthNames = ['Jan', 'Fev', 'Mar', 'Abril', 'Maio', 'Junho', 'Julho', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
      const month = monthNames[d.getMonth()];
      const year = d.getFullYear();
      let day;
      if (d.getDate().toString().length === 1) {
        day = `0${d.getDate()}`;
      } else {
        day = d.getDate();
      }
      return `${day} de ${month} de ${year}`;
    },
  },
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
