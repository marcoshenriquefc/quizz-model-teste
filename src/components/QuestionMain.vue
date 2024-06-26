<template>
    <main class="main-question" :key="question.id" v-if="question">
        <h1 class="title-question text-focus-in" :style="styleEvent ? {color : styleEvent.textColor} : ''">
            {{ question.question }}
        </h1>

        <section class="options-area">
            <label
                v-for="(option, index) in question.options"
                :key="`${option.optionId}-${question.id}`"
                class="button-option scale-in-hor-left"
                :for="`option-${index}`"
                :style="{
                    backgroundColor: styleEvent ? styleEvent.optionColor : '',
                    animationDelay : `${index/4}s`
                }"
            >
                <input 
                    :id="`option-${index}`"
                    type="radio"
                    v-model="selectedOption"
                    :value="option"
                    @change="checkAnswer"
                >

                <span v-if="option.icon" :key="option.icon.id">
                    <img :src="option.icon.source"  width="32px" :alt="option.icon.alt">
                </span>

                {{ option.title }}
            </label>
        </section>

        <button v-if="false" class="button-primary fit-button" @click="checkAnswer">Confirmar</button>
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { IAnswer, IQuestion, IStyleEvent } from '../interfaces/DataDB';
import useStore from '../store';
import { useRoute } from 'vue-router';

export default defineComponent({
    name : 'QuestionMain',
    data() {
        return {
            selectedOption: null as IAnswer | null,

            synthesis: window.speechSynthesis,
            utterance: null as SpeechSynthesisUtterance | null
        }
    },
    emits: ['changeAnswer'],
    props: {
        question: {
            type: Object as () => IQuestion,
            required: true,
        },
        styleEvent: {
            type : Object as () => IStyleEvent | null,
            required: false,
        },
    },
    methods: {
        checkAnswer() {
            console.log('change')
            if (this.selectedOption === null) {
                alert('Por favor, selecione uma opção antes de confirmar.');
                return;
            }

            
            this.$emit('changeAnswer', this.selectedOption);
            this.selectedOption = null;
        }
    },
    mounted() {
        if(this.activeReader) {
            const text = this.question.question;
            
            if ('speechSynthesis' in window && this.synthesis) {
                this.utterance = new SpeechSynthesisUtterance(text);
                this.utterance.volume = 1; // Define o volume para o máximo (1)
                this.synthesis.speak(this.utterance);
            } else {
                console.error('A API de síntese de fala não é suportada neste navegador.');
            }
        }
    },
    beforeUnmount() {
        if(this.activeReader) {
            if (this.synthesis && this.utterance) {
                // Cancela a síntese de fala ao desmontar o componente
                this.synthesis.cancel();
            }
        }
    },
    setup() {
        const store = useStore();
        const route = useRoute();

        const eventId = route.params.id as string;
        const activeReader = store.getQuestionReaderByID(eventId);

        return {
            activeReader,
        }
    }

})
</script>

<style lang="scss" scoped>
.main-question {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 4rem 2rem;
    max-width: 75%;
    text-align: center;

    gap: 3rem;

    .title-question {
        font-size: 1.75rem;
        font-weight: 500;
    }

    .options-area {
        display: flex;
        gap: 2rem;
        .button-option{
            padding: 1rem 3rem;
            border-radius: .25rem;
            font-size: 1.5rem ;
        
            background-color: antiquewhite;
            color: white;

            box-shadow: 0 0 20px rgba(0, 0, 0, .1);
            cursor: pointer;
    
            input {
                display: none;
            }
        }
    }
}

/* ----------------------------------------------
 * Generated by Animista on 2024-4-24 12:44:24
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */
 @-webkit-keyframes scale-in-hor-left {
  0% {
    -webkit-transform: scaleX(0);
            transform: scaleX(0);
    -webkit-transform-origin: 0% 0%;
            transform-origin: 0% 0%;
    opacity: 1;
  }
  100% {
    -webkit-transform: scaleX(1);
            transform: scaleX(1);
    -webkit-transform-origin: 0% 0%;
            transform-origin: 0% 0%;
    opacity: 1;
  }
}
@keyframes scale-in-hor-left {
  0% {
    -webkit-transform: scaleX(0);
            transform: scaleX(0);
    -webkit-transform-origin: 0% 0%;
            transform-origin: 0% 0%;
    opacity: 1;
  }
  100% {
    -webkit-transform: scaleX(1);
            transform: scaleX(1);
    -webkit-transform-origin: 0% 0%;
            transform-origin: 0% 0%;
    opacity: 1;
  }
}

.scale-in-hor-left {
	-webkit-animation: scale-in-hor-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	        animation: scale-in-hor-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}


@-webkit-keyframes text-focus-in {
    0% {
        -webkit-filter: blur(12px);
                filter: blur(12px);
        opacity: 0;
    }
    100% {
        -webkit-filter: blur(0px);
                filter: blur(0px);
        opacity: 1;
    }
}
@keyframes text-focus-in {
    0% {
        -webkit-filter: blur(12px);
                filter: blur(12px);
        opacity: 0;
    }
    100% {
        -webkit-filter: blur(0px);
                filter: blur(0px);
        opacity: 1;
    }
}

.text-focus-in {
	-webkit-animation: text-focus-in .5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
	        animation: text-focus-in .5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
}

</style>