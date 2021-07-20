<template>
  <div class="container">
    <form @submit.prevent="navigatePanel" class="container-form">
       <v-img 
        src="../../assets/avatares.png"
        max-width="150"
        max-height="150"
        contain
      />
      <input 
        type="email" 
        :class="onFocusText && 'focus'" 
        v-model="email" 
        v-on:focus="setFocusText"
        v-on:blur="setBlurText" 
        placeholder="Email"
      />
      <input 
        type="password"
        :class="onFocusPassword && 'focus'"  
        v-model="password"
        v-on:focus="setFocusPassword"
        v-on:blur="setBlurPassword"  
        placeholder="Senha"
      />

      <div class="buttonsForm">
        <v-btn type="submit" class="success" >
          Logar
        </v-btn>
        <v-btn @click="navigateCreateUser" class="accent">
          Cadastrar
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
      email: '',
      password: '',
      onFocusText: false,
      onFocusPassword: false,
    }
  },
  methods: {
    async navigatePanel(){
      try{
        const response = await api.post('/sessions', {
          email: this.email,
          password: this.password
        })
        this.$toast.open({
          message: 'Você será redirecionado a página principal'
        })
        localStorage.setItem('@user:', JSON.stringify(response.data));
        this.$router.push('/list-questions');
      }catch(err){
        this.$toast.open({ 
          message: err?.response?.data,
          type:'error',
          duration: 3000
        })
      }
    },
    navigateCreateUser(){
      this.$router.push('/create-user')
    },
    setFocusText(){
     this.onFocusText = true;
    },
    setBlurText(){
      this.onFocusText = false;
    },
    setFocusPassword(){
     this.onFocusPassword = true;
    },
    setBlurPassword(){
      this.onFocusPassword = false;
    }
  },
  created(){
    this.$emit('Routes', this.$router)
  }
}
</script>

<style src="./styles.css" lang="css" scoped/>