<template>
  <div class="container">
    <div class="content-center column">
      <!-- start header section -->
      <header>
        <logo-card />
        <multicolor-line class="line mg-top32" />
      </header>

      <section class="plat mg-top32">
        <h1 class="title-1 bolder">Fórum Municipal de Cultura de Campo Grande - MS</h1>
        <p class="body-3 mg-top16 text">
          O Fórum de Cultura Campo Grande é uma organização da sociedade
          civil que tem como finalidade discutir, refletir e praticar ações
          referente a política cultural do município de Campo Grande.
        </p>
        <h4 class="body-3 text bolder">Você sabe o que é uma sociedade civil organizada?</h4>
        <p class="body-3 text">
          É um grupo de pessoas que não pertencem ao estado e que se organizam de
          forma independente e voluntária para desenvolver ações que interfiram na
          política pública. Também é a possibilidade de exercer a cidadania
          democrática nas esferas sociais e políticas.
        </p>
        <h4 class="body-3 text bolder">Mas e o Fórum Municipal de Cultura o que é?</h4>
        <p class="body-3 text">
          É uma sociedade civil organizada, devidamente reconhecida por outros
          espaços participativos, e que tem como objetivo principal mediar o
          debate entre a sociedade civil e o poder público.
        </p>
        <h4 class="body-3 text bolder">De que forma?</h4>
        <p class="body-3 text">
          É um espaço de participação, onde todas e todos podem participar do
          debate através das assembleias, reuniões e convocatórias. É um canal
          de informação e comunicação via plataforma Cartografia da Cultura,
          redes sociais, entrevistas e consultorias. E também é um espaço de
          mediação, pois recebe e faz uma reflexão sobre as demandas, mediando
          o debate entre sociedade civil e poder público. <br>
          Ou seja, é um espaço amplo para discutir, propor, acompanhar e avaliar
          as políticas públicas para a cultura no município.
        </p>
        <h4 class="body-3 text bolder">Acesse os links para mais informações:</h4>
        <p class="body-3 text">
          <a
            class="body-3 bolder mg-left16"
            target="_blank"
            href=""
          >
            Repositório do Fórum
          </a> - documentos públicos, atas de reuniões, convocatórias. <br>
          <a
            class="body-3 bolder mg-left16"
            target="_blank"
            href="https://linktr.ee/cartografiadaculturacg"
          </a>
        </p>
      </section>

      <section class="contato mg-top16">
        <div class="links row">
          <a
            class="body-3 bolder mg-left16"
            target="_blank"
            href="https://www.facebook.com/forumdeculturac"
          >Facebook Fórum</a>
          <a
            class="body-3 bolder mg-left16"
            target="_blank"
            href="https://www.instagram.com/nossoforumcg/"
          >Instagram Fórum</a>
        </div>
      </section>

      <div
        class="footer"
        style="height: 100px;"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ForumPage',
};
</script>

<style lang="scss" scoped>

@import '../styles/variables.scss';
@import '../styles/mixins.scss';

.content-center {
  @include centered-column;
}

header {
  width: 100%;
}

span, p, a {
  color: black;
}

a {
  text-decoration: none;
}

p {
  text-align: justify;
}

.line {
  height: 4px;
  background-color: black;
}

</style>
