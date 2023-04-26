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
    border: 2px solid black;
    border-radius: 10px;
    transition: background-color .1s ease-out;
}

.checked {
  animation-name: splash;
  animation-duration: .3s;
}

@keyframes splash {
  0% {
    background-color: #fff;
  }
  30% {
    background-color: #242B64;
  }
  100% {
    background-color: #fff;
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
    color: #ffffff;
}

.checked .checkbox-box {
    background-color: #242B64;
    border-color: #242B64;
}

.label {
    font-size: x-large;
    font-weight: 600;
}
</style>
