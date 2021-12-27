<template>
  <div>
    <pin-form v-if="form === 'pin'" />
    <event-form v-if="form === 'event'" />
    <topic-creator v-if="form === 'topic'"/>
  </div>
</template>

<script>
import PinForm from "../../../../components/PinForm.vue";
import EventForm from "../../../../components/EventForm.vue";
import TopicCreator from "../../../../components/TopicCreator.vue";


export default {
  name: "Service",
  components: {
    PinForm,
    EventForm,
    TopicCreator
  },
  data() {
    return {
      form: null,
    };
  },
  mounted() {
    switch (this.$route.params.service) {
      case "pins":
        this.form = "pin";
        break;
      case "events":
        this.form = "event";
        break;
      case "topics":
        this.form = "topic";
        break;
      default:
          this.form = null;
        break;
    }
  },
};
</script>
