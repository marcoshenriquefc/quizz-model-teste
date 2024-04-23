<template>
    <main
        class="body-content question-body"
        :style="styleEvent ?
        {
            backgroundColor : styleEvent.backgroundColor,
            backgroundImage : `url(${styleEvent.backgroundImage})`,
        }
        : ''"
    >
        <section class="" v-if="currentCategory">

            <div class="info-box">
                <h1 class="title" :style="{ color : styleEvent?.textColor }">Categoria:</h1>
                <p  class="subtitle" :style="{ color : styleEvent?.textColor }">{{ currentCategory.title }}</p>
            </div>
            
            <router-link class="button-primary fit-button" :to="{path : `/question/${eventId}/${categoryId}`}">
                Iniciar Quizz
            </router-link>
        </section>
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import useStore from '../store/index';
import { useRoute } from 'vue-router';
import { IStyleEvent } from '../interfaces/DataDB';


export default defineComponent({
    name : 'StartQuestionPage',
    beforeMount() {
    
        if(!this.reloadPage) {
            this.$router.replace(`/question/${this.eventId}/${this.categoryId}`)
        }
    },
    setup() {
        const store = useStore();
        const route = useRoute();

        const eventId = route.params.id as string;
        const categoryId = route.params.categoryId as string;

        const currentCategory = store.getCurrentCategory({
            eventId     : eventId,
            categoryId  : categoryId,
        });

        const dataEvent = store.getCurrentEventData(eventId);
        let styleEvent = null as IStyleEvent | null;
        if(dataEvent?.styleEvent) {
            styleEvent = dataEvent.styleEvent;
        }

        const reloadPage = dataEvent?.reloadPage;

        

        return {
            currentCategory,
            eventId,
            categoryId,
            styleEvent,
            reloadPage,
        }
    }
})
</script>

<style lang="scss" scoped>
.question-body {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    background-size: cover;

    .info-box {
        margin-bottom: 1rem;
        .title {
            font-size:2.5rem;
        }
    
        .subtitle {
            font-size:1.25rem;
        }
    }
}
</style>