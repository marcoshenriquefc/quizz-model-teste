<template>
    <section
        v-if="randomQuestion"
        class="body-question body-content"
        :style="styleEvent ?
        {
            backgroundColor : styleEvent.backgroundColor,
            backgroundImage : `url(${styleEvent.backgroundImage})`,
        }
        : ''"
    >
        <div class="center-width">
            <header class="header-question" v-if="styleEvent">
                <img class="event-logotype" :src="styleEvent.logoImage" alt="Logotipo do evento">
            </header>
    
            <QuestionMain
                v-if="randomQuestion.id"
                :key="randomQuestion.id"
                :question="randomQuestion"
                :styleEvent="styleEvent"
                @changeAnswer="checkAnswer"
            />
            
            <!-- <main class="main-question">
                <h1 class="title-question" :style="styleEvent ? {color : styleEvent.textColor} : ''">
                    {{ randomQuestion.question }}
                </h1>
    
                <section class="options-area">
                    <label
                        v-for="(option, index) in randomQuestion.options"
                        :key="index"
                        class="button-option"
                        :for="`option-${index}`"
                        :style="{
                            backgroundColor: styleEvent?.optionColor,
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
            </main> -->
    
            <footer>
                <button
                    class="config-button"
                    @dblclick="openPopupAdmin"
                    :style="{
                        color: styleEvent ? styleEvent.optionColor : '',
                        borderColor: styleEvent ? styleEvent.optionColor : '',
                    }"
                >
                    ...
                </button>
            </footer>
        </div>

        <PopupBox
            v-if="popupOpen"
            :can-close="false"
        >
            <section class="popup-thanks">
                <h1 class="title-popup">
                    Obrigado

                    <!-- <button @click="finishQuestion"> Reiniciar </button> -->
                </h1>
            </section>
        </PopupBox>

        <PopupBox
            v-if="popupAdminOpen"
            @close-popup="closePopupAdmin"
        >
            <AdminForm
                button-title="Voltar para categorias"
                @match-passowrds="matchPassowrds"
            />
        </PopupBox>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// Utils
import useStore     from '../store';
import { useRoute } from 'vue-router';
import { IAnswer, IQuestion, IStyleEvent }  from '../interfaces/DataDB';
// import { IQuestionAnswer } from "../interfaces/questions";

// Components
import PopupBox     from '../components/PopupBox.vue';
import AdminForm    from '../components/AdminForm.vue';
import QuestionMain from '../components/QuestionMain.vue';

// Sounds config
// import soundCorect  from '../assets/sounds/correct.mp3';
// import soundFail    from '../assets/sounds/fail.mp3';
import soundFeliz   from '../assets/sounds/feliz-edit.mp3';
import soundIndif   from '../assets/sounds/indiferente-edit.mp3';
import soundTriste  from '../assets/sounds/triste-edit.mp3';

const audioHappy    = new Audio(soundFeliz);
const audioSad      = new Audio(soundTriste);
const audioInd      = new Audio(soundIndif);

audioHappy.load();
audioSad.load();
audioInd.load();

// Dev Sound config (please, remove on production):
// audioHappy.volume = 0.2;
// audioSad.volume = 0.2;


// import DataQuestion from '../services/DataServiceQuestion';

