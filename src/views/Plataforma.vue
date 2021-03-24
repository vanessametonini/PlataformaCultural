<template>
  <div class="container">
    <div class="content-center column">
      <!-- start header section -->
      <header>
        <logo-card />
        <multicolor-line class="line mg-top32" />
      </header>

      <section class="plat mg-top32">
        <h1 class="title-1 bolder">Plataforma</h1>
        <p class="body-3 mg-top16 text">
          Cartografia da Cultura é uma plataforma online de participação
          cidadã que auxilia na construção de políticas públicas e projetos
          coletivos ligados à cultura no município de Campo Grande - MS.
        </p>
        <p class="body-3 text">
          É um espaço para exercer a cidadania e fomentar a participação na
          geração de ideias para melhorar a gestão cultural da cidade.
        </p>
        <p class="body-3 text">
          Aqui você pode: <br>
          <ul>
            <li>explorar o mapa e inserir seus dados nele;</li>
            <li>propor um debate, comentar e acompanhar os diálogos;</li>
            <li>acompanhar a agenda cultural e divulgar seu evento e reuniões;</li>
            <li>acessar os links dos produtores de cultura - artistas, gestores e espaços culturais;</li>
            <li>acessar o banco de dados disponibilizado pelo Fórum Municipal de Cultura, com atas, chamadas e outros documentos públicos.</li>
          </ul>
        </p>
        <p class="body-3 text">
          A plataforma Cartografia da Cultura é um espaço de comunicação e informação online proposta pelo grupo de pesquisa <a href="https://algoritmoufms.wixsite.com/algoritmo" target="_blank">algo+ritmo</a> UFMS, sob coordenação da Profa. Juliana Trujillo, em parceria com a diretoria do <a href="https://www.facebook.com/forumdeculturacg/?ref=page_internal">Fórum Municipal de Cultura de Campo Grande</a> - Gestão Chapa Quente.

        </p>
        <p class="body-3 text">
          Para dúvidas e contato: <a href="mailto:cartografiadaculturacg@gmail.com">cartografiadaculturacg@gmail.com</a>
        </p>
        <p class="body-3 text">
          Para participar e colaborar com a plataforma, <router-link to="signUp">cadastre-se</router-link>.
        </p>
        <p class="body-3 text">
          Leia também nossos <router-link :to="{ path: '/terms', hash: '#privacy'}">termos de privacidade</router-link> e <router-link :to="{ path: '/terms', hash: '#use'}">condições de uso</router-link>.
        </p>
      </section>

      <!-- start section contato -->
      <section class="contato mg-top16">
        <!-- <span class="headline-2">Contato</span> -->
        <div class="links row">
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
        </div>
      </section>

      <div class="white-space" />

      <!-- start section criação -->
      <section class="creation mg-top32">
        <h2 class="title-3 bolder">Criação</h2>

        <div class="row">
          <div class="colab-box column">
            <div class="separator" />
            <div class="colab-item mg-top8">
              <span class="body-2 bolder">algo+ritmo</span>
            </div>

            <div class="colab-links row">
              <a
                class="caption bolder mg-left16"
                target="blank"
                href="https://www.facebook.com/AlgoRitmo.ufms/"
              > .facebook </a>
              <a
                class="caption bolder mg-left16"
                target="blank"
                href="https://www.instagram.com/algo.ritmo_/"
              > .instagram </a>
            </div>
          </div>

          <div class="colab-box column">
            <div class="separator" />

            <div class="colab-item mg-top8">
              <span class="body-2 bolder">nomads.usp</span>
            </div>

            <div class="links row align-center">
              <a
                class="caption bolder mg-left16"
                target="blank"
                href="https://www.facebook.com/nomads.usp"
              > .facebook </a>
              <a
                class="caption bolder mg-left16"
                target="blank"
                href="https://www.instagram.com/nomads.usp/"
              > .instagram </a>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="colab-box column">
            <div class="separator" />
            <div class="colab-item mg-top8">
              <span class="body-2 bolder">Fórum Municipal de Cultura</span>
            </div>

            <div class="colab-links row">
              <a
                class="caption bolder mg-left16"
                href="mailto:forumdeculturacg@gmail.com">
                .email
              </a>
              <a
                class="caption bolder mg-left16"
                target="blank"
                href="https://www.facebook.com/forumdeculturacg"
              > .facebook </a>
              <a
                class="caption bolder mg-left16"
                target="blank"
                href="https://www.instagram.com/nossoforumcg/"
              > .instagram </a>
            </div>
          </div>

          <div class="colab-box column">
            <div class="separator" />

            <div class="colab-item mg-top8">
              <span class="body-2 bolder">coletivo.labor</span>
            </div>
            <div class="links row align-center">
              <a
                class="caption bolder mg-left16"
                target="blank"
                href="https://www.facebook.com/coletivolabor"
              > .facebook </a>
              <a
                class="caption bolder mg-left16"
                target="blank"
                href="https://www.instagram.com/coletivolabor/"
              > .instagram </a>
            </div>
          </div>
        </div>
      </section>

      <div class="white-space" />

      <!-- start section equipe -->
      <section class="team mg-top32">
        <h2 class="title-3 bolder">Equipe</h2>
        <div class="row">
          <div
            v-for="item in team"
            :key="item.name"
            class="own-team"
          >
            <div class="separator" />

            <div class="team-items column">
              <span
                id="line-height"
                class="body-2 bolder"
              > {{ item.name }} <br> {{ item.lastName }} </span>
              <span class="caption"> {{ item.category }} </span>

              <div class="social-media row">
                <a
                  class="caption bolder mg-left8"
                  target="blank"
                  :href="item.face"
                > .f </a>
                <a
                  class="caption bolder mg-left8"
                  target="blank"
                  :href="item.insta"
                > .ig </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="white-space" />

      <!-- start section colaboradores -->
      <section class="colab mg-top32">
        <h2 class="title-3 bolder">Colaboradores</h2>
        <ul class="row">
          <li
            v-for="colab in colaborators"
            :key="colab.name"
            class="own-team"
          >
            <div class="separator" />
            <div class="team-items column">
              <span
                id="line-height"
                class="body-2 bolder"
              >
                {{ colab.name }}
              </span>
            </div>
          </li>
        </ul>
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
  name: 'PlataformaPage',
  data() {
    return {
      team: [
        {
          name: 'Juliana',
          lastName: 'Trujillo',
          category: 'Coordenadora',
          face: 'https://www.facebook.com/ju.trujillo',
          insta: 'https://www.instagram.com/julianactrujillo/',
          color: '#C95B40',
        },
        {
          name: 'Marcelo',
          lastName: 'Tramontano',
          category: 'Consultor',
          face: 'https://www.facebook.com/profile.php?id=100009339932395',
          insta: 'https://www.instagram.com/azevedudu/',
          color: '#AD3B3B',
        },
        {
          name: 'Vanessa',
          lastName: 'Me Tonini',
          category: 'desenvolvedora de software',
          face: 'https://www.facebook.com/vanessametonini',
          insta: 'https://www.instagram.com/vanessametonini/',
          color: '#AD3B3B',
        },
        {
          name: 'Aarão',
          lastName: 'Melo Lopes',
          category: 'desenvolvedor de software',
          face: 'https://www.facebook.com/aarao.melolopes',
          insta: 'https://www.instagram.com/aarao.melolopes/',
          color: '#AD3B3B',
        },
        {
          name: 'Henrique',
          lastName: 'Leonel',
          category: 'desenvolvedor de software',
          face: 'https://www.facebook.com/henriquemleonel/',
          insta: 'https://www.instagram.com/henriquemleonel/',
          color: '#DBB753',
        },
        {
          name: 'Max',
          lastName: 'Hiroito',
          category: 'desenvolvedor de software',
          face: 'https://www.facebook.com/max.hiroito.5',
          insta: 'https://www.instagram.com/maxhrto/',
          color: '#4692C1',
        },
        {
          name: 'Eliane',
          lastName: 'Fraulob',
          category: 'interface gráfica',
          face: 'https://www.facebook.com/elianefraulob',
          insta: 'https://www.instagram.com/elianefraulob/',
          color: '#529E63',
        },
        {
          name: 'Paulo',
          lastName: 'Domingos',
          category: 'interface gráfica',
          face: 'https://www.facebook.com/paullo.domingos',
          insta: 'https://www.instagram.com/paullo.domingos/',
          color: '#CB6883',
        },
        {
          name: 'Eduardo',
          lastName: 'Azevedo',
          category: 'interface gráfica',
          face: 'https://www.facebook.com/profile.php?id=100009339932395',
          insta: 'https://www.instagram.com/azevedudu/',
          color: '#AD3B3B',
        },
      ],
      colaborators: [
        {
          name: 'André Vilela',
        },
        {
          name: 'Franciella Cavalheri',
        },
        {
          name: 'Kenzo Minata',
        },
        {
          name: 'Gilfranco Alves',
        },
        {
          name: 'Victor Silva',
        },
        {
          name: 'Guilherme Jardim',
        },
        {
          name: 'Gabriel Matias',
        },
        {
          name: 'Geovanna Santiago',
        }
      ]
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/variables.scss';
@import '../styles/mixins.scss';

* {
  font-family: 'Helvetica';
}

.content-center {
  @include centered-column;
}

header {
  width: 100%;
}

span, p, a {
  color: black;
}

ul {
  list-style-position: inside;
}

.text {
  text-align: justify;
}

a:hover {
  text-decoration: none;
}

.align-center {
  align-items: center;
}

.white-space {
  height: 32px;
}

.contato, .creation, .team, .colab {
  width: 80%;
}

.colab-box {
  align-items: flex-start;
  max-width: 280px;
  margin-top: 16px;
  margin-right: 32px;

  @include for-phone-only {
    width: 100%;
  }
}

.own-team {
  width: 180px;
  height: 80px;
  margin: 0 32px 16px 0px;
  padding: 8px 8px 8px 0px;

  @include for-phone-only {
    justify-content: space-between;
    width: 120px;
    height: 60px;
    margin: 16px 32px 32px 0px;
    padding: 8px 8px 8px 0px;
  }
}

.team-items {
  margin-top: 8px;
  width: 100%;
}

.social-media {
  justify-content: flex-start;
  margin-top: 0px;
}

#line-height {
  line-height: 1.2rem;
}

.line {
  height: 4px;
  background-color: black;
}

.separator {
  height: 2px;
  width: 100%;
  background-color: black;
}

.colab {
  ul {
    list-style-type: none;
  }

  .own-team {
    height: auto;
  }
}

</style>
