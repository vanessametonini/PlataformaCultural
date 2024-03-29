<template>
  <section class="stepper-section">
    <span
      v-if="editMode"
      class="title-3 bolder"
    >Edite seu debate</span>
    <span
      v-else
      class="title-3 bolder"
    >Crie seu debate</span>
    <label
      for="titulo"
      class="headline-3 bolder mg-top16"
    >
      Título*
    </label>
    <span class="caption mg-top4">
      Insira um título curto que represente o assunto principal da
      discussão.
    </span>
    <!-- TITLE -->
    <q-input
      id="titulo"
      v-model="title"
      class="titulo"
      dense
      square
      bottom-slots
      counter
      maxlength="100"
      :error="$v.title.$error"
      :error-message="titleErrorMessage"
      @blur="$v.title.$touch"
    />

    <label
      for="texto"
      class="headline-3 bolder"
    >
      Texto argumentativo*
    </label>
    <span class="caption mg-top4">
      Insira um texto sobre o assunto que quer discutir, apresente seu ponto de vista.
    </span>
    <!-- CONTENT -->
    <q-field
      id="texto"
      v-model="content"
      type="textarea"
      class="conteudo"
      min-height="5rem"
      color="black"
      borderless
      dense
      square
      bottom-slots
      counter
      maxlength="2000"
      hint="Máximo de 2000 caracteres"
      :error="$v.content.$error"
      :error-message="contentErrorMessage"
      @blur="$v.content.$touch"
    >
      <q-editor
        v-model="content"
        dense
        square
        class="editor"
        :toolbar="[
          ['bold', 'italic', 'strike', 'underline', 'link',],
          ['hr', 'quote'],
          ['unordered', 'ordered', 'outdent', 'indent'],
          ['undo', 'redo', 'removeFormat'],
          ['viewsource']
        ]"
        @input="sanitize(content)"
      />
    </q-field>
    <!-- CATEGORY -->
    <span class="headline-3 bolder mg-top16">Categoria do debate</span>
    <span class="caption mg-top8">
      1. Selecione primeiro a categoria principal relacionada ao assunto do 
      debate.
    </span>
    <span class="caption">
      2. Caso queira, selecione outras categorias complementares.
    </span>
    <div class="category-field mg-top8">
      <q-list class="category-list">
        <q-item
          v-for="item in options"
          :id="`item-${item.value}`"
          :key="item.value"
          clickable
          @click="tagCategory(item)"
        >
          <q-item-section avata>
            <span :class="`icon-${item.value}`" />
          </q-item-section>

          <q-item-section
            :id="`category-label-${item.value}`"
            class="category-label"
          >
            <span class="caption bolder">{{ item.label }}</span>
          </q-item-section>
        </q-item>
      </q-list>
      <!-- show tags -->
      <div class="tag-field">
        <q-field
          v-model="category"
          borderless
          dense
          :value="category"
          class="main-tag"
          label="categoria principal*"
          :error="$v.category.$error"
          :error-message="categoryErrorMessage"
          @blur="$v.category.$touch"
        >
          <div
            v-if="category !== null"
            class="main-tag-badge caption bolder"
            :style="{ color: category.color }"
            @click="untagCategory(category)"
          >
            <!-- <span class="caption bolder" v-if="categoryField">{{ categoryField }}</span> -->
            <span class="caption bolder">{{ category.label }}</span>
            <i
              id="untag"
              class="far fa-times-circle mg-left16"
            />
          </div>
        </q-field>

        <q-field
          v-model="categoriesTagged"
          type="textarea"
          borderless
          dense
          square
          bottom-slots
          class="related-tags"
          label="categorias complementares"
          aria-live="polite"
        >
          <div class="related-tags-grid">
            <div
              v-for="(item, index) in categoriesTagged"
              :key="item.value"
              class="categorys-tags-badge"
              :style="{ 'border-color': item.color, color: item.color }"
              @click="untagCategory(index)"
            >
              <span
                class="caption bolder"
              >
                {{ item.label }}
              </span>
              <i
                id="untag"
                class="far fa-times-circle mg-left16"
              />
            </div>
          </div>
        </q-field>
      </div>
    </div>
    <div
      v-if="editMode"
      class="mg-top32"
      align="right"
    >
      <q-btn
        outline
        color="black"
        @click="updateTopic()"
      >
        <span class="caption">Atualizar</span>
      </q-btn>
    </div>
  </section>
