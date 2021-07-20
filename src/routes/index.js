import Vue from 'vue';
import Router from 'vue-router';
import Login from '../views/Login';
import Question from '../views/Question';
import Cadastro from '../views/CreateUser';
import ListQuestions from '../views/ListQuestions';
import CreateSchoolTest from '../views/CreateSchoolTest';

Vue.use(Router);

const routes = [
    {
      path: '/',
      redirect: '/login',
      
    },
    {
      name: 'Login',
      path: '/login',
      component: Login,
      
    },
  {
    name: 'Question',
    path: '/question',
    component: Question,   
  },
  {
    name: 'CreateUser',
    path: '/create-user',
    component: Cadastro 
  },
  {
    name: 'Provas',
    path: '/list-questions',
    component: ListQuestions,
  },
  {
    name: 'Cadastro Avaliação',
    path: '/create-school-test',
    component: CreateSchoolTest,
  },
]

const router = new Router({ routes });

export default router;