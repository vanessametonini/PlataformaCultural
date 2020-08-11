<template>
  <div class="about-page about-page">
    <div class="content">
      <!-- start header section -->
      <header>
        <logo-card :black-mode="true" />

        <multicolor-line class="line mg-top32" />
      </header>

      <section class="plat mg-top32">
        <span class="title-2 bolder"> Plataforma Cultural de Campo Grande </span>
        <p class="body-3 mg-top16 text">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores corporis dicta unde ratione
          eligendi numquam repudiandae maxime tenetur, error temporibus exercitationem quae? Minus ipsa
          ducimus eaque quae dolor, eius saepe! Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Soluta dolores commodi nulla, quidem dolore dolorem itaque expedita a iure reiciendis, amet consequuntur nihil,
          eveniet molestiae dignissimos quo blanditiis fuga magni.
        </p>
        <p class="body-3 text">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores corporis dicta unde ratione
          eligendi numquam repudiandae maxime tenetur, error temporibus exercitationem quae? Minus ipsa
          ducimus eaque quae dolor, eius saepe! Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Soluta dolores commodi nulla, quidem dolore dolorem itaque expedita a iure reiciendis, amet consequuntur nihil,
          eveniet molestiae dignissimos quo blanditiis fuga magni.
        </p>
      </section>

      <!-- start section contato -->
      <section class="contato mg-top16">
        <!-- <span class="headline-2">Contato</span> -->

        <div class="links row">
          <a class="body-3 bolder">cartografiadacultura@forum.com </a>
          <!-- <span class="mg-left8">|</span> -->

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

      <!-- start section colaboradores -->
      <section class="colabor mg-top32">
        <span class="title-3 bolder">Colaboradores</span>

        <div class="row">
          <!-- colab b0ox -->
          <div class="colab-box column">
            <!-- <div class="line spaced-8"></div> -->
            <div class="separator" />
            <div class="colab-item mg-top8">
              <span class="body-2 bolder">Fórum Municipal de Cultura <br> de Campo Grande</span>
            </div>

            <div class="colab-links row">
              <span class="caption bolder">.email</span>
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

              <!-- <q-btn flat round type="a" target="_blank" size="md" href="https://www.facebook.com/AlgoRitmo.ufms/">
                <q-icon size="sm" name="fab fa-facebook-square" color="white"></q-icon>
              </q-btn> -->
              <!-- <a class="caption bold" target="_blank" href="https://www.facebook.com/AlgoRitmo.ufms/">@algoritmo.ufms</a> -->
              <!-- <q-btn flat round type="a" target="_blank" size="md" href="https://www.instagram.com/algo.ritmo_/">
                <q-icon size="sm" name="fab fa-instagram" color="white"></q-icon>
              </q-btn> -->
            </div>
          </div>

          <!-- colab box -->
          <div class="colab-box column">
            <!-- <div class="line spaced-8"></div> -->
            <div class="separator" />

            <div class="colab-item mg-top8">
              <span class="body-2 bolder">Colabor</span>
            </div>
            <!-- <q-img src="../assets/statics/avatar01.jpg" style="height: 170px; max-width: 300px"/> -->

            <div class="links row align-center">
              <span class="caption bolder">email</span>
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
        </div>
      </section>

      <div class="white-space" />

      <!-- start section team -->
      <section class="team mg-top32">
        <span class="title-3 bolder">Nosso Time</span>

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
                <span class="caption bolder">email</span>
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

          <!-- <div class="team-box column" v-for="item in team" :key="item.name">

            <div class="separator"/>

            <div class="team-item column" :style="{ 'background-color': item.color}">
              <span id="line-height" class="body-1 bolder text-white"> {{ item.name }} </span>
              <span class="caption bolder text-white mg-top8"> {{ item.category }} </span>

              <div class="links row absolute-bottom">

                <span class="body-3 bolder text-white">.email</span>
                <a class="body-3 bolder mg-left8 text-white" target="blank" :href="item.face">.f</a>
                <a class="body-3 bolder mg-left8 text-white" target="blank" :href="item.insta">.ig</a>

              </div>

            </div>

          </div> -->
        </div>
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
  name: 'AboutPage',
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
          name: 'Henrique',
          lastName: 'Leonel',
          category: 'Dev',
          face: 'https://www.facebook.com/henriquemleonel/',
          insta: 'https://www.instagram.com/henriquemleonel/',
          color: '#DBB753',
        },
        {
          name: 'Max',
          lastName: 'Hiroito',
          category: 'Dev',
          face: 'https://www.facebook.com/max.hiroito.5',
          insta: 'https://www.instagram.com/maxhrto/',
          color: '#4692C1',
        },
        {
          name: 'Eliane',
          lastName: 'Fraulob',
          category: 'Design',
          face: 'https://www.facebook.com/elianefraulob',
          insta: 'https://www.instagram.com/elianefraulob/',
          color: '#529E63',
        },
        {
          name: 'Paulo',
          lastName: 'Domingos',
          category: 'Design',
          face: 'https://www.facebook.com/paullo.domingos',
          insta: 'https://www.instagram.com/paullo.domingos/',
          color: '#CB6883',
        },
        {
          name: 'Eduardo',
          lastName: 'Azevedo',
          category: 'Design',
          face: 'https://www.facebook.com/profile.php?id=100009339932395',
          insta: 'https://www.instagram.com/azevedudu/',
          color: '#AD3B3B',
        },
      ],
    };
  },
  computed: {
  },
  watch: {
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>

@import '../styles/variables.scss';
@import '../styles/mixins.scss';

* {
  font-family: 'Helvetica';
}

.about-page {
  background-color: white;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  // justify-content: center;
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

.text {
  text-align: justify;
}

a {
  text-decoration: none;
}

#color-email {
  color: #f58529;
}

#color-f {
  color: #3b5998;
}

#color-ig {
  color: #dd2a7b;
}

.align-center {
  align-items: center;
}

.white-space {
  height: 32px;
  //border: 2px solid green;
}

header, .plat, .team, .contato, .colabor {
  width: 100%;
}

.colab-box {
  align-items: flex-start;
  max-width: 280px;
  margin-top: 16px;
  margin-right: 32px;
  // background-color: #E6B545;

  @include for-phone-only {
    width: 100%;
  }
}

.colab-item {
  // min-height: 50px;
  // border: 2px solid white;
}

.own-team {
  width: 180px;
  height: 80px;
  margin: 8px 32px 16px 0px;
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
  // padding: 16px 16px 8px 16px;
  // background-color: #E6B545;
  // border: 2px solid white;
}

.social-media {
  justify-content: flex-start;
  margin-top: 0px;
}

// .team-box {
//   align-items: flex-start;
//   justify-items: center;
//   position: relative;
// }

// .team-item {
//   position: relative;
//   max-width: 110px;
//   height: 150px;
//   padding: 16px 16px 8px 16px;
//   margin: 8px 16px 8px 0px;
//   // background-color: #E6B545;
//   // border: 2px solid white;
// }

#line-height {
  line-height: 1.2rem;
}

.links {
}

.text-white {
  color: white;
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

</style>
