<template>
  <div class="container">

    <!-- <logo-card class="fixed-logo" :blackMode="true"/> -->
    <div class="content-center column">

      <header>
        <logo-card :blackMode="true"/>

        <multicolor-line class="line mg-top32"/>
      </header>

      <section class="column mg-top16">

        <!-- title -->
        <span class="title-1 bolder"> Perguntas Frequentes </span>

        <!-- questions -->
        <div class="questions mg-top8">

          <div class="item" v-for="(item, index) in questions" :key="index">

            <p class="body-2 bolder mg-top16">
              {{ index + 1 }}. {{ item.question }}
            </p>
            <p class="body-2"> {{ item.answer }}</p>

          </div>

        </div>

      </section>

      <div class="white-space"></div>

    </div>

  </div>
</template>

<script>

export default {
  name: 'termsPage',
  data() {
    return {
      questions: [
        {
          question: 'lorem ipsum dolor sit amet ipsun amet dolor sit?',
          answer: 'claro que serase',
        },
        {
          question: 'serase?',
          answer: 'claro que serase',
        },
        {
          question: 'serase?',
          answer: 'claro que serase',
        },
        {
          question: 'serase?',
          answer: 'claro que serase',
        },
        {
          question: 'serase?',
          answer: 'claro que serase',
        },
        {
          question: 'serase?',
          answer: 'claro que serase',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>

@import '../styles/variables.scss';
@import '../styles/mixins.scss';
@import '../styles/typo.scss';

.container {
  background-color: white;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
}

.content-center {
  // background-color: black;
  // position: absolute;
  // left: 50%;
  // transform: translateX(-50%);
  width: 800px;
  padding: 16px;
  z-index: 0;
  align-items: flex-start;
  animation: 0.5s fadeInOpacity ease-in;
  //border: 2px solid white;

  @include for-phone-only {
    padding: 32px;
  }
}

header {
  width: 100%;
}

span, p, a {
  color: black;
  font-family: 'Helvetica';
}

p {
  margin-bottom: 0px;
}

.white-space {
  height: 60px;
  //border: 2px solid green;
}

// ----------------- transitions ------------------
@keyframes fadeInOpacity {
  0% {
  opacity: 0;
  }
  100% {
  opacity: 1;
  }
}
</style>
