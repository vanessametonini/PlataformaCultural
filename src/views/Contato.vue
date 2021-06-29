<template>
  <div class="container">
    <div class="content-center column">
      <!-- start header section -->
      <header>
        <logo-card />

        <multicolor-line class="line mg-top32" />
      </header>

      <section class="plat mg-top32">
        <span class="title-2 bolder">Ajuda e Tutoriais</span>
        <p class="body-3 mg-top16 text">
          Para entrar em contato conosco, tirar dúvidas, reportar algum problema, envie um e-mail para: <a href="mailto:cartografiadaculturacg@gmail.com">cartografiadaculturacg@gmail.com</a>
          ou mande uma mensagem por inbox nas nossas redes sociais:
        </p>
      </section>
      <section class="contato mg-top16">
        <a
          class="body-3 bolder"
          target="_blank"
          href="https://www.facebook.com/CartografiadaCulturaCG"
        >
          <i class="fab fa-facebook" />
          Facebook 
        </a>
        <a
          class="body-3 bolder mg-left16"
          target="_blank"
          href="https://www.instagram.com/cartografiadaculturacg/"
        >
          <i class="fab fa-instagram" />
          Instagram 
        </a>
      </section>
      
      <section class="plat mg-top32">
        <span class="title-3 bolder">Apresentação da plataforma </span>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/gdOr7b64_nA"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
      </section>
      
      <section class="plat mg-top32">
        <span class="title-3 bolder">Tutorial 1 - como fazer o cadastro </span>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/Da3zGwoVl9A"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
      </section>
      
      <section class="plat mg-top32">
        <span class="title-3 bolder">Tutorial 2 - como  inserir um pin no mapa</span>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/IpvAPNFpQ5I"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
      </section>
      
      <section class="plat mg-top32">
        <span class="title-3 bolder">Tutorial 3 - como inserir um evento na agenda</span>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/2PlDIilF6y4"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
      </section>
      
      <section class="plat mg-top32">
        <span class="title-3 bolder">Tutorial 4 - como iniciar um debate</span>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/PUGiSYlojLg"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
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

.content-center {
  @include centered-column;
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
