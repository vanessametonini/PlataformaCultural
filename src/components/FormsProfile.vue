<template>
  <div>
    <pin-form v-if="form === 'pin'" />
    <event-form v-if="form === 'event'" />
    <user-form v-if="form === 'user'" />
  </div>
</template>

<script>
import PinForm from "../components/PinForm.vue";
import EventForm from "../components/EventForm.vue";
import UserForm from "../components/UserForm.vue";

export default {
  name: "FormsProfile",
  components: {
    PinForm,
    EventForm,
    UserForm,
  },
  props: {
    form: {
      type: String,
      default: 'user',
    }
  }
};
</script>
