<template>
  <div class="app-component stepper">
    <!-- header -->
    <header class="stepper-header">
      <logo-card />
      <progress-bar
        class="progressbar"
        :current-step="currentStep"
        :steps-title="stepsTitle"
      />
      <color-line class="color-line" />
    </header>
    <!-- content -->
    <div class="stepper-content">
      <!-- SECTION 1 -->
      <section
        v-if="currentStep === 1"
        id="section1"
        class="stepper-section"
      >
        <span class="title-3 bolder mg-top16">Sobre os Debates</span>
        <p class="body-2 mg-top8 justify-text">
          Você poderá iniciar um debate sobre o assunto que desejar, seja ele endereçado
          para um grupo específico (como por exemplos os colegiados setoriais)
          ou aberto a todos aqueles que estejam interessados em discutir assuntos relativos à Cultura Municipal. 
          Ao iniciar um debate, você apresentará seu ponto de vista inserindo um pequeno texto argumentativo
          sobre o assunto e convidando pessoas a dialogar e compartilhar outros pontos de vista. 
        </p>
        <p class="body-2 mg-top8 justify-text">
          Para momentos de geração de ideias ou tomadas de decisão, a funcionalidade Debate é bastante útil,
          pois a visualização permite a organização da informação e as curtidas e apoios auxiliam a entender
          quais ideias são mais populares.
          Considere que o debate não aciona nenhum mecanismo de atuação concreta, mas alimenta as tomadas de 
          decisão do Fórum Municipal de Cultura de Campo Grande-MS, identifica as demandas da classe artística,
          verifica a necessidade de encontros específicos (assembleias e reuniões), entre outras observações.
        </p>
        <span class="headline-3 bolder mg-top16">
          Recomendações para participar de um debate aberto
        </span>
        <p class="body-2 mg-top8 justify-text">
          1. Para iniciar um debate é necessário que você faça um cadastro na plataforma
          <router-link
            class="link body-2"
            to="/signUp"
          >
            <strong>Cartografia da Cultura</strong>
          </router-link>. Os usuários cadastrados também podem participar das discussões já
          iniciadas através dos comentários e/ ou indicar se concorda ou não
          concorda clicando nos botões “<span title="polegar pra cima / apoiar">👍</span>”
          ou “<span title="polegar pra baixo / não apoiar">👎</span>” encontrados em 
          cada debate proposto.
        </p>
        <p class="body-2 mg-top8 justify-text">
          2. Seja cuidadoso ao escrever com letras maiúsculas. Na Internet, muitas vezes isso é considerado o mesmo que gritar.
        </p>
        <p class="body-2 mg-top8 justify-text">
          3. As críticas duras são bem vindas. Este é um espaço de pensamento
          livre, mas recomendamos que seja gentil.
        </p>
        <p class="body-2 mg-top8 justify-text">
          4. Desfrute deste espaço, das vozes que o preenchem, ele também é seu.
        </p>
      </section>
      <!-- SECTION 2 -->
      <section
        v-if="currentStep === 2"
        id="section2"
        class="stepper-section"
      >
        <span class="title-1 bolder">Regras do debate aberto</span>
        <!-- 1 -->
        <span
          class="body-2 bolder mg-top16"
        >1. Uma vez feito o login, você poderá:</span>
        <ol>
          <li class="body-2 justify-text">
            Iniciar um debate.
          </li>
          <li class="body-2 justify-text">
            Participar de um debate já iniciado.
          </li>
          <li class="body-2 justify-text">
            Apoiar ou não apoiar um debate iniciado.
          </li>
        </ol>
        <!-- 2 -->
        <span class="body-2 bolder mg-top24">2. Para iniciar o debate: </span>
        <ol class="list">
          <li class="body-2 justify-text">
            Insira um título curto que represente o assunto principal que você quer debater.
          </li>
          <li class="body-2 justify-text">
            Insira um pequeno texto apresentando sua argumentação. 
          </li>
          <li class="body-2 justify-text">
            Escolha uma categoria principal que melhor relaciona o assunto do debate.
            Outras categorias complementares também podem ser inseridas.
          </li>
        </ol>
        <!-- 3 -->
        <span
          class="body-2 bolder mg-top24"
        >3. Uma vez iniciado o debate, você não poderá:
        </span>
        <ol class="list">
          <li class="body-2 justify-text">
            Deletar o debate que você iniciou;
          </li>
        </ol>
        <!-- 4 -->
        <span class="body-2 bolder mg-top24">4. Serão deletados: </span>
        <ol class="list">
          <li class="body-2 justify-text">
            Os comentários ofensivos, com discurso de ódio ou qualquer ato de
            comunicação que inferiorize ou incite contra uma pessoa ou grupo,
            tendo por base características como raça, gênero, etnia,
            nacionalidade, religião, orientação sexual ou outro aspecto passível
            de discriminação.
          </li>
          <li class="body-2 justify-text">
            Qualquer comentário que implique em uma ação ilegal ou que tenham a
            intenção de sabotar o espaço de debate.
          </li>
        </ol>
        <!-- 5 -->
        <span class="body-2 bolder mg-top24">5. Recomendamos que: </span>
        <ol class="list">
          <li class="body-2 justify-text">
            Revise o texto que inserir no debate. Veja se está claro e objetivo.
          </li>
          <li class="body-2 justify-text">
            Seja gentil ao dialogar com as outras vozes que têm pontos de vista
            diferente do seu.
          </li>
        </ol>
        <!-- ACCEPT TERMS -->
        <div class="stepper-rules row al-items-center">
          <q-checkbox
            v-model="rulesAccepted"
            size="32px"
            color="black"
          >
            <span class="body-2 mg-left8">
              Eu li e concordo com as
              <strong
                style="cursor: pointer"
                @click="scrollToTop()"
              >
                Recomendações e regras do debate
              </strong>.*
            </span>
          </q-checkbox>
          <span
            class="caption mg-left8"
            :class="{ 'rules-accept-error': rulesError }"
          >(Esta opção deve ser marcada*)</span>
        </div>
      </section>
      <!-- SECTION 3 -->
      <topic-form v-if="currentStep === 3" :editMode="false"></topic-form>
      <!-- TERMS -->
    <div v-if="currentStep === 3" class="stepper-terms row no-wrap al-items-center">
      <q-field
        borderless
        dense
        :value="terms"
        :error="$v.terms.$error"
        :error-message="termsErrorMessage"
        @blur="$v.terms.$touch"
      >
        <template #control>
          <q-checkbox
            v-model="terms"
            size="32px"
            color="black"
          >
            <span class="body-3 mg-left8">
              Eu li e concordo com os
              <router-link
                class="link"
                :to="{ path: '/terms', hash: '#terms' }"
                target="_blank"
              >
                <span class="body-3 bolder">Termos de Uso</span>
              </router-link>
              e
              <router-link
                class="link"
                :to="{ path: '/terms', hash: '#privacy' }"
                target="_blank"
              >
                <span class="body-3 bolder">Privacidade. *</span>
              </router-link>
            </span>
          </q-checkbox>
        </template>
      </q-field>
    </div>
    </div>
    <!-- FOOTER -->
    <div class="stepper-footer">
      <!-- BACK -->
      <base-button
        v-if="currentStep != 1"
        class="stepper-btn"
        theme="flat"
        @click="prevStep()"
      >
        <i class="fas fa-arrow-left btn-icon" />
        <span class="body-3 bolder stepper-btn-span mg-left16"> voltar </span>
      </base-button>
      <!-- CANCEL -->
      <base-button
        v-if="currentStep !== 2"
        class="stepper-btn"
        theme="flat"
        @click="cancel()"
      >
        <i class="fas fa-times btn-icon" />
        <span class="body-3 bolder stepper-btn-span text-uppercase mg-left16">
          cancelar
        </span>
      </base-button>
      <base-button
        v-if="currentStep != numberOfSteps"
        class="stepper-btn"
        theme="flat"
        @click="nextStep()"
      >
        <span class="body-3 bolder stepper-btn-span text-uppercase">
          Continuar
        </span>
        <i class="fas fa-arrow-right btn-icon mg-left16" />
      </base-button>
      <base-button
        v-if="currentStep === numberOfSteps"
        class="stepper-btn"
        @click="submit()"
      >
        <span class="body-3 bolder text-uppercase"> Iniciar debate </span>
      </base-button>
    </div>
  </div>
