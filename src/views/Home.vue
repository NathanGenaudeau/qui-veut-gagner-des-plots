<template>
  <div class="home">

    <div class="paliers">
      <div class="palier">3000 <img class="plot_png" src="plot.png" alt="plots"/></div>
      <div>1000 <img class="plot_png" src="plot.png" alt="plots"/></div>
      <div>500 <img class="plot_png" src="plot.png" alt="plots"/></div>
      <div>300 <img class="plot_png" src="plot.png" alt="plots"/></div>
      <div>180 <img class="plot_png" src="plot.png" alt="plots"/></div>
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
        <div class="bonus1" @click="bonusMoitie('bonus1')">50/50</div>
        <div class="bonus2" @click="bonus('bonus2')">Appel</div>
        <div class="bonus3" @click="bonus('bonus3')">Public</div>
      </div>
    </div>
    <div class="footer">
      <div @click="showOne"></div>
      <div @click="nextQuestion"></div>
      <div @click="getGains('stop')"></div>
    </div>

    <Modal :show="showModal" @close="showModal = false" :headerMsg="headerMsg">
      <template v-slot:body>
        <div>Félicitation tu repars avec {{ gains }} plots</div>
      </template>
    </Modal>
  </div>
</template>

<script>
import Question from '@/components/Question.vue';
import Modal from '@/components/Modal.vue';
import QuestionsList from '@/assets/questionsDwearky.json';

export default {
  name: 'Home',

  components: {
    Question,
    Modal,
  },

  data() {
    return {
      questions: QuestionsList.questions,
      currentQuestion: 0,

      showModal: false,
      headerMsg: '',
      gains: 0,
    }
  },
  methods: {
    nextQuestion() {
      const audio = new Audio('question_qvgdp.mp3');
      audio.volume = 0.1;
      audio.play();
      this.currentQuestion++;
      const answers = document.getElementsByClassName('response');
      for (let i = 0; i < answers.length; i++) {
        answers[i].style.color = 'transparent';
        if (answers[i].classList.contains('good')) answers[i].classList.remove('good');
        if (answers[i].classList.contains('bad')) answers[i].classList.remove('bad');
      }
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
        setTimeout(() => {
          this.getGains('lose');
        }, 5000);
      }
      else {
        if (this.currentQuestion === this.questions.length - 1) {
          this.getGains('win');
        }
      }
    },
    getGains(state) {
      switch (state) {
        case 'win':
          this.gains = document.getElementsByClassName('currentLevel')[0].innerHTML.split(' ')[0];
          this.showModal = true;
          this.headerMsg = 'C\'est gagné !';
          break;
        case 'stop':
          const gainsStop = document.getElementsByClassName('currentLevel')[0];
          this.gains = gainsStop.nextElementSibling ? gainsStop.nextElementSibling.innerHTML.split(' ')[0] : 0;
          this.showModal = true;
          this.headerMsg = 'C\'est terminé !';
          break;
        case 'lose':
          let gains = document.getElementsByClassName('currentLevel')[0].nextElementSibling || document.getElementsByClassName('currentLevel')[0];
          while (!gains.classList.contains('palier') && gains.nextElementSibling) {
            gains = gains.nextElementSibling;
          }
          this.gains = gains.nextElementSibling ? gains.innerHTML.split(' ')[0] : 0;
          this.showModal = true;
          this.headerMsg = 'C\'est perdu !';
          break;
      }
    },
    generateRandom(min, max, exclude, exclude2) {
      const num = Math.floor(Math.random() * (max - min + 1)) + min;
      return (num === exclude || num === exclude2) ? this.generateRandom(min, max, exclude, exclude2) : num;
    },
    bonus(elem) {
      const element = document.getElementsByClassName(elem)[0];
      element.classList.add('used');
    },
    bonusMoitie(elem) {
      this.bonus(elem);
      const goodRep = this.questions[this.currentQuestion].responses.find(resp => resp.isGood === true);
      const answers = document.getElementsByClassName('response');

      for (let i = 0; i < answers.length; i++) {
        if (answers[i].innerHTML === goodRep.text) {
          const random = this.generateRandom(0,3, i, i);
          const random2 = this.generateRandom(0,3, i, random);
          setTimeout(() => {
            answers[random].style.color = 'transparent';
            answers[random2].style.color = 'transparent';
          }, 2000);
        }
      }
    },
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
  background: linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6) ), url("background_qvgdp.png");
  background-size: cover;
  -webkit-animation: fadein 4s; /* Safari, Chrome and Opera > 12.1 */
}
/* Safari, Chrome and Opera > 12.1 */
@-webkit-keyframes fadein {
  from { opacity: 0.5; }
  to   { opacity: 1; }
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
  top: 175px;
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
.footer {
  width: 900px;
  display: flex;
  justify-content: space-between;
  align-items: center;

}
.footer > div {
  width: 100px;
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
.used {
  background-color: #888!important;
}
</style>
