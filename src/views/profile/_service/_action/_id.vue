<template>
  <div>
    <user-form v-if="form === 'user'" />
    <pin-editor v-if="form === 'pin-editor'" />
    <topic-editor v-if="form === 'topic-editor'" />
    <event-editor v-if="form === 'event-editor'" />
  </div>
</template>

<script>
import UserForm from "../../../../components/UserForm.vue";
import PinEditor from "../../../../components/PinEditor.vue";
import TopicEditor from "../../../../components/TopicEditor.vue";
import EventEditor from "../../../../components/EventEditor.vue";

export default {
  name: "Service",
  components: {
    UserForm,
    PinEditor,
    TopicEditor,
    EventEditor,
  },
  data() {
    return {
      form: null,
    };
  },
  mounted() {
    switch (this.$route.params.service) {
      case "pins":
        this.form = "pin-editor";
        break;
      case "events":
        this.form = "event-editor";
        break;
      case "topics":
        this.form = "topic-editor";
        break;
      case "user":
        this.form = "user";
        break;
      default:
          this.form = null;
        break;
    }
  },
};
</script>
