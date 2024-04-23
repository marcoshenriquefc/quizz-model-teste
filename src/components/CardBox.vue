<template>
    <div class="event-box" :style="{borderColor: textColor}">
        <!-- <p class="info-card">Id Card: {{ dataCard.id }}</p> -->
        <h1 class="title-card" :style="{color: textColor}">{{ dataCard.title }}</h1>

        <router-link
            class="button-primary"
            v-if="pathLink"
            :to="{
                path : `/${pathLink}`,
                query: query,     
            }"
        >
            {{ titleButton ? titleButton : 'Selecionar' }}
        </router-link>

        <button
            class="button-primary"
            v-else
            @click="$emit('clickButton', dataCard.id)"
        >
            {{ titleButton ? titleButton : 'Selecionar' }}
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import { ICategory, IEvent } from '../interfaces/DataDB';

export default defineComponent({
    name : 'CardBox',
    emits: ['clickButton'],
    props: {
        dataCard : {
            type: Object as PropType<IEvent> | PropType<ICategory>,
            required: true,
        },
        pathLink : {
            type: String,
            required: false,
        },
        titleButton : {
            type : String
        },
        query : {
            type : Object,
        },
        textColor: {
            type: String,
            required: false,
        }
    },
})
</script>

<style scoped lang="scss">

.event-box {
    border-radius: 4px;
    border: 1px solid lightgray;
    padding: 20px 32px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
    width: 100%;

    .title-card {
        text-align: center;
        font-size: 20px;
        margin-bottom: 12px;
        font-weight: 400;
    }
    .info-card {
        font-size: 12px;
        color: lightgray;
    }
}

</style>