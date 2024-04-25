<template>
    <main
        class="body-content event-body"
        :style="styleEvent ?
        {
            backgroundColor : styleEvent.backgroundColor,
            backgroundImage : `url(${styleEvent.backgroundImage})`,
        }
        : ''"
    >
        <header class="header-area center-width">
            <button
                class="button-secundary fit-button"
                @click="openPopupAdmin('eventBack')"
            >
                <- Voltar
            </button>
            
            <button
                class="button-secundary fit-button"
                @click="fullscreen"
            >
                FullScreen
            </button>
        </header>

        <div class="header-area center-width">
            
            <button
                class="button-primary fit-button"
                :class="questionReader ? 'ativado' : 'desativado'"
                @click="toggleReader"
            >
                Leitor de Perguntas: {{  questionReader ? 'Ativado' : 'Desativado' }}
            </button>
        </div>

        <section class="events-list center-width">
            <CardBox
                v-for="category in categoriesList"
                :key="category.id"
                @click-button="openQuizz"
                :dataCard="category"
                titleButton="Selecionar Categoria"
                :textColor="styleEvent?.textColor"
            />
        </section>

        <PopupBox
            v-if="openPopup"
            @closePopup="closePopupAdmin"
        >
            <AdminForm
                v-if="popupAdminPasswords"
                buttonTitle="Acessar categoria"
                @match-passowrds="matchPasswords"
            />

            <AdminForm
                v-if="popupBackEvent"
                buttonTitle="Voltar para lista de eventos"
                @match-passowrds="matchPasswordsBackEvent"
            />
        </PopupBox>
    </main>
</template>
        <!-- :pathLink="`event/${eventId}/${category.id}`" -->

<script lang="ts">
import { defineComponent } from 'vue';

import useStore from '../store/index';
import { useRoute } from 'vue-router';

import { IStyleEvent } from '../interfaces/DataDB';
import CardBox  from '../components/CardBox.vue';
import PopupBox from '../components/PopupBox.vue';
import AdminForm from '../components/AdminForm.vue'

export default defineComponent({
    name : 'EventPage',
    components: {
        CardBox,
        PopupBox,
        AdminForm,
    },
    data() {
        return {
            openPopup   : false,

            currentQuestionID : '',
            popupAdminPasswords : false,
            timeToClose : 35,
            adminPass   : '',

            popupBackEvent : false,

            timerToClose    : 0 as number,
            questionReader  : true as Boolean | null,
        }
    },
    methods : {
        openQuizz(questionID : string) {
            this.currentQuestionID = questionID;
            this.openPopupAdmin('adminCategory');
        },

        openPopupAdmin(popupType: string) : void{
            if(popupType === 'eventBack') {
                this.popupBackEvent = true;
            }
            else if(popupType === 'adminCategory') {
                this.popupAdminPasswords = true;
            }
            this.openPopup = true;

            const reloadTime = this.timeToClose * 1000;

            if(this.timerToClose) {
                clearTimeout(this.timerToClose);
            }

            this.timerToClose = setTimeout(() => {
                this.closePopupAdmin()
            }, reloadTime)
        },

        matchPasswordsBackEvent(passwordsMatch : Boolean) : void {
            if(passwordsMatch) {
                this.$router.replace(`/`);
            }
        },

        matchPasswords(passwordsMatch : Boolean) : void {
            this.popupAdminPasswords = true;
            if(passwordsMatch) {
                this.$router.replace(`/event/${this.eventId}/${this.currentQuestionID}`);
            }
        },

        closePopupAdmin() {
            this.openPopup = false;
            this.adminPass = '';
            this.currentQuestionID = '';

            this.popupAdminPasswords= false;
            this.popupBackEvent     = false;
            clearTimeout(this.timerToClose);
        },
        
        fullscreen() {
            document.documentElement.requestFullscreen();
        },

        toggleReader(){
            this.questionReader = this.toggleQuestionReader(this.eventId);
        }
    },
    mounted() {
        this.questionReader = this.getQuestionReader(this.eventId);
    },
    setup() {
        const store = useStore();
        const route = useRoute();

        const eventId = route.params.id as string;
        const categoriesList = store.getCategoriesByEventId(eventId);

        
        const dataEvent = store.getCurrentEventData(eventId);
        let styleEvent = null as IStyleEvent | null;
        if(dataEvent?.styleEvent) {
            styleEvent = dataEvent.styleEvent;
        }

        const getQuestionReader     = store.getQuestionReaderByID;
        const toggleQuestionReader  = store.toggleQuestionReader;

        return {
            categoriesList,
            eventId,
            styleEvent,
            toggleQuestionReader,
            getQuestionReader,
        }
    }
})
</script>

<style lang="scss" scoped>
.header-area {
    margin-bottom: 1.5rem;
    display: flex;
    justify-content: space-between;
}
.event-body {
    background-size: cover;
}

.button-primary {
    &.ativado {
        background-color: #14452f94;
        color:white;

        &:hover {
            background-color: #14452F;
        }
    }

    &.desativado {
        background-color: #960019a1;
        color:white;
        &:hover {
            background-color: #960018;
        }
    }
}
</style>