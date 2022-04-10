<template>
  <div class="question">
    <div>{{ question }}</div>
  </div>
  <div class="responseBody">
    <div v-for="response in responses">
      <button class="response" @click="showResponse(response)" :class="{good: response.isGood /*&& this.showResp*/, bad: !response.isGood /*&& this.showResp */&& this.selectedAnswer === response}">{{ response.text }}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Response',
  data() {
    return {
      // showResp: false,
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
      // this.showResp = true;
      if (response.isGood) this.$emit('answerChoosen', 1);
      else this.$emit('answerChoosen', 0);
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
  font-size: 1.2em;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
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
  background: #333;
  color: white;
  padding-inline: 75px;
  margin-top: 10px;
  font-size: 1.2em;
  font-weight: bold;
}
.good{
  background-color: green;
}
.bad{
  background-color: red;
}
</style>
