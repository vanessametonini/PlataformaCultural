<template>
  <div class="contact-page">
    <div class="content">
      <!-- start header section -->
      <header>
        <logo-card :black-mode="true" />

        <multicolor-line class="line mg-top32" />
      </header>

      <section class="plat mg-top32">
        <span class="title-2 bolder">Contato</span>
        <p class="body-3 mg-top16 text">
          E-mail plataforma: <a href="mailto:cartografiadaculturacg@gmail.com">cartografiadaculturacg@gmail.com</a>
        </p>
        <p>
          E-mail forum: <a href="mailto:forumdeculturacg@gmail.com">forumdeculturacg@gmail.com</a>
        </p>
        <p>
          E-mail coordenação geral: <a href="mailto:juliana.trujillo@ufms.br">juliana.trujillo@ufms.br</a>
        </p>
      </section>

      <section class="contato mg-top16">
        <a
          class="body-3 bolder mg-left16"
          target="_blank"
          href="https://www.facebook.com/AlgoRitmo.ufms/"
        >.facebook</a>
        <!-- <span class="mg-left8">|</span> -->

        <a
          class="body-3 bolder mg-left16"
          target="_blank"
          href="https://www.instagram.com/algo.ritmo_/"
        >.instagram</a>
      </section>

      <div class="white-space" />
      <div
        class="footer"
        style="height: 100px;"
      />
    </div>
  </div>
</template>

<script>

export default {
  name: 'ContactPage',
};
</script>

<style lang="scss" scoped>

@import '../styles/variables.scss';
@import '../styles/mixins.scss';

* {
  font-family: 'Helvetica';
}

.contact-page {
  background-color: white;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.content {
  width: 650px;
  padding: 32px;
  z-index: 0;
  align-items: flex-start;

  @include for-phone-only {
    padding: 32px;
  }

  @include for-tablet-portrait-only {
    padding: 32px;
  }
}

span, p, a {
  color: black;
}

a {
  text-decoration: underline;
  &:hover {
    text-decoration: none;
  }
}

.text {
  text-align: justify;
}

header {
  width: 100%;
}

.line {
  height: 4px;
  background-color: black;
}

</style>
