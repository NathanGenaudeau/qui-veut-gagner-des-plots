<template>
  <div class="home">

    <div class="paliers">
      <div class="palier">3000 <img class="plot_png" src="plot.png" alt="plots"/></div>
      <div>1000 <img class="plot_png" src="plot.png" alt="plots"/></div>
      <div>500 <img class="plot_png" src="/plot.png" alt="plots"/></div>
      <div>300 <img class="plot_png" src="/plot.png" alt="plots"/></div>
      <div>180 <img class="plot_png" src="/plot.png" alt="plots"/></div>
      <div class="palier">120 <img class="plot_png" src="plot.png" alt="plots"/></div>
      <div>80 <img class="plot_png" src="plot.png" alt="plots"/></div>
      <div>60 <img class="plot_png" src="plot.png" alt="plots"/></div>
      <div>40 <img class="plot_png" src="plot.png" alt="plots"/></div>
      <div>20 <img class="plot_png" src="plot.png" alt="plots"/></div>
      <div class="palier">10 <img class="plot_png" src="plot.png" alt="plots"/></div>
      <div>5 <img class="plot_png" src="plot.png" alt="plots"/></div>
      <div>3 <img class="plot_png" src="plot.png" alt="plots"/></div>
      <div>2 <img class="plot_png" src="plot.png" alt="plots"/></div>
      <div class="currentLevel">1 <img class="plot_png" src="plot.png" alt="plots"/></div>
    </div>

    <div class="parent">
      <Question :question=questions[currentQuestion].question :responses="questions[currentQuestion].responses" @answerChoosen="afterClick"/>
      <div class="bonus">
        <div>50/50</div>
        <div>Appel</div>
        <div>Vote</div>
        <div>Mystère</div>
      </div>
    </div>

    <div class="show" @click="showOne"></div>
    <div class="next" @click="nextQuestion" :disabled="disableButton"></div>
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
        if (answers[i].classList.contains('good')) answers[i].classList.remove('good');
        if (answers[i].classList.contains('bad')) answers[i].classList.remove('bad');
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
      const goodRep = this.questions[this.currentQuestion].responses.find(resp => resp.isGood === true);
      const answers = document.getElementsByClassName('response');

      if (!response.isGood) {
        for (let i = 0; i < answers.length; i++) {
          if (answers[i].innerHTML === goodRep.text) {
            answers[i].classList.add('good');
          }
        }
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
}

.paliers {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.paliers > div {
  width: 110px;
  height: 100%;
  background-color: #A5A7A7;
  border-radius: 5px;
  margin: 1px;
  padding-right: 10px;
  padding-block: 3px;
  display: flex;
  justify-content: right;
  align-items: center;
  font-size: 1.2em;
  border: 2px solid #000;
}
.palier {
  font-weight: bold;
  border: 3px solid black!important;
  background-color: #C5C7C7!important;
}
.parent {
  position: relative;
}
.bonus {
  position: absolute;
  top: 150px;
  left: -200px;
}
.bonus > div {
  width: 100px;
  height: 50px;
  background-color: green;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  margin: 5px;
  align-items: center;
  font-size: 1.2em;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
}
.next {
  display: flex;
  width: 50px;
  height: 25px;
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
