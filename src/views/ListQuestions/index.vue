<template>
  <div class="container">
    <div class="container-card-avaliation">
        <h2 v-show="user.type === 'professor'">Provas Cadastradas</h2>
        <h2 v-show="user.type === 'aluno'">Provas</h2>
      <ul>
        <li 
          v-for="(question, index) in questions"
          :key="index" 
        >
          {{question.name}}
          <v-btn 
            @click="handleMoveQuestion(question._id)" 
            text class="blue white--text"
            v-show="user.type !== 'professor'"
          >
            Fazer
          </v-btn>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import api from '../../services/api';
  export default {
    data(){
    return {
      user: null,
      questions: null,
    }
    },
    async created(){
      this.$emit('Routes', this.$router)
      this.user = JSON.parse(localStorage.getItem('@user:'));

      if(this.user === 'professor'){
        const response = await api.get('/question/listByTeacher', {
          headers: {
            user_id: this.user._id
          }
        })
        this.questions = response.data;
      }else {
        const response = await api.get('/question', {
          headers: {
            user_id: this.user._id
          }
        })
        this.questions = response.data;
      }
    },
    methods: {
      handleMoveQuestion(question){
        this.$router.push({ name: 'Question',  params: { question_id: question }});
      }
    },
    watch: {
      questions(){
        console.log('Questions ->', this.questions[0])
      }
    }
  }
</script>

<style src="./styles.css" scoped/>