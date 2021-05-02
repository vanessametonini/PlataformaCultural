<template>
  <div class="container">
    <div class="content-center column">
      <!-- start header section -->
      <header>
        <logo-card class="" />
        <multicolor-line class="line mg-top32" />
      </header>

      <section class="plataforma body-3 text mg-top32">
        <h1 class="title-1 bolder">
          Plataforma
        </h1>
        <p class="mg-top16">
          Cartografia da Cultura é uma plataforma online de participação
          cidadã que auxilia na construção de políticas públicas e projetos
          coletivos ligados à cultura no município de Campo Grande - MS.
        </p>
        <p>
          É um espaço para exercer a cidadania e fomentar a participação na
          geração de ideias para a gestão cultural da cidade.
        </p>
        <p>
          Aqui você pode: <br>
          <ul>
            <li>explorar o mapa e inserir seus dados nele (pin);</li>
            <li>propor um debate, comentar e acompanhar os diálogos;</li>
            <li>acompanhar a agenda cultural e divulgar seu evento e reuniões;</li>
            <li>acessar os links dos produtores de cultura - artistas, gestores e espaços culturais;</li>
            <li>acessar o banco de dados disponibilizado pelo Fórum Municipal de Cultura, com atas, chamadas e outros documentos públicos.</li>
          </ul>
        </p>
        <p>
          A plataforma Cartografia da Cultura é um espaço de comunicação e informação online proposta pelo grupo de pesquisa 
          <a
            href="https://www.instagram.com/algo.ritmo_/"
            target="_blank"
          >algo+ritmo</a> UFMS, sob coordenação da Profa. Juliana Trujillo, em parceria com a diretoria do <a target="_blank" href="https://www.facebook.com/forumdeculturacg/?ref=page_internal">Fórum Municipal de Cultura de Campo Grande</a> - Gestão Chapa Quente.
        </p>
        <p>
          Esta plataforma é o principal experimento da pesquisa de doutorado sobre processos participativos através da mediação digital desenvolvida por Juliana Trujillo, sob orientação do Prof. Associado Dr. Marcelo Tramontano, vinculada ao PPGAU-IAU-USP.
        </p>
        <p>
          Para dúvidas e contato, enviar e-mail para: <a href="mailto:cartografiadaculturacg@gmail.com">cartografiadaculturacg@gmail.com</a>
        </p>
        <p>
          Para participar e colaborar com a plataforma,
          <router-link to="signUp">
            <strong>CADASTRE-SE</strong>
          </router-link>.
        </p>
        <p>
          Clique aqui para ler nossos termos:<router-link :to="{ path: '/terms', hash: '#privacy'}">
            Políticas de privacidade
          </router-link> e <router-link :to="{ path: '/terms', hash: '#use'}">
            condições de uso
          </router-link>.
        </p>
        <p>
          Siga Cartografia da Cultura CG nas redes sociais!
        </p>
        <p>
          <a
            class="body-3 bolder"
            target="_blank"
            href="https://www.facebook.com/CartografiadaCulturaCG"
          >
            <i class="fab fa-facebook"></i>
            Facebook
          </a>
          <a
            class="body-3 bolder mg-left16"
            target="_blank"
            href="https://www.instagram.com/cartografiadaculturacg/"
          >
            <i class="fab fa-instagram"></i>
            Instagram
          </a>
        </p>
      </section>

      <div class="white-space" />

      <!-- start section criação -->
      <section class="creation">
        <h2 class="title-3 bolder">Criação</h2>
        <ul>
          <li v-for="by in creation" :key="by.name">
            <a :href="by.link" target="_blank">{{by.name}}</a>
          </li>
        </ul>
      </section>

      <div class="white-space" />

      <!-- start section equipe -->
      <section class="team mg-top32">
        <h2 class="title-3 bolder">Equipe</h2>
        <ul>
          <li v-for="item in team" :key="item.name">
            {{ item.name }} <br/> {{ item.lastName }} <br />
            <span class="caption"> {{ item.category }}</span>
          </li>
        </ul>
      </section>

      <div class="white-space" />

      <!-- start section colaboradores -->
      <section class="colab mg-top32">
        <h2 class="title-3 bolder">Colaboradores</h2>
        <ul class="row">
          <li v-for="colab in colaborators" :key="colab.name">
            {{ colab.name }}
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
      creation: [
        {
          name: 'algo+ritmo.ufms',
          link: 'https://algoritmoufms.wixsite.com/algoritmo'
        },
        {
          name: 'nomads.usp',
          link: 'http://www.nomads.usp.br/site/'
        },
        {
          name: 'Fórum de Cultura CG',
          link: 'http://forumdeculturacg.blogspot.com/'
        },
        {
          name: 'coletivo.labor',
          link: 'http://coletivolabor.com.br/'
        },
      ],
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

.plataforma {
  ul {
    list-style-position: inside;
  }
}

.text {
  text-align: justify;
}

a:hover {
  text-decoration: none;
}

.white-space {
  height: 32px;
}

.contato, .creation, .team, .colab {
  @include for-tablet-portrait-up {
    width: 80%;
  }
}

.creation, .team, .colab {
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;

    @include for-tablet-portrait-up {
      grid-template-columns: repeat(2, 48%);
    }
  }

  li {
    border-top: 2px solid black;
    padding-top: 8px;
    margin-top: 32px;
    margin-right: 32px;
    font-size: 1rem;
    line-height: 1.2rem;
    font-weight: bold;

    .caption {
      font-weight: normal;
    }
  }
}


</style>
