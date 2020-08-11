<template>
  <div class="app-component stepper">
    <!-- header -->
    <div class="stepper-header">
      <identity
        class="identity"
        :black-mode="true"
      />
      <progress-bar
        class="progressbar"
        :current-step="currentStep"
        :steps-title="stepsTitle"
      />
      <color-line class="color-line" />
    </div>
    <!-- content -->
    <div class="stepper-content">
      <!-- SECTION 1 -->
      <section
        v-if="currentStep === 1"
        id="section1"
        class="stepper-section"
      >
        <span class="title-3 bolder mg-top16">Sobre os Diálogos</span>
        <span class="headline-3 bolder mg-top16">Diálogos abertos</span>
        <p class="body-2 mg-top8 justify-text">
          Você poderá iniciar um debate, que aqui chamamos de diálogo, para compartilhar pontos de vista com outras pessoas sobre os assuntos
          que te preocupam em relação à cultura em Campo Grande.
          O espaço de diálogos abertos é destinado aos gestores, produtores, promotores da cultura local e também à comunidade artística. Sendo um desses agentes,
          você poderá expor seus argumentos e abrir uma conversa com todos.
          Considere que o debate não aciona nenhum mecanismo de atuação concreta. Mas alimenta as tomadas de decisão do Fórum Municipal de Cultura,
          identifica a necessidade de encontros presenciais específicos (assembleias, reuniões) como também contribui para a compreensão das necessidades da
          comunidade artística de Campo Grande.
        </p>
        <span class="headline-3 bolder mg-top16"> Recomendações para participar de um diálogo aberto</span>
        <p class="body-2 mg-top8 justify-text">
          1. Para iniciar um debate é necessário que você faça um cadastro na
          <router-link class="link body-2" to="/signUp"><strong>Plataforma Cartografia da Cultura</strong></router-link>.
          Os usuários cadastrados também podem participar das discussões já iniciadas através dos comentários e/ ou indicar se concorda ou não concorda
          clicando nos botões “👍” ou “👎” encontrados em cada debate proposto.
        </p>
        <p class="body-2 mg-top8 justify-text">
          2. Não escreva o título do debate ou frases inteiras em letras maiúsculas. Na Internet, isso é considerado o mesmo que gritar. E ninguém gosta disso.
        </p>
        <p class="body-2 mg-top8 justify-text">
          3. Qualquer debate ou comentário que implique em uma ação ilegal será deletado. Também  serão deletados comentários que tenham a intenção de sabotar o espaço de debate.
        </p>
        <p class="body-2 mg-top8 justify-text">
          4. As críticas duras são bem vindas. Este é um espaço de pensamento livre, mas recomendamos que, ainda que a crítica seja dura, também seja gentil e inteligente.
        </p>
        <p class="body-2 mg-top8 justify-text">
          5. Desfrute deste espaço, das vozes que o preenchem, ele também é seu.
        </p>
      </section>
      <!-- SECTION 2 -->
      <section
        v-if="currentStep === 2"
        id="section2"
        class="stepper-section"
      >
        <span class="title-1 bolder">Regras para iniciar um diálogo</span>
        <!-- 1 -->
        <span class="body-2 bolder mg-top16">1. Uma vez feito o login, você poderá:</span>
        <ol>
          <li class="body-2 justify-text">
            Iniciar um debate.
          </li>
          <li class="body-2 justify-text">
            Participar de um debate já iniciado por outro usuário.
          </li>
          <li class="body-2 justify-text">
            Concordar ou não concordar ao votar em um debate iniciado.
          </li>
        </ol>
        <!-- 2 -->
        <span class="body-2 bolder mg-top24">2. Para iniciar o debate: </span>
        <ol class="list">
          <li class="body-2 justify-text">
            insira um título que represente o assunto principal da discussão.
          </li>
          <li class="body-2 justify-text">
            insira um texto com sua argumentação diretamente na plataforma.
          </li>
          <li class="body-2 justify-text">
            escolha uma ou mais categorias relacionada ao assunto que quer discutir.
          </li>
        </ol>
        <!-- 3 -->
        <span class="body-2 bolder mg-top24">3. Uma vez iniciado o debate, você não poderá: </span>
        <ol class="list">
          <li class="body-2 justify-text">
            deletar o debate que você iniciou;
          </li>
          <li class="body-2 justify-text">
            deletar um comentário em um debate que você participou.
          </li>
        </ol>
        <!-- 4 -->
        <span class="body-2 bolder mg-top24">4. Serão deletados: </span>
        <ol class="list">
          <li class="body-2 justify-text">
            os comentários ofensivos, com discurso de ódio ou qualquer ato de comunicação que inferiorize ou incite contra uma pessoa ou grupo,
            tendo por base características como raça, gênero, etnia, nacionalidade, religião, orientação sexual ou outro aspecto passível de discriminação.
          </li>
          <li class="body-2 justify-text">
            qualquer comentário que implique em uma ação ilegal ou que tenham a intenção de sabotar o espaço de debate.
          </li>
        </ol>
        <!-- 5 -->
        <span class="body-2 bolder mg-top24">5. Recomendamos que: </span>
        <ol class="list">
          <li class="body-2 justify-text">
            Insira um texto revisado por você. Veja se está claro e objetivo.
          </li>
          <li class="body-2 justify-text">
            Seja gentil ao dialogar com as outras vozes que têm pontos de vista diferente do seu.
          </li>
        </ol>
        <!-- ACCEPT TERMS -->
        <div class="stepper-rules row al-items-center">
          <q-checkbox
            v-model="rulesAccepted"
            size="32px"
            color="black"
          />
          <span
            class="body-2 mg-left8"
          >
            Eu li e concordo com as
            <strong
              style="cursor: pointer"
              @click="scrollToTop()"
            >
              Regras da Plataforma
            </strong>.
          </span>
          <span class="caption mg-left8" :class="{ 'rules-accept-error' : rulesError }">(Esta opção deve ser marcada*)</span>
        </div>
      </section>
      <!-- SECTION 3 -->
      <section
        v-if="currentStep === 3"
        class="stepper-section"
      >
        <span class="title-3 bolder">Crie seu diálogo.</span>
        <span class="headline-3 bolder mg-top16">Título do seu diálogo</span>
        <span class="caption mg-top4">Insira um título que represente o assunto principal da discussão.</span>
        <!-- TITLE -->
        <q-input
          v-model.trim="title"
          class="input"
          dense
          square
          filled
          bottom-slots
          :error="$v.title.$error"
          :error-message="titleErrorMessage"
          @blur="$v.title.$touch"
        />

        <span class="headline-3 bolder">Texto do Diálogo</span>
        <span class="caption mg-top4">Insira um texto revisado por você. Veja se está claro e objetivo.</span>
        <!-- CONTENT -->
        <q-input
          v-model="content"
          class="input"
          type="textarea"
          counter
          dense
          square
          filled
          bottom-slots
          hint="máximo de 2000 caracteres"
          :error="$v.content.$error"
          :error-message="contentErrorMessage"
          @blur="$v.content.$touch"
        />
        <!-- CATEGORY -->
        <span class="headline-3 bolder mg-top16">Categoria do diálogo</span>
        <span class="caption mg-top8">1. Marque a opção que representa o tema principal do seu diálogo</span>
        <span class="caption">2. Marque as opções que se relacionam ao seu diálogo</span>
        <div class="category-field row no-wrap  mg-top8">
          <q-list class="category-list">
            <q-item
              v-for="item in options"
              :id="`item-${item.value}`"
              :key="item.value"
              class="category-list-item"
              clickable
              @click="tagEvent(item)"
            >
              <q-item-section
                class="category-list-item-section"
                avata
              >
                <!-- iconId -1 : index of array of icons (0 a 17) -->
                <icon-base
                  :id="`icon-${item.value}`"
                  class="category-list-icon"
                  :icon-id="item.value -1"
                  width="16"
                  :set-white="false"
                />
              </q-item-section>

              <q-item-section
                :id="`category-label-${item.value}`"
                class="category-list-item-section"
              >
                <span class="caption bolder">{{ item.label }}</span>
              </q-item-section>
            </q-item>
          </q-list>
          <!-- show tags -->
          <div class="tag-field">
            <div class="main-tag">
              <span id="label" class="caption">categoria principal</span>
              <div
                v-if="topicCategory !== null"
                class="main-tag-badge caption bolder"
                :style="{ 'color': topicCategory.color }"
              >
                <span class="caption bolder">{{ topicCategory.label }}</span>
                <i id="untag" class="far fa-times-circle mg-left16" @click="untagMain()" />
              </div>
            </div>
            <div class="related-tags">
              <span class="caption">categorias relacionadas</span>
              <div class="related-tags-grid">
                <div
                  v-for="item in categoriesTagged"
                  :key="item.value"
                  class="categorys-tags-badge"
                  :style="{ 'border-color': item.color }"
                >
                  <span
                    class="caption bolder"
                    :style="{ 'color': item.color }"
                  > {{ item.label }} </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- TERMS -->
        <div class="stepper-terms row no-wrap al-items-center">
          <q-checkbox
            v-model="termsAccepted"
            size="32px"
            color="black"
          />
          <span class="body-3 mg-left8">Eu li e concordo com os
            <router-link
              class="link"
              :to="{ path: '/terms', hash: '#terms'}"
            >
              <span
                class="body-3 bolder"
              >Termos de Uso</span>
            </router-link>
            e
            <router-link
              class="link"
              :to="{ path: '/terms', hash: '#privacity'}"
            >
              <span
                class="body-3 bolder"
              >Privacidade.</span>
            </router-link>
          </span>
        </div>
      </section>
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
        <span class="body-3 bolder stepper-btn-span text-uppercase mg-left16"> cancelar </span>
      </base-button>
      <base-button
        v-if="currentStep != numberOfSteps"
        class="stepper-btn"
        theme="flat"
        @click="nextStep()"
      >
        <span class="body-3 bolder stepper-btn-span text-uppercase"> Continuar </span>
        <i class="fas fa-arrow-right btn-icon mg-left16" />
      </base-button>
      <base-button
        v-if="currentStep === numberOfSteps"
        class="stepper-btn"
        :theme="formIsValid ? 'secondary' : 'disabled'"
        @click="submit()"
      >
        <!-- <i class="fas fa-plus reply-icon"></i> -->
        <span class="body-3 bolder text-uppercase"> Iniciar diálogo </span>
      </base-button>
    </div>
  </div>
