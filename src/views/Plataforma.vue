<template>
  <div class="container">
    <div class="content-center column">
      <!-- start header section -->
      <header>
        <logo-card />
        <multicolor-line class="line mg-top32" />
      </header>

      <section class="plat mg-top32">
        <h1 class="title-1 bolder">
          Plataforma
        </h1>
        <p class="body-3 mg-top16 text">
          Cartografia da Cultura é uma plataforma online de participação
          cidadã que auxilia na construção de políticas públicas e projetos
          coletivos ligados à cultura no município de Campo Grande - MS.
        </p>
        <p class="body-3 text">
          É um espaço para exercer a cidadania e fomentar a participação na
          geração de ideias para a gestão cultural da cidade.
        </p>
        <p class="body-3 text">
          Aqui você pode: <br>
          <ul>
            <li>explorar o mapa e inserir seus dados nele (pin);</li>
            <li>propor um debate, comentar e acompanhar os diálogos;</li>
            <li>acompanhar a agenda cultural e divulgar seu evento e reuniões;</li>
            <li>acessar os links dos produtores de cultura - artistas, gestores e espaços culturais;</li>
            <li>acessar o banco de dados disponibilizado pelo Fórum Municipal de Cultura, com atas, chamadas e outros documentos públicos.</li>
          </ul>
        </p>
        <p class="body-3 text">
          A plataforma Cartografia da Cultura é um espaço de comunicação e informação online proposta pelo grupo de pesquisa 
          <a
            href="https://www.instagram.com/algo.ritmo_/"
            target="_blank"
          >algo+ritmo</a> UFMS, sob coordenação da Profa. Juliana Trujillo, em parceria com a diretoria do <a target="_blank" href="https://www.facebook.com/forumdeculturacg/?ref=page_internal">Fórum Municipal de Cultura de Campo Grande</a> - Gestão Chapa Quente.
        </p>
        <p class="body-3 text">
          Esta plataforma é o principal experimento da pesquisa de doutorado sobre processos participativos através da mediação digital desenvolvida por Juliana Trujillo, sob orientação do Prof. Associado Dr. Marcelo Tramontano, vinculada ao PPGAU-IAU-USP.
        </p>
        <p class="body-3 text">
          Para dúvidas e contato, enviar e-mail para: <a href="mailto:cartografiadaculturacg@gmail.com">cartografiadaculturacg@gmail.com</a>
        </p>
        <p class="body-3 text">
          Para participar e colaborar com a plataforma, <router-link to="signUp">
            <b>CADASTRE-SE</b>
          </router-link>.
        </p>
        <p class="body-3 text">
          Clique aqui para ler nossos termos:<router-link :to="{ path: '/terms', hash: '#privacy'}">
            Políticas de privacidade
          </router-link> e <router-link :to="{ path: '/terms', hash: '#use'}">
            condições de uso
          </router-link>.
        </p>
        <p class="body-3 text">
          Siga Cartografia da Cultura CG nas redes sociais!
        </p>
      </section>

      <!-- start section contato -->
      <section class="contato mg-top16">
        <!-- <span class="headline-2">Contato</span> -->
        <div class="links row">
          <a
            class="body-3 bolder mg-left16"
            target="_blank"
            href="https://www.facebook.com/CartografiadaCulturaCG"
          >Facebook</a>
          <!-- <span class="mg-left8">|</span> -->

          <a
            class="body-3 bolder mg-left16"
            target="_blank"
            href="https://www.instagram.com/cartografiadaculturacg/"
          >Instagram</a>
        </div>
      </section>

      <div class="white-space" />

      <!-- start section criação -->
      
      <section class="creation mg-top32">
        <h2 class="title-3 bolder">
          Criação
        </h2>

        <div class="row">
          <div class="colab-box column">
            <div class="separator" />
            <div class="colab-item mg-top8">
              <span class="body-2 bolder">algo+ritmo.ufms</span>
            </div>
          </div>

          <div class="colab-box column">
            <div class="separator" />

            <div class="colab-item mg-top8">
              <span class="body-2 bolder">nomads.usp</span>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="colab-box column">
            <div class="separator" />
            <div class="colab-item mg-top8">
              <span class="body-2 bolder">Fórum de Cultura CG</span>
            </div>
          </div>

          <div class="colab-box column">
            <div class="separator" />

            <div class="colab-item mg-top8">
              <span class="body-2 bolder">coletivo.labor</span>
            </div>
          </div>
        </div>
      </section>

      <div class="white-space" />

      <!-- start section equipe -->
      
      <section class="team mg-top32">
        <h2 class="title-3 bolder">
          Equipe
        </h2>
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
            </div>
          </div>
        </div>
      </section>

      <div class="white-space" />

      <!-- start section colaboradores -->
      <section class="colab mg-top32">
        <h2 class="title-3 bolder">
          Colaboradores
        </h2>
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
          category: 'coordenadora',
          color: '#C95B40',
        },
        {
          name: 'Marcelo',
          lastName: 'Tramontano',
          category: 'consultor',
          color: '#AD3B3B',
        },
        {
          name: 'Vanessa',
          lastName: 'Me Tonini',
          category: 'desenvolvedora de software',
          color: '#AD3B3B',
        },
        {
          name: 'Aarão',
          lastName: 'Melo Lopes',
          category: 'desenvolvedor de software',
          color: '#AD3B3B',
        },
        {
          name: 'Henrique',
          lastName: 'Leonel',
          category: 'desenvolvedor de software',
          color: '#DBB753',
        },
        {
          name: 'Max',
          lastName: 'Hiroito',
          category: 'desenvolvedor de software',
          color: '#4692C1',
        },
        {
          name: 'Eliane',
          lastName: 'Fraulob',
          category: 'interface gráfica',
          color: '#529E63',
        },
        {
          name: 'Paulo',
          lastName: 'Domingos',
          category: 'interface gráfica',
          color: '#CB6883',
        },
        {
          name: 'Eduardo',
          lastName: 'Azevedo',
          category: 'interface gráfica',
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
