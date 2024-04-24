<template>
    <main class="main-question">
        <h1 class="title-question" :style="styleEvent ? {color : styleEvent.textColor} : ''">
            {{ question.question }}
        </h1>

        <section class="options-area">
            <label
                v-for="(option, index) in question.options"
                :key="`${option.optionId}`"
                class="button-option"
                :for="`option-${index}`"
                :style="{
                    backgroundColor: styleEvent ? styleEvent.optionColor : '',
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

export default defineComponent({
    name : 'QuestionMain',
    data() {
        return {
            selectedOption: null as IAnswer | null,
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
        }
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
        console.log(this.question);
    },

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
        font-size: 2rem;
        font-weight: 500;
    }

    .options-area {
        display: flex;
        gap: 2rem;
        .button-option{
            padding: 1rem 2.75rem;
            border-radius: .25rem;
            font-size: 1.75rem ;
        
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
</style>