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
      <Question :question=questions[currentQuestion].question :responses="questions[currentQuestion].responses" @answerChoosen="afterClick"/>
    </div>
    <button class="next" @click="nextQuestion" :disabled="disableButton">Question suivante</button>
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
      this.currentQuestion++
      this.disableButton = this.currentQuestion + 1 >= this.questions.length;
      const nbPlots = document.getElementsByClassName('currentLevel')[0];
      nbPlots.classList.remove('currentLevel');
      nbPlots.previousElementSibling.classList.add('currentLevel');
    },
    afterClick(value) {
      console.log(value);
    }
  },
};
</script>

<style>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: #29539b;
  height: 940px;
  background-image: linear-gradient(315deg, #29539b 0%, #1e3b70 74%);
}

.paliers {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.paliers > div {
  width: 110px;
  height: 100%;
  background-color: #fff;
  border-radius: 5px;
  margin: 1px;
  padding-right: 10px;
  padding-block: 3px;
  display: flex;
  justify-content: right;
  align-items: center;
  font-weight: bold;
  font-size: 1.2em;
}
.next {
  width: 200px;
  height: 50px;
  background-color: #fff;
  border-radius: 5px;
  margin: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.currentLevel {
  background-color: orange!important;
}
.plot_png {
  margin-left: 5px;
  width: 15px;
  height: 18px;
}
</style>