</template>

<script>
import { sameAs } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
import { createHelpers } from "vuex-map-fields";
import ColorLine from "./ColorLine.vue";
import ProgressBar from "./BaseStepProgressBar.vue";
import BaseButton from "./BaseButton.vue";
import TopicForm from './TopicForm.vue';

const { mapFields } = createHelpers({
  getterType: "topics/getField",
  mutationType: "topics/updateField",
});

export default {
  name: "TopicCreator",
  components: {
    ColorLine,
    ProgressBar,
    BaseButton,
    TopicForm,
  },
  data() {
    return {
      currentStep: 1,
      count: 0,
      numberOfSteps: 3,
      stepsTitle: ["O que são os Debates", "Regras", "Crie seu Debate"],
      rulesAccepted: false,
      rulesError: false,
      terms: false,
      hasSelected: false,
    };
  },
  validations: {
    terms: {
      sameAs: sameAs( () => true )
    },
  },
  computed: {
    ...mapGetters({
      categories: "categories/loadCategories",
    }),
    termsErrorMessage() {
      return "É necessário aceitar os termos";
    },
  },
  methods: {
    async submit() {
      this.$v.$touch();
      if(!this.$v.$anyError) {
        this.$store
        .dispatch("topics/createNewTopic", { $socket: this.$socket })
        .then(() => {
          this.content = "";
          this.title = "";
          this.category = null;
          this.categoriesTagged = [];
          this.$router.push("/topics");
        });
      }
      else {
        this.$q.notify({
          message: "Por favor, preencha todos os campos para o debate",
          position: 'top-right',
        });
      }
    },
    cancel() {
      this.content = "";
      this.title = "";
      this.category = null;
      this.categoriesTagged = [];
      this.$router.push({ name: "Topics" });
    },
    nextStep() {
      if (this.currentStep === 2 && this.rulesAccepted === false) {
        this.rulesError = true;
      } else if (this.count <= this.numberOfSteps) {
        this.currentStep += 1;
        this.count += 1;
        this.scrollToTop();
        this.rulesError = false;
      }
    },
    prevStep() {
      if (this.count >= 0) {
        this.currentStep -= 1;
        this.count -= 1;
      }
      this.scrollToTop();
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";
@import "../styles/mixins.scss";
@import '../styles/categories.scss';

$height: 32px;
$width: 32px;
$line-height: 32px;
$primaryColor: black;
$secondaryColor: #ddd;

.stepper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;
  margin-bottom: 50px;
}

.stepper-header {
  width: 100%;
  padding: 16px;
  padding-bottom: 0;

  .progressbar {
    margin-top: 24px;
  }

  .identity {
    display: none;
    margin: 16px 0 32px 0;
  }

  .color-line {
    margin-top: 32px;
  }
}

.stepper-content {
  width: 100%;
  height: 100%;
  padding: 16px;
}

section {
  display: flex;
  flex-direction: column;
  opacity: 1;
  animation-name: fadeInOpacity;
  animation-iteration-count: 1;
  animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
  animation-duration: 1s;
}

ol {
  list-style: lower-latin;
  margin: 8px 0 0 0;
  padding-left: 10px;
}

li {
  margin-left: 32px;
  margin-bottom: 8px;
}

.stepper-rules,
.stepper-terms {
  margin-top: 32px;
}

.rules-accept-error {
  animation: shake 0.2s;
  color: red;
}

@keyframes shake {
  0% {
    transform: translateX(0px);
  }
  25% {
    transform: translateX(-5px);
  }
  50% {
    transform: translateX(0px);
  }
  75% {
    transform: translateX(5px);
  }
  100% {
    transform: translateX(0px);
  }
}

.link {
  text-decoration: none;
  color: black;
}

.justify-text {
  text-align: justify;
}

.category-field {
  display: grid;
  grid-template-columns: repeat(2, 50%);
  margin-top: 32px;

  .category-list {
    border: 1px solid #ddd;
    padding: 0 8px;
    border-radius: 2px;
    margin-right: 32px;

    span[class^="icon-"] {
      font-size: 2em;
    }
  }
}

.related-tags,
.main-tag {
  border: 1px solid #ddd;
  padding: 0 8px;
  border-radius: 2px;
}

.main-tag {
  min-height: 56px;

  #label {
    margin-top: -4px;
    color: $gray3;
  }
}

.main-tag-badge {
  width: fit-content;
  border: 1px solid;
  padding: 4px 8px;
  border-radius: 2px;
  margin-top: 8px;
}

#untag {
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
}

.related-tags {
  margin-top: 32px;
  min-height: 100px;
}

.related-tags-grid {
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;
  margin-top: 8px;
}

.categorys-tags-badge {
  display: block;
  border: 1px solid;
  border-radius: 2px;
  height: min-content;
  padding: 2px 8px;
  margin:  0 8px 8px 0;
}

@keyframes fadeInOpacity {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.titulo, .conteudo {
  margin-top: 4px;
  margin-bottom: 8px;
}

.editor {
  width: 100%;
}

.stepper-footer {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
  margin: 32px 0;
  padding: 0 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #ddd;
}

.stepper-btn {
  min-width: 150px;
  transition: 1s ease-in-out;
}

.btn-icon {
  color: $gray2;
}

.stepper-btn-span {
  color: $primaryColor !important;
  letter-spacing: 1px;
}
</style>
