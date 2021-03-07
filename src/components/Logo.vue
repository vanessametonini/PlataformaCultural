<template>
  <div
    class="box"
    :class="{ 'black-mode' : blackMode, 'bordered' : bordered }"
    @click="goToHome()"
  >
    <div class="top">
      <h1
        id="title"
        class="title-3 bolder"
      >
        Cartografia da Cultura.
        <span id="m-title"> Carto CG.</span>
      </h1>
    </div>

    <div class="bottom column">
      <h2
        id="forum-info"
        class="body-3 bolder"
      >
        Fórum municipal <br> de Cultura <br> de Campo Grande
      </h2>
      <div class="line" />
      <span
        id="sub-info"
        class="overline bolder"
      > Cultura em movimento </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LogoCard',
  props: {
    blackMode: {
      type: Boolean,
      default: false,
    },
    bordered: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
    };
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
@import '../styles/typo.scss';

* {
  font-family: 'Helvetica';
  box-sizing: border-box;
  color: black;
}

.box {
  background-color: white;
  height: 250px;
  padding: 16px;
  position: relative;
  overflow: hidden;
  width: 250px;

  @include for-phone-only {
    align-items: left;
    height: 120px;
    width: 120px;
    padding: 32px 16px 8px 16px;
  }

  &:hover {
    cursor: pointer;
  }
}

.top, .bottom {
  text-align: left;
}

#title {
  line-height: initial;
  margin: 0;
  font-size: 3em;

  @include for-phone-only {
    display: none;
  }
}

#m-title {
  display: none;

  @include for-phone-only {
    display: block;
    font-size: 2rem;
    line-height: 2.2rem;
    font-weight: 700;
  }
}

#forum-info {
  line-height: initial;
  margin: 0;
}

.bottom {
  flex-wrap: nowrap;
  line-height: 16px;
  position: absolute;
  bottom: 16px;

  @include for-phone-only {
    justify-content: flex-end;
    display: none;
  }
}

.line {
  height: 2px;
  margin-top: 4px;
  margin-bottom: 4px;
  // background-color: black;
  width: 100%;
  background-color: black;
}

.black-mode {
  background-color: black;

  .line {
    background-color: white;
  }

  #title, #forum-info, #sub-info, .nd-sub {
    color: white;
  }
}

.bordered {
  border: 2px solid black;
}
</style>
