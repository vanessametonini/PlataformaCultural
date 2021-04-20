<template>
  <div class="logo-box">
    <div class="top">
      <h1
        class="title"
        
      >
      Meus Debates
      </h1>
    </div>
    <q-scroll-area
      :thumb-style="thumbStyle"
      :bar-style="barStyle"
      style="height: 100px; max-width: 300px"
    >
      <q-list>
        <q-item
          v-for="topic in $store.getters['topics/getMyTopics']"
          :key="topic.id"
          clickable
          v-ripple
          @click="emitThisTopic(topic)"
        >
          <q-item-section>
            <q-item-label class="text-white" overline>{{
              mask(topic.title)
            }}</q-item-label>
            <q-item-label>{{ mask(topic.content) }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex';

export default {
  name: "EventCard",
  props: {},
  emits: ["emit-logout"],
  data() {
    return {
      thumbStyle: {
        right: "4px",
        borderRadius: "5px",
        backgroundColor: "#027be3",
        width: "5px",
        opacity: 0.75,
      },
      barStyle: {
        right: "2px",
        borderRadius: "9px",
        backgroundColor: "#027be3",
        width: "9px",
        opacity: 0.2,
      },
    };
  },
  computed: {},
  created() {
    console.log(this.$store.getters["events/getMyEvents"]);
  },
  methods: {
    mask(text){
      const limit = 15;
      if (text.length>limit) return text.substring(0, limit)+'...';
      return text;
    },
    async emitThisTopic(topic) {
      // this.$store.commit("topics/SET_CURRENT_TOPIC", topic);
      this.$router.push({
        name: "TopicPage",
        params: { topicId: topic.id },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/variables.scss';
@import '../styles/mixins.scss';

* {
  box-sizing: border-box;
}

.logo-box {
  background-color: black;
  display: flex;
  color: white;
  cursor: pointer;
  flex-direction: column;
  height: 180px;
  justify-content: space-between;
  max-width: 300px;
  padding: 16px;
  position: relative;
  overflow: hidden;
  width: 100%;

  &.white {
    background-color: white;
    color: black;

    .line {
      background-color: black;
    }
  }

  @include for-tablet-landscape-up {
    height: 200px;
    max-width: 200px;
  }

  @include for-big-desktop-up {
    height: 225px;
    max-width: 225px;
  }

}

.logo-box .title {
  font-size: 1.8m;
  font-weight: bold;
  line-height: initial;
  margin: 0;

  @include for-tablet-landscape-up {
    font-size: 2.2em;
  }

  @include for-big-desktop-up {
    font-size: 2.5em;
  }
}

.bottom {
  flex-wrap: nowrap;
  line-height: initial;
  width: 80%;
}

.forum-info {
  font-size: 0.8em;
  font-weight: 700;
  line-height: initial;
  margin: 0;

  @include for-tablet-landscape-up {
    font-size: 1em;
  }

  @include for-big-desktop-up {
    font-size: 1.1em;
  }
}

.sub-info {
  font-weight: 700;
  font-size: 0.7em;
  letter-spacing: 0.05em;

  @include for-tablet-landscape-up {
    font-size: 0.8em;
  }

  @include for-big-desktop-up {
    font-size: 0.8em;
    letter-spacing: 0.08em;
  }

}

.line {
  background-color: white;
  height: 2px;
  margin-top: 4px;
  margin-bottom: 4px;
  width: 100%;
}

</style>
