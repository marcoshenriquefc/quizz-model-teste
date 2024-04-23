<template>
    <main>
        Selecione o evento

        <section class="events-list">
            <CardBox
                v-for="event in eventList"
                :key="event.id"
                :dataCard="event"
                @click-button="changeRouter"
                titleButton="Selecionar Evento"
            />
        </section>
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import useStore from '../store';

import CardBox from '../components/CardBox.vue';


export default defineComponent({
    data() {
        return {

        }
    },
    components: {
        CardBox,
    },
    methods : {
        changeRouter(idEvent : string) {
            console.log(idEvent)
            this.$router.replace(`/event/${idEvent}`)
        }
    },
    setup() {
        const store = useStore();
        const eventList = store.getAllEvents();

        return  {
            eventList,
        }
    }
})
</script>

<style lang="scss">
    .events-list{
        // display: flex;
        // flex-wrap: wrap;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 24px;
    }
    
    .button-primary {
        display: inline-block;
        padding: .5rem 1.25rem;
        background-color: #2A549F;
        color: white;
        text-decoration: none;
        font-size: 1rem;
        border-radius: 4px;
        width: 100%;
        text-align: center;
        border: none;
        cursor: pointer;

        &.fit-button {
            width: fit-content;
        }
    }

    .button-secundary {
        display: inline-block;
        padding: .5rem 1.25rem;
        background: none;
        border: 2px solid #2A549F;
        color: #2A549F;
        text-decoration: none;
        font-size: 1rem;
        border-radius: 4px;
        width: 100%;
        text-align: center;
        transition: all .3s;
        cursor: pointer;

        &:hover {
            background-color: #2a559f3b;
        }
        &.fit-button {
            width: fit-content;
        }
    }

    .config-button {
        display: flex;
        justify-content: center;
        align-self: center;

        width: 2.5rem;
        height: 2.5rem;
        line-height: 1.25rem;

        font-size: 2rem;


        border: 2px solid white;
        color: white;
        background: none;
        border-radius: 8px; 

        cursor: pointer;
    }

    .body-content {
        min-height: 100vh;
        min-height: 100dvh;
        
        padding: 2rem 0;
    }

    .center-width {
        max-width: 1200px;
        margin:0 auto;
    }
</style>