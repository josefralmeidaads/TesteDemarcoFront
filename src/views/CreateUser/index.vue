<template>
  <div class="container">
    <form class="container-form" @submit.prevent="teste">
      <v-img
        src="../../assets/add-user.png"
        max-height="150"
        max-width="150" 
        contain
        class="my-5"
      />
      <input v-model="name" type="text" placeholder="Digite o nome">
      <input v-model="password" type="password" placeholder="Digite sua senha">
      <input v-model="email" type="email" placeholder="Digite seu email">
      <select v-model="type" name="typeUser">
        <option selected disabled>:: Quem você é ?::</option>
        <option value="professor">Professor</option>
        <option value="aluno">Aluno</option>
      </select>
      <div class="button-container">
        <v-btn type="submit" class="green white--text">
          Cadastrar
        </v-btn>
        <v-btn @click="cancelCreateUser" class="red white--text">
          Cancelar
        </v-btn>
      </div>
    </form>
  </div>
</template>

<script>
import api from '../../services/api';

export default {
  data(){
    return {
      name: '',
      password: '',
      email: '',
      type: '',
    }
  },
  methods: {
    cancelCreateUser(){
      this.$router.back()
    },
    async teste(){
      try{
        await api.post('/user', {
          name: this.name,
          password: this.password,
          email: this.email,
          type: this.type,
        })

        this.$toast.open({
          message: 'Usuário Cadastrado com sucesso',
          type: 'success',
          duration: 3000,
        })

        this.$router.push('/login');
      }catch(err){
        this.$toast.open({
          message: err.response.data,
          type: 'error',
          duration: 3000,
        })
      }
    }
  },
  created(){
    this.$emit('Routes', this.$router)
  }
}
</script>

<style src="./styles.css" lang="css" scoped/>

