<template>
<v-app>
<div class="container-app">
  <div class="container-quiz">
    <div class="header-quiz">
      <h1>Prova de Javascript</h1>
    </div>
    <div class="quiz-main" v-for="(question,index) in questions.slice(a, b)" :key="index" v-show="showQuestion">
      <div class="box-question">
        <h2>Questão {{b}}/{{questions.length}}</h2>
        <p>{{question.question}}</p>
      </div>
      <div class="box-propositions">
        <ul>
          <li 
            v-for="(proposition,index) in question.propositions" 
            :class="select ? check(proposition.correct) : ''" 
            :key="index"
            @click="selectResponse(proposition, index)"
          >
            {{proposition.props}}
          </li>
        </ul>
      </div>
    </div>
    <div class="box-score" v-show="showScore">
      <div class="showScore">
        <h2>Acertos: {{acertos}}</h2>
        <h2>Erros: {{erros}}</h2>
      </div>
    </div>
    <div class="footer-quiz" v-show="showButtons">
      <div class="box-button">
        <button @click="skipQuestion">Pular</button>
        <button @click="nextQuestion">Próxima</button>
      </div>
    </div>
    <div class="btn-restart" v-show="showRestartQuestions">
        <v-btn 
          width="300" 
          height="50" 
          class="blue rounded-lg white--text"
          elevation="2"
          @click="restartQuestions"
        >
          Recomeçar
          <v-icon right>
            mdi-restart
          </v-icon>
        </v-btn>
      </div>
  </div>
</div>
</v-app>
</template>

<script>
import api from '../../services/api';
export default {
  data(){
    return {
      questions: null,
      a: 0,
      b: 1,
      select: false,
      acertos: 0,
      erros: 0,
      showScore: false,
      showQuestion: true,
      showRestartQuestions: false,
      showButtons: true,
      question_id: '',
      user_id: null,
    }
  },
  methods: {
    selectResponse(question){
      this.select = true;
      if(question.correct){
        this.acertos++;
      }else {
        this.erros++;
      }
    },
    check(status){
      if(status){
        return 'correct'
      } else {
        return 'incorrect'
      }
    },
    nextQuestion(){
      if(this.b < this.questions.length + 1 && this.select){
        this.a += 1;
        this.b += 1;
        this.select = false;
      }
      if(this.b === this.questions.length + 1){
        this.showScore = true;
        this.showQuestion = false;
        this.select = false;
        this.showRestartQuestions = true;
        this.showButtons = false;
      }
    },
    skipQuestion(){
      if(this.b < this.questions.length + 1){
        this.a += 1;
        this.b += 1;
        this.select = false;
      }

      if(this.b === this.questions.length + 1){
        this.showScore = true;
        this.showQuestion = false;
        this.select = false;
        this.showRestartQuestions = true;
        this.showButtons = false;
      }
    },
    restartQuestions(){
      this.a = 0;
      this.b = 1;
      this.showScore = false;
      this.showQuestion = true,
      this.showRestartQuestions = false;
      this.showButtons = true;
    }
  },
   async created(){
    this.$emit('Routes', this.$router)
    this.user_id = JSON.parse(localStorage.getItem('@user:'));
    this.question_id = this.$router.history.current.params.question_id

    const response = await api.get(`/question/listById/${this.question_id}`, {
      headers: {
        user_id: this.user_id,
      }
    })

    this.questions = [response.data];
    console.log('Questions Atual', this.questions);
  }
}
</script>

<style src="./styles.css" lang="css" scoped/>
