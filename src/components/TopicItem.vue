<template>
  <!-- item to be selected in topics-page -->
  <div class="topic-item" @click="emitThisTopic()" :style="{ 'background-color': category.color }">

    <div class="card column">
      <!-- <span id="category-label" class="headline-3 bolder"> {{ category.label }} </span> -->

      <span id="title" class="big-title bolder"> {{ topic.title }} </span>

      <span class="caption bolder mg-top16"> {{ category.label }} </span>
      <!-- topicOwner & date -->
      <div class="row al-items-center mg-top8">

        <span class="body-3 bolder"> {{ topic.user.name }} </span>

        <span class="caption bold mg-left16"> {{ formatDate }} </span>

      </div>

      <span class="caption bold mg-top16"> {{ formatDescription }} </span>

      <div class="row no-wrap justify-between mg-top32">
        <span class="caption bolder"> {{ topic.positiveSupports + topic.negativeSupports }} votos </span>

        <div class="stats-item">
          <!-- <q-icon class="vote-icon" name="far fa-thumbs-down" size="xs"></q-icon> -->
          <i class="far fa-thumbs-up"></i>
          <span class="caption bolder"> {{ supportsPercentage(true) }}% </span>
        </div>

        <div class="stats-item">
          <q-icon class="vote-icon" name="far fa-thumbs-down" size="xs"></q-icon>
          <span class="caption bolder"> {{ supportsPercentage(false) }}% </span>
        </div>

        <span class="caption bolder"> {{ topic.numberOfReplies }} comentários </span>
      </div>

      <!-- <div class="row mg-top8">
        <span class="caption bolder"> {{ topic.positiveSupports + topic.negativeSupports }} votos </span>
        <span class="caption bolder mg-left8"> {{ topic.numberOfReplies }} comentários </span>
      </div> -->

    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'topicItem',
  data() {
    return {
      category: {
        label: '',
        value: '0',
        color: '#000',
      },
    };
  },
  props: {
    topic: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    ...mapGetters({
      options: 'categories/loadCategories',
    }),
    formatDate() {
      const d = new Date(this.topic.createdAt);
      const monthNames = ['Jan', 'Fev', 'Mar', 'Abril', 'Maio', 'Junho', 'Julho', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
      const month = monthNames[d.getMonth()];
      let day;
      if (d.getDate().toString().length === 1) {
        day = `0${d.getDate()}`;
      } else {
        day = d.getDate();
      }
      return `${day} de ${month}`;
    },
    formatDescription() {
      const limit = 150;
      const str = this.topic.content;
      if (str.length > limit) {
        return str.substring(0, limit).concat('...');
      }
      return this.topic.description;
    },
  },
  mounted() {
    this.setCategory();
  },
  methods: {
    ...mapActions('topics', [
      'localLoadCurrentTopic',
      'localLoadCurrentTopicReplyes',
    ]),
    setCategory() {
      const vm = this;
      const el = this.options.find((item) => item.value === vm.topic.categoryId.toString());
      this.category = el;
    },
    async emitThisTopic() {
      console.log('topicItem/emitThisTopic', this.topic.id);
      await this.localLoadCurrentTopic({ topicId: this.topic.id });
      await this.localLoadCurrentTopicReplyes({ topicId: this.topic.id });
      this.$router.push({ name: 'TopicPage', params: { topicId: this.topic.id } });
    },
    supportsPercentage(type) {
      const posAmount = parseInt(this.topic.positiveSupports, 10);
      const negAmount = parseInt(this.topic.negativeSupports, 10);
      const totalSupports = parseInt(posAmount + negAmount, 10);
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

* {
  font-family: 'Helvetica';
  box-sizing: border-box;
}

.topic-item {
  overflow: hidden;
  width: 350px;
  margin: 0px 4px 8px 0px;
  transition: 0.2s ease-in;

  @include for-phone-only {
    width: 350px;
    margin: 8px 4px 24px 4px;
  }

  &:hover {
    cursor: pointer;
  }
}

.card {
  padding: 32px;
  position: relative;
}

#category-label {
  position: absolute;
  top: 16px;
}

#title {
  margin-left: -4px;
  margin-top: 0px;
  line-height: 2.3rem;
}

.line-h16 {
  line-height: 1em;
}

.img-box {
  display: none;
  padding: 0px;
  margin: 0px;
  width: 100%;
  max-height: 250px;
  overflow: hidden;

  .img {
    height: auto;
    width: 100%;
  }
}

span {
  color: white;
}

.link {
  text-decoration: none;
  color: white;
}

.vote-icon {
  color: black;
  margin-right: 4px;
}

</style>
