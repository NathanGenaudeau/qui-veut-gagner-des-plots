<template>
  <div class="question">
    <div>{{ question }}</div>
  </div>
  <div class="responseBody">
    <div v-for="response in responses">
      <button class="response" @click="showResponse(response)" :class="{good: response.isGood && this.selectedAnswer === response, bad: !response.isGood && this.selectedAnswer === response}">{{ response.text }}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Response',
  data() {
    return {
      selectedAnswer: null,
    }
  },
  props: {
    question: {
      type: String,
      default: '',
    },
    responses: {
      type: Array,
      default: [],
    },
  },
  methods: {
    showResponse(response) {
      this.selectedAnswer = response;
      this.$emit('answerChoosen', response);
    },
  },
};
</script>

<style>
.question {
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 900px;
  height: 75px;
  border: 2px solid black;
  border-radius: 10px;
  background: #FF7E09;
  color: white;
  font-size: 1.4em;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
  padding-inline: 50px;
}
.question > div {
  -webkit-animation: fadein 5s; /* Safari, Chrome and Opera > 12.1 */
}
/* Safari, Chrome and Opera > 12.1 */
@-webkit-keyframes fadein {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* Safari, Chrome and Opera > 12.1 */
@-webkit-keyframes fadeout {
  from { opacity: 1; }
  to   { opacity: 0; }
}

.responseBody {
  margin: 10px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 900px;
}
.response {
  width: 445px;
  height: 140px;
  border: 2px solid black;
  border-radius: 10px;
  background: #A5A7A7;
  color: transparent;
  padding-inline: 75px;
  margin-top: 10px;
  font-size: 1.3em;
  font-weight: bold;
}
.good{
  background-color: green!important;
  color: white!important;
}
.bad{
  background-color: red!important;
  color: white!important;
}
</style>