<template>
  <button
    v-if="!to"
    class="base-button"
    :class="[
      theme,
      { 'disabled': disabled }
    ]"
    @click="$emit('click')"
  >
    <slot />
  </button>
  <router-link
    v-else
    class="base-button"
    :class="[
      theme,
      { 'disabled': disabled }
    ]"
    :to="to"
  >
    <slot />
  </router-link>
</template>

<script>
export default {
  props: {
    to: {
      type: Object,
      default: null,
    },
    theme: {
      type: String,
      default: 'primary',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
$primaryColor: #000;
$secondaryColor: #E7E7E7;

.base-button {
  border: 0;
  padding: 8px 12px;
  border-radius: 0px;
  outline: none;
  cursor: pointer;
  transition: 0.2s background ease-out;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  min-width: 40px;
  max-height: 40px;
}

.base-button.disabled {
  background: #D0D0D0;
  color: #888;
  cursor: default;
}

.base-button:not(.disabled).transparent {
  background: transparent;
  padding: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-items: center;
  text-transform: lowercase;
}

.base-button:not(.disabled).flat:hover {
  background: lighten($secondaryColor, 0%);
}

.base-button:not(.disabled).flat {
  background: transparent;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: #FFF;
  // max-height: 36px;
  padding: 8px 16px;
  // margin-top: -8px;
  text-transform: lowercase;
}

// Primary
.base-button:not(.disabled).primary {
  background: $primaryColor;
  color: #FFF;
  text-transform: lowercase;
}

.base-button:not(.disabled).primary:hover {
   background: lighten($primaryColor, 7%);
}

// secondary
.base-button:not(.disabled).secondary {
  text-transform: lowercase;
  background: transparent;
  color: #000;
  border: 2px solid black;
}

.base-button:not(.disabled).secondary:hover {
  background: lighten($secondaryColor, 2%);
}

// Borderless
.base-button:not(.disabled).borderless {
  background: transparent;
  color: $primaryColor;
}

.base-button:not(.disabled).borderless:hover {
  background: lighten($primaryColor, 90%);
}

</style>
