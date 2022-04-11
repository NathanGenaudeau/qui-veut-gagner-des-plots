<template>
  <div class="home">

    <div class="paliers">
      <div>3000 <img class="plot_png" src="plot.png" alt="plots"/></div>
      <div>1000 <img class="plot_png" src="plot.png" alt="plots"/></div>
      <div>500 <img class="plot_png" src="/plot.png" alt="plots"/></div>
      <div>300 <img class="plot_png" src="/plot.png" alt="plots"/></div>
      <div>180 <img class="plot_png" src="/plot.png" alt="plots"/></div>
      <div>120 <img class="plot_png" src="plot.png" alt="plots"/></div>
      <div>80 <img class="plot_png" src="plot.png" alt="plots"/></div>
      <div>60 <img class="plot_png" src="plot.png" alt="plots"/></div>
      <div>40 <img class="plot_png" src="plot.png" alt="plots"/></div>
      <div>20 <img class="plot_png" src="plot.png" alt="plots"/></div>
      <div>10 <img class="plot_png" src="plot.png" alt="plots"/></div>
      <div>5 <img class="plot_png" src="plot.png" alt="plots"/></div>
      <div>3 <img class="plot_png" src="plot.png" alt="plots"/></div>
      <div>2 <img class="plot_png" src="plot.png" alt="plots"/></div>
      <div class="currentLevel">1 <img class="plot_png" src="plot.png" alt="plots"/></div>
    </div>

    <div>
      <!--<div>Question n°{{ currentQuestion+1 }}</div>-->
      <!-- todo ajouter fondu pour apparition des réponses-->
      <Question :question=questions[currentQuestion].question :responses="questions[currentQuestion].responses" @answerChoosen="afterClick"/>
    </div>
    <button class="show" @click="showOne"></button>
    <button class="next" @click="nextQuestion" :disabled="disableButton"></button>
    <div>https://github.com/NathanGenaudeau/application-quiz/blob/main/src/views/Quiz.vue</div>
  </div>
</template>

<script>
import Question from '@/components/Question.vue';
import QuestionsList from '@/assets/questions.json';

export default {
  name: 'Home',

  components: {
    Question,
  },

  data() {
    return {
      questions: QuestionsList.questions,
      disableButton: false,
      currentQuestion: 0,
    }
  },
  methods: {
    nextQuestion() {
      this.currentQuestion++;
      const answers = document.getElementsByClassName('response');
      for (let i = 0; i < answers.length; i++) {
        answers[i].style.color = 'transparent';
        answers[i].style.backgroundColor = '#FAFAFA';
      }
      this.disableButton = this.currentQuestion + 1 >= this.questions.length;
      const nbPlots = document.getElementsByClassName('currentLevel')[0];
      nbPlots.classList.remove('currentLevel');
      nbPlots.previousElementSibling.classList.add('currentLevel');
    },
    showOne() {
      const resp = document.getElementsByClassName('response');
      for (let i = 0; i < resp.length; i++) {
        if (resp[i].style.color !== 'rgb(0, 0, 0)') {
          resp[i].style.color = '#000';
          break;
        }
      }
    },
    afterClick(response) {
      /*const responses = document.getElementsByClassName('response');
      let resp = '';
      for (let i = 0; i < responses.length; i++) {
        if (responses[i].innerHTML === response.text) {
          resp = responses[i];
        }
      }*/
      if (response.isGood) {
        // resp.classList.add('good');
        console.log('Bravo, vous avez trouvé la réponse !');
      } else {
        // resp.classList.add('bad');
        console.log('Dommage, vous n\'avez pas trouvé la réponse !');
      }
    }
  },
};
</script>

<style>
.home {
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 1080px;
  background-image: url("fond_pdc.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  /*background-image: linear-gradient( 106.9deg,  rgba(148,14,60,1) 60.9%, rgba(3,22,27,1) 122.3% );
  background-image: linear-gradient( 89.4deg,  rgba(194,0,39,1) 0.8%, rgba(10,35,104,1) 99.4% );
  background-image: linear-gradient( 89.8deg,  rgba(222,74,74,1) 4.7%, rgba(30,29,29,1) 120.3% );
  background-color: #FAD961;
  background-image: linear-gradient(90deg, #FAD961 0%, #F76B1C 100%);*/
}

.paliers {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.paliers > div {
  width: 110px;
  height: 100%;
  background-color: #fefefe;
  border-radius: 5px;
  margin: 1px;
  padding-right: 10px;
  padding-block: 3px;
  display: flex;
  justify-content: right;
  align-items: center;
  font-size: 1.2em;
  /*font-weight: bold;*/
  border: 2px solid #000;
}
.next {
  display: flex;
  width: 50px;
  height: 25px;
  /*background-color: #fff;
  border-radius: 5px;
  margin: 1px;
  justify-content: center;
  align-items: center;*/
}
.show {
  display: flex;
  width: 50px;
  height: 25px;
}
.currentLevel {
  background-color: #FF7E09!important;
  color: white;
  font-weight: bold;
  border: 3px solid black!important;
}
.plot_png {
  margin-left: 5px;
  width: 15px;
  height: 18px;
}
</style>
