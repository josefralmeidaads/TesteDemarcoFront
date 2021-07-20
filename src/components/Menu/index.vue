<template>
<v-card class="mx-auto overflow-hidden" height="100%" width="100%">
  <v-app-bar color="orange" dark v-show="showBar">
    <v-app-bar-nav-icon @click="drawer = true" />
    <v-toolbar-title class="mx-auto">{{titleBar}}</v-toolbar-title>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn dark v-bind="attrs" v-on="on" text @click="signOut">
          <v-icon>mdi-power</v-icon>
        </v-btn>
      </template>
      <span>Sair</span>
    </v-tooltip>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" absolute temporary>
    <v-list nav dense class="orange" height="100%">
      <v-list-item-group v-model="group" active-class="white--text text--accent-4">
        
        <v-list-item @click="handleMoveQuestions">
          <v-list-item-icon>
            <v-icon>mdi-clipboard-text</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Provas</v-list-item-title>
        </v-list-item>

        <v-list-item v-show="user.type === 'professor'" @click="handleMoveCreateSchoolTest">
          <v-list-item-icon>
            <v-icon>mdi-clipboard-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Cadastrar Avaliação</v-list-item-title>
        </v-list-item>

      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
    <router-view v-on:Routes="setRouter" />
</v-card>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
    rota: '',
    showBar: true,
    titleBar: '',
    user: null,
  }),
  methods: {
    signOut() {
      localStorage.removeItem('@user:');
      this.$router.push('login');
    },
    handleMoveQuestions() {
      this.$router.push('list-questions')
    },
    handleMoveCreateSchoolTest() {
      this.$router.push('create-school-test')
    },
    setRouter(router) {
      this.titleBar = String(router.history.current.name).trim();
      this.rota = String(router.history.current.path).trim();
      if (this.rota === '/login') {
        this.showBar = false;
        return;
      }
      if (this.rota === '/create-user') {
        this.showBar = false;
        return;
      } else {
        this.showBar = true;
      }
    }
  },
  created(){
    this.user = JSON.parse(localStorage.getItem('@user:'));
    console.log(this.user);
  }
}
</script>