</template>

<script>
import {
  required,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
import { createHelpers } from "vuex-map-fields";

const { mapFields } = createHelpers({
  getterType: "topics/getField",
  mutationType: "topics/updateField",
});

const hasCategory = (category) => category !== null;

export default {
  name: 'TopicForm',
  props: {
    editMode: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
        options: [],
        categoryField: '',
    };
  },
  validations: {
    title: {
      required,
      minLength: minLength(5),
      maxLength: maxLength(100),
    },
    content: {
      required,
      minLength: minLength(5),
      maxLength: maxLength(2000),
    },
    category: {
      hasCategory
    }
  },
  computed: {
    ...mapFields({
      title: "topicForm.title",
      category: "topicForm.categoryId",
      categoriesTagged: "topicForm.categoriesTagged",
      content: "topicForm.content",
    }),
    ...mapGetters({
      categories: "categories/loadCategories",
    }),
    currentCategoriesTagged() {
      let categoriesTaggedArray = []
        if(this.categoriesTagged.length > 0) {
          this.categoriesTagged.forEach(element => {
              categoriesTaggedArray.push(this.$store.getters['categories/getCategoryById'](element))
          })
        }
      return categoriesTaggedArray
    },
    titleErrorMessage() {
      if (!this.$v.title.required) {
        return "Campo obrigatório";
      }
      if (!this.$v.title.minLength) {
        return "Mínimo de 5 caracteres";
      }
      if (!this.$v.title.maxLength) {
        return "Máximo de 100 caracteres";
      }
      return "";
    },
    contentErrorMessage() {
      if (!this.$v.content.required) {
        return "Campo obrigatório";
      }
      if (!this.$v.content.minLength) {
        return "Mínimo de 5 caracteres";
      }
      if (!this.$v.content.maxLength) {
        return "Mínimo de 2000 caracteres";
      }
      return "";
    },
    termsErrorMessage() {
      return "É necessário aceitar os termos";
    },
    categoryErrorMessage() {
      return "É necessário escolher um tema";
    },
  },
  created() {
    this.options = [...this.categories];   
  },
  mounted() {
    if (this.editMode == false) {
      this.title = '',
      this.category = null,
      this.categoriesTagged = [],
      this.content = ''
    }

    if(this.$route.params.action === "edit") {
      this.fetchStorage();
    }
  },
  methods: {
    sanitize(value) {
      this.content = this.$sanitize(value);
    },
    tagCategory(category) {
      if ((this.category === null) && (!(this.categoriesTagged.includes(category)))) {
          this.category = category;
      } else if((category.id !== this.category.id) && (!this.categoriesTagged.includes(category))) {
        let catArray = this.categoriesTagged;
        catArray.push(category);
        this.categoriesTagged = catArray;
      }
    },
    untagCategory(element) {
      if(element === this.category) {
        this.category = null;
      } else {
        this.categoriesTagged.splice(element, 1);
      }

    },
    updateTopic() {
      this.$v.$touch();
      if(!this.$v.$anyError) {
        this.$store.dispatch("topics/updateTopic", { $socket: this.$socket })
      }
      else {
        this.$q.notify({
          message: "Por favor, preencha todos os campos para o debate",
          position: 'top-right',
        });
      }
    },
     fetchStorage() {
      this.$store.dispatch('topics/fetchStorage');
    },
  }
}

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

.stepper-section {
  padding: 26px;
  background-color: #f5f5f5;
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
    padding: 0 4px;
    border-radius: 2px;
    margin-right: 20px;

    .category-label {
      max-width: 75%;
    }

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


@media screen and (min-width: 1024px) {
  
  .stepper-section {
    max-width: 586px;
  }

  .category-list {
    padding: 0 8px;
    margin-right: 32px;
  }
}

@media screen and (min-width: 1800px) {
  .stepper-section {
    max-width: 616px;
  }
}
</style>