</template>

<script>
import {
  required,
  minLength,
  maxLength,
  // alphaNum,
} from 'vuelidate/lib/validators';
import { mapGetters } from 'vuex';

import Identity from './Logo.vue';
import ColorLine from './ColorLine.vue';
import ProgressBar from './BaseStepProgressBar.vue';
import BaseButton from './BaseButton.vue';
import iconBase from './iconBase.vue';

export default {
  name: 'TopicCreator',
  components: {
    Identity,
    ColorLine,
    ProgressBar,
    BaseButton,
    iconBase,
  },
  data() {
    return {
      currentStep: 3,
      count: 0,
      numberOfSteps: 3,
      stepsTitle: ['O que são os Diálogos', 'Regras', 'Crie seu Diálogo'],
      rulesAccepted: false,
      rulesError: false,
      termsAccepted: false,
      title: '',
      content: '',
      topicCategory: null,
      hasSelected: false,
      categoriesTagged: [],
    };
  },
  validations: {
    title: {
      required,
      minLength: minLength(5),
      // alphaNum: (value) => (alphaNum(value)),
      validChars: (value) => (/^[a-zA-Z0-9\s]+$/ig).test(value),

    },
    content: {
      required,
      maxLength: maxLength(2000),
    },
  },
  computed: {
    ...mapGetters({
      options: 'categories/loadCategories',
    }),
    formIsValid() {
      if (this.$v.$anyError || this.rulesAccepted === false || this.termsAccepted === false || this.categoriesTagged.length === 0) {
        return false;
      }
      return true;
    },
    titleErrorMessage() {
      if (!this.$v.title.required) {
        return 'Esse campo é requerido';
      }
      if (!this.$v.title.validChars) {
        return 'Este campo deve conter apenas letras e números';
      }
      if (!this.$v.title.minLength) {
        return 'Mínimo de cinco dígitos';
      }
      return '';
    },
    contentErrorMessage() {
      if (!this.$v.title.required) {
        return 'Esse campo é requerido';
      }
      if (!this.$v.title.minLength) {
        return 'Mínimo de três dígitos';
      }
      return '';
    },
  },
  methods: {
    showDate() {
      console.log('data', new Date());
    },
    submit() {
      if (!this.$v.$anyError && this.formIsValid) {
        this.$store.dispatch('topics/createNewTopic', {
          data: {
            title: this.title,
            content: this.content,
            topicCategory: this.topicCategory,
            categoriesTagged: this.categoriesTagged,
          },
        }).then((response) => {
          console.log('topicCreator/submit');
          this.$router.push({ name: 'TopicPage', params: { topicId: response.id } }); // push nextPage here or store
        }).catch((error) => {
          if (error.message === 'Request failed with status code 400') {
            this.errorMessage = 'Escrever errors';
          }
          if (error.message === 'Request failed with status code 401') {
            this.errorMessage = 'Escrever errors';
          }
          if (error.message === 'timeout of 5000ms exceeded') {
            this.errorMessage = 'Escrever errors';
          }
          console.log('topicCreator/submit', error.message);
        });
      }
    },
    cancel() {
      this.$router.push({ name: 'Topics' });
    },
    tagEvent(sel) {
      if (this.topicCategory === null && this.categoriesTagged.length === 0) {
        this.tagMain(sel);
      } else if (this.categoriesTagged.some((tag) => tag === sel)) {
        console.log('hasBeenTagged', sel);
        const index = this.categoriesTagged.findIndex((el) => el.value === sel.value);
        const element = this.categoriesTagged[index];
        document.getElementById(`icon-${sel.value}`).getElementById('g').setAttribute('fill', `${element.color}`);
        document.getElementById(`category-label-${sel.value}`).style.color = '#000';
        document.getElementById(`item-${sel.value}`).style.borderRight = 'none';
        this.categoriesTagged.splice(index, 1);
        console.log('tag in array', this.categoriesTagged);
      } else {
        console.log('tagged', sel);
        this.categoriesTagged.push(sel);
        document.getElementById(`category-label-${sel.value}`).style.color = `${sel.color}`;
        document.getElementById(`item-${sel.value}`).style.borderRight = `2px solid ${sel.color}`;
      }
    },
    tagMain(sel) {
      console.log('sel', sel);
      this.topicCategory = sel;
      document.getElementById(`category-label-${sel.value}`).style.color = `${sel.color}`;
      this.hasSelected = true;
      const index = this.options.findIndex((el) => el.value === sel.value);
      this.options.splice(index, 1);
    },
    untagMain() {
      this.options.push(this.topicCategory);
      this.topicCategory = null;
    },
    nextStep() {
      if (this.currentStep === 2 && this.rulesAccepted === false) {
        this.rulesError = true;
      } else if (this.count <= (this.numberOfSteps)) {
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
        behavior: 'smooth',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/variables.scss';
@import '../styles/mixins.scss';

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
  // border: 1px solid #ddd;
}

.stepper-header {
  width: 100%;
  padding: 16px;
  padding-bottom: 0;
  // border-bottom: 1px solid #ddd;

  .progressbar {
    margin-top: 24px;
    // display: none;
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
  // border: 1px solid red;
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
  margin: 0;
}

li {
  margin-left: 32px;
}

.stepper-rules, .stepper-terms {
  margin-top: 32px;
}

.rules-accept-error {
  animation: shake 0.2s;
  color: red;
}

@keyframes shake {
  0% { transform: translateX(0px); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(0px); }
  75% { transform: translateX(5px); }
  100% { transform: translateX(0px); }
}

.link {
  text-decoration: none;
  color: black;
}

.justify-text {
  text-align: justify;
}

.category-list {
  margin-top: 16px;
  border: 1px solid #ddd;
  padding: 0 8px;
  border-radius: 2px;
}

.category-list-item {
  // max-height: 40px;
  width: 250px;
  padding: 4px 0 4px 0;
  margin-bottom: 4px;
}

.category-list-item-section {
  // display: block;
  align-items: center;
}

.category-list-icon {
  margin-right: 16px;
  // padding: 2px !important;
}

.tag-field {
  width: 100%;
  max-width: 450px;
  margin-left: 32px;
  margin-top: 16px;
  // border: 1px solid red;
}

.main-tag {
  display: flex;
  flex-flow: column nowrap;
  border: 1px solid #ddd;
  padding: 8px;
  border-radius: 2px;
  min-height: 56px;
  max-width: 250px;

  #label {
    margin-top: -4px;
    color: $gray3;
  }

}

.main-tag-badge {
  width: fit-content;
  border: 1px solid;
  padding: 2px 8px;
  border-radius: 2px;
  margin-top: 4px;
}

#untag {
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
}

.related-tags {
  margin-top: 32px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 2px;
  min-height: 100px;
  max-width: 350px;

  span {
    margin-top: -8px;
    color: $gray3;
  }
}

.related-tags-grid {
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;
}

.categorys-tags-badge {
  display: block;
  border: 1px solid;
  border-radius: 2px;
  height: min-content;
  padding: 2px 8px;
  margin: 4px 4px 4px 0;
}

@keyframes fadeInOpacity {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.input {
  margin-top: 4px;
  margin-bottom: 8px;
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
