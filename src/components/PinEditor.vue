<template>
  <pin-form :edit-mode="edit" />
</template>

<script>
import PinForm from './PinForm.vue';

export default {
  name: 'PinProfile',
  components: {
    PinForm
  },
  data() {
    return {
      edit: true,
    };
  },
};
</script>