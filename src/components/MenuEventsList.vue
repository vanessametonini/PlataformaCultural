<template>
  <ol class="recent-events">
    <li
      v-for="event in listEvents" 
      :key="event.id" 
      clickable 
      @click="openEvent(event.id)"
    >
      <div class="col1">
        <span class="day">{{ event.day }}</span>
        <span class="month">{{ event.month }}</span>
      </div>
      <div
        class="col2" 
        :aria-label="event.title" 
        :title="event.title"
      >
        <span>{{ event.title }}</span>
        <span class="caption">{{ event.site }}</span>
      </div>
    </li>
  </ol>
</template>

<script>
export default {
  name: 'MenuEventsList',
  computed: {
    listEvents() {
      return this.$store.getters['events/getRecents'];
    },
  },
  methods: {
    async openEvent(eventId) {
      this.$router.push({
        name: "Agenda",
        hash: `#${eventId}`
      });
    },
  },
}
</script>

<style lang="scss" scoped>

.recent-events {

  font-size: .9rem;
  margin: 0 0 10px 0;
  padding: 0;

  li {
    border-bottom: 1px solid black;
    display: flex;
    cursor: pointer;
    line-height: 1.3em;
    list-style-type: none;
    margin-bottom: 10px;
    padding-bottom: 8px;

    span {
      display: block;
      hyphens: auto;
    }

    &:last-child {
      border-bottom: 0;
      padding-bottom: 0;
    }

  }

  .col1 {
    margin-right: 10px;
    padding-top: 4px;
    width: 30px;
  }

  .month {
    letter-spacing: .1em;
  }

  .day {
    font-weight: bold;
    font-size: 1.6em;
  }

  .col2 {
    width: calc(100% - 40px);
  }
}
</style>
