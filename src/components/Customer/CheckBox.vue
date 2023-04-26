<template>
    <!-- font awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  
    <div class="custom-checkbox" :class="{ 'checked': isChecked }" @click="toggleCheck">
        <div class="checkbox-box">
            <i class="fa fa-check"></i>
        </div>
        <div class="label">
            {{ capitalize(label) }}
        </div>
  </div>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isChecked: this.checked,
    };
  },
  methods: {
    toggleCheck() {
      this.isChecked = !this.isChecked;
      this.$emit('checked-labels', this.label, this.isChecked);
    },
    capitalize(sentence) {
      const words = sentence.split(" ");
      const capitalizedWords = words.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      });
      const capitalizedSentence = capitalizedWords.join(" ");
      return capitalizedSentence;
    }
  },
  emits: ['checked-labels'],
};
</script>

<style scoped>
.custom-checkbox {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-bottom: 10px;
    padding: 20px;
    border: 3px solid #242B64;
    border-radius: 10px;
    transition: background-color .1s ease-out;
}

.checked {
  background-color: #242B64;
  color: white;
  animation-name: splash;
  animation-duration: .3s;
}

@keyframes splash {
  0% {
    background-color: #fff;
  }
  100% {
    background-color: #242B64;
  }
}

.checkbox-box{
    width: 30px;
    height: 30px;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
}

.checkbox-box i {
    color: #fff;
}

.checked .checkbox-box i {
    color: #242B64;
}

.checked .checkbox-box {
    background-color: #ffff;
    border-color: #ffff;
    box-shadow: 0 0 0 2px #ffffff;
}

.label {
    font-size: x-large;
    font-weight: 600;
    color: #242B64;
}

.checked .label {
    color: #ffff;
}
</style>
