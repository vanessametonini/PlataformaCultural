<template>
  <div
    class="logo-box"
    :class="{ 'white': inverted }"
    @click="goToHome()"
  >
    <div class="top">
      <h1 class="title">
        Cartografia da Cultura.
      </h1>
    </div>

    <div class="bottom">
      <h2 class="forum-info">
        Fórum municipal <br> de Cultura <br> de Campo Grande
      </h2>
      <div class="line" />
      <span class="sub-info">
        Cultura em movimento
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LogoCard',
  props: {
    inverted: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    goToHome() {
      this.$router.push({ name: 'Home' });
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
  max-width: 180px;
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
  font-size: 1.8em;
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
