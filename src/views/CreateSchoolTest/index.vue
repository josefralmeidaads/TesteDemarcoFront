<template>
<div class="container">
  <div class="container-form" v-for="(questions, indexM) in questions.slice(a, b)" :key="indexM">
    <v-btn @click="addQuestion(proposition)" class="orange lighten-2 ml-auto" icon>
      <v-icon>
        mdi-plus
      </v-icon>
    </v-btn>
    <v-img src="../../assets/clipboard.png" contain max-height="200" max-width="200" class="orange lighten-2 my-4 rounded-circle" />
    <form @submit.prevent="saveProof">
      <input v-model="questions.name" type="text" placeholder="Digite o nome da avaliação">
      <input v-model="questions.question" type="text" placeholder="Digite a questão da avaliação">
      <div class="questions" v-for="(proposition, index) in questions.propositions" :key="index">
        <input type="text" placeholder="Digite as respostas" v-model="proposition.props" />

        <v-btn @click="addAnswer(indexM)" class="orange lighten-2" icon>
          <v-icon>
            mdi-plus
          </v-icon>
        </v-btn>
        <v-switch class="ml-1" color="orange lighten-3" v-model="proposition.correct" />
      </div>

      <div class="buttons-form">
        <v-btn type="submit" class="green white--text">Salvar</v-btn>
        <v-btn class="red white--text">Cancelar</v-btn>
      </div>
    </form>
  </div>
</div>
</template>

<script>
import api from '../../services/api';

export default {
  data() {
    return {
      questions: 
      [
        {
          name: '',
          question: '',
          propositions: [{
            props: '',
            correct: false,
          }],
          user: null,
        },
      ],
      a: 0,
      b: 1,
    }
  },
  methods: {
    addQuestion(){
      if(this.questions.length >= 5){
        this.$toast.open({
          message: 'A prova pode ter somente 5 alternativas',
          duration: 3000,
          type: 'warning'
        })
        return;
      }
      this.questions.push(
        {
          name: '',
          question: '',
          propositions: [{
            props: '',
            correct: false,
          }],
          user: null,
        }
      )
      this.a++;
      this.b++;
    },
    addAnswer(index) {
      console.log('Index', index);
      if(this.questions[index].propositions.length >= 5){
        this.$toast.open({
          message: 'A prova pode ter somente 5 alternativas',
          duration: 3000,
          type: 'warning'
        })
        return
      }
      this.questions[index].propositions.push({
        props: '',
        correct: false
      })
    },
    async saveProof(){
      try{
        await api.post('/question', {
          name: this.name,
          question: this.question,
          propositions: this.propositions,
        }, {
          headers: {
            user_id: this.user._id
          }
        })
        this.$toast.open({
          message: 'Prova cadastrada com sucesso',
          duration: 3000,
          type: 'success'
        })
      }catch(err){
        this.$toast.open({
          message: err.response.data,
          duration: 3000,
          type: 'error'
        })
      }
    }
  },
  created() {
    this.$emit('Routes', this.$router);
    this.user = JSON.parse(localStorage.getItem('@user:'));
    console.log('User este', this.user._id);
  }
}
</script>

<style src="./styles.css" scoped/>
