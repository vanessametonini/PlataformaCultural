<template>
  <ol class="recent-debates">
    <li
      v-for="topic in listTopics" 
      :key="topic.id"
    >
      <h6>
        <router-link
          :to="{ path: `/topics/${topic.id}` }"
        >
          {{ topic.title }}
        </router-link>
      </h6>
    </li>
  </ol>
</template>

<script>
export default {
    name: 'MenuTopicsList',
    computed: {
      listTopics() {
        return this.$store.getters['topics/getRecents'];
      },
  },
}
</script>

<style lang="scss" scoped>

.recent-debates {
  margin: 0 0 10px 0;
  padding: 0;

  li {
    border-bottom: 1px solid black;
    list-style-type: none;
    margin-bottom: 10px;
    padding-bottom: 10px;
  }

  li:last-child {
    border-bottom: 0;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  h6 {
    margin: 0;
    font-size: 1em;
    line-height: 1.2em;
    font-weight: normal;

    a {
      color: black;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
