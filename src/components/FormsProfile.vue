<template>
  <div>
    <pin-form v-if="form === 'pin'" />
    <event-form v-if="form === 'event'" />
    <user-form v-if="form === 'user'" />
    <pin-editor v-if="form === 'pin-editor'" />
    <topic-form v-if="form === 'topic'" />
  </div>
</template>

<script>
import PinForm from "../components/PinForm.vue";
import EventForm from "../components/EventForm.vue";
import UserForm from "../components/UserForm.vue";
import PinEditor from "../components/PinEditor.vue";
import TopicForm from './TopicForm.vue';

export default {
  name: "FormsProfile",
  components: {
    PinForm,
    EventForm,
    UserForm,
    PinEditor,
    TopicForm
  },
  props: {
    form: {
      type: String,
      default: 'user',
    }
  }
};
</script>