export default defineComponent({
    name: 'QuestionsPage',
    components: {
        PopupBox,
        AdminForm,
        QuestionMain,
    },
    data() {
        return {
            randomQuestion: {} as IQuestion,
            selectedOption: null as IAnswer | null,
            
            popupOpen : false,
            popupText : '',

            timeAutoReload : 2,

            // Admin states
            popupAdminOpen : false,
            adminPass : '',
            timeClosePopup : 35,
            errorInfo : '',
            timer : null as number | null,
            timerQuestionReload : null as number | null,
        };
    },
    methods: {
        // emitAnswer(answer) {
        //     console.log('response', answer);
        // },
        checkAnswer(answer : IAnswer | null) : void  {
            if (answer === null) {
                alert('Por favor, selecione uma opção antes de confirmar.');
                return;
            }

            switch(answer.soundId) {
                case '1':
                    this.playSound(audioHappy);
                    // this.openPopup(this.selectedOption);
                    break;
                
                case '2':
                    this.playSound(audioInd);
                    // this.openPopup(this.selectedOption);
                    break;

                case '3':
                    this.playSound(audioSad);
                    // this.openPopup(this.selectedOption);
                    break;

                default :
                    alert('Por favor, selecione uma opção antes de confirmar.');
                    return;
                break;
            }
            this.finishQuestion(answer);

            
            // this.saveDataAnswer();
        },

        // async saveDataAnswer(){
        //     const responseData = {
        //         eventID     : this.dataId.eventId,
        //         categoryID  : this.dataId.categoryId,
        //         questionID  : this.randomQuestion.id,
        //         optionID    : this.selectedOption?.optionId,
        //     } as IQuestionAnswer

        //     const responseQuestion = await DataQuestion.saveDataAnswer(responseData);

        //     console.log(responseQuestion);
        // },

        finishQuestion(selectedOption : IAnswer) : void {

            this.openPopup(selectedOption);
            console.log('reset')



            if(this.reloadPage) {
                this.backRouter();
                return
            }

            // this.$router.go(0);
            console.log('reset')
            this.resetQuestion();
        },

        resetQuestion() {
            
            console.log('question')
            const reloadTime = this.timeAutoReload * 1000;
            
            if(this.timerQuestionReload) {
                clearTimeout(this.timerQuestionReload);
            }
            
            this.timerQuestionReload = setTimeout(() => {
                this.changeRandomQuestion();
                this.closePopup();
            }, reloadTime);
        },



        backRouter() : void {
            this.$router.replace(`/event/${this.dataId.eventId}/${this.dataId.categoryId}`);
        },

        openPopup(optionSelected : IAnswer | null) : void {
            if(optionSelected) {
                this.popupText = optionSelected.description;
            }
            
            // this.autoReloadPage();
            this.popupOpen = true;
        },

        closePopup() {
            this.popupOpen = false;
            this.popupText = '';
        },

        playSound(soundFile : HTMLAudioElement) : void {
            soundFile.play();
        },

        autoReloadPage() {
            const reloadTime = this.timeAutoReload * 1000;
            
            this.timeAutoReload = setInterval(() => {
                this.$router.go(0);
            }, reloadTime);
        },

        matchPassowrds(passwordsMatch : Boolean) : void{
            if(passwordsMatch) {
                this.$router.replace(`/event/${this.dataId.eventId}`);
            }
        },

        openPopupAdmin() : void {
            this.popupAdminOpen = true;
            const reloadTime = this.timeClosePopup * 1000;

            setTimeout(() => {
                console.log('fechou popup')
                this.closePopupAdmin()
            }, reloadTime)
        },
        
        closePopupAdmin() : void {
            this.popupAdminOpen = false;
            this.adminPass = '';
            this.errorInfo = '';
        },

        verifyAdmin() : void {
            const authAdmin = this.store.verifyAdminPass(this.adminPass);

            if(authAdmin) {
                this.$router.replace(`/event/${this.dataId.eventId}`)
                return
            }
            this.errorInfo = 'Credenciais inválidas';
            return
        },

        changeRandomQuestion() : void {
            const newRandomQuestion =  this.getRandomQuestion({
                categoryId: this.dataId.categoryId,
                eventId: this.dataId.eventId
            })
            console.log('random', newRandomQuestion);
            
            if(newRandomQuestion) {
                this.randomQuestion = newRandomQuestion;
            }
        }
    },
    mounted() {
        this.changeRandomQuestion();
    },
    setup() {
        const store = useStore();
        const route = useRoute();

        const eventId = route.params.id as string;
        const categoryId = route.params.categoryId as string;

        // const randomQuestion = store.getRandomQuestion({
        //     categoryId: categoryId,
        //     eventId: eventId
        // });
        const dataId = {
            categoryId  : categoryId,
            eventId     : eventId,
        };

        const getRandomQuestion = store.getRandomQuestion;

        const dataEvent = store.getCurrentEventData(dataId.eventId);
        const reloadPage = dataEvent?.reloadPage;

        let styleEvent = null as IStyleEvent | null;
        if(dataEvent?.styleEvent) {
            styleEvent = dataEvent.styleEvent;
        }

        return {
            getRandomQuestion,
            dataId,
            reloadPage,
            styleEvent,
            store,
        }
    }
})
</script>

<style lang="scss" scoped>
.body-question {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-size: cover;

    .center-width {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .header-question {
        max-width: 1000px;
        margin: 0 auto;

        .event-logotype {
            width: 100%;
            max-width: 280px;
        }
    }

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
}


.popup-thanks {
    padding: 1rem 2rem;
    .title-popup {
        font-size:3rem;
        font-weight: 800;

        color: #333 ;
    }
}
.error-text {
    font-size: .75rem;
    color: red;
}
.admin-popup-data {
    display: flex;
    flex-direction: column;
    gap:1rem;

    label {
        display: flex;
        flex-direction: column;
    }
}
</style>