import { defineStore } from "pinia";

import { ICategory, IEvent, IIcon, IQuestion } from "../interfaces/DataDB";
import { ILastQuestionData, IQuestionModel } from "../interfaces/questions";



import logoCarpet       from '../assets/images/logo-red-carpet.png';
import backgroundCarpet from '../assets/images/background-image.png';



const useStore = defineStore({
    id : 'app',
    state   : () => {
        return {
            events: [
                {
                    id          : '1',
                    title       : 'Tapete Vermelho',
                    reloadPage  : true,
                    reader      : true,
                    categoriesist: [
                        {
                            id: '11',
                            title : 'EDUCAÇÃO BÁSICA',
                            questionsList : [
                                {
                                    id : '11-1',
                                    question : 'Como você se sentiria se a sua escola tivesse laboratório de robótica?',
                                    options  : [
                                        {
                                            optionId    : '1',
                                            soundId     : '1',
                                            title       : 'Feliz',
                                            description : '',
                                        },
                                        {
                                            optionId    : '2',
                                            soundId     : '2',
                                            title       : 'Indiferente',
                                            description : '',
                                        },
                                        {
                                            optionId    : '3',
                                            soundId     : '3',
                                            title       : 'Triste',
                                            description : '',
                                        },
                                    ] 
                                },
                                {
                                    id : '11-2',
                                    question : 'Como você se sentiria se a sua escola NÃO preparasse o aluno para o futuro do trabalho?',
                                    options  : [
                                        {
                                            optionId    : '1',
                                            soundId     : '1',
                                            title       : 'Feliz',
                                            description : '',
                                        },
                                        {
                                            optionId    : '2',
                                            soundId     : '2',
                                            title       : 'Indiferente',
                                            description : '',
                                        },
                                        {
                                            optionId    : '3',
                                            soundId     : '3',
                                            title       : 'Triste',
                                            description : '',
                                        },
                                    ] 
                                },
                                {
                                    id : '11-3',
                                    question : 'Como você se sentiria se a sua escola investisse em iniciação científica?',
                                    options  : [
                                        {
                                            optionId    : '1',
                                            soundId     : '1',
                                            title       : 'Feliz',
                                            description : '',
                                        },
                                        {
                                            optionId    : '2',
                                            soundId     : '2',
                                            title       : 'Indiferente',
                                            description : '',
                                        },
                                        {
                                            optionId    : '3',
                                            soundId     : '3',
                                            title       : 'Triste',
                                            description : '',
                                        },
                                    ] 
                                },
                            ]
                        },
                        {
                            id: '12',
                            title : 'EDUCAÇÃO PROFISSIONAL',
                            questionsList : [
                                {
                                    id : '12-1',
                                    question : 'Como você se sentiria se, ao finalizar um curso profissionalizante, conseguisse uma excelente vaga no mercado de trabalho?',
                                    options  : [
                                        {
                                            optionId    : '1',
                                            soundId     : '1',
                                            title       : 'Feliz',
                                            description : '',
                                        },
                                        {
                                            optionId    : '2',
                                            soundId     : '2',
                                            title       : 'Indiferente',
                                            description : '',
                                        },
                                        {
                                            optionId    : '3',
                                            soundId     : '3',
                                            title       : 'Triste',
                                            description : '',
                                        },
                                    ] 
                                },
                                {
                                    id : '12-2',
                                    question : 'Como você se sentiria se fizesse um curso profissionalizante em uma escola COM laboratórios de última geração?',
                                    options  : [
                                        {
                                            optionId    : '1',
                                            soundId     : '1',
                                            title       : 'Feliz',
                                            description : '',
                                        },
                                        {
                                            optionId    : '2',
                                            soundId     : '2',
                                            title       : 'Indiferente',
                                            description : '',
                                        },
                                        {
                                            optionId    : '3',
                                            soundId     : '3',
                                            title       : 'Triste',
                                            description : '',
                                        },
                                    ] 
                                },
                                {
                                    id : '12-3',
                                    question : 'Como você se sentiria se pagasse um preço CARO por um curso técnico ou profissionalizante em uma escola qualquer?',
                                    options  : [
                                        {
                                            optionId    : '1',
                                            soundId     : '1',
                                            title       : 'Feliz',
                                            description : '',
                                        },
                                        {
                                            optionId    : '2',
                                            soundId     : '2',
                                            title       : 'Indiferente',
                                            description : '',
                                        },
                                        {
                                            optionId    : '3',
                                            soundId     : '3',
                                            title       : 'Triste',
                                            description : '',
                                        },
                                    ] 
                                },
                            ]
                        },
                        {
                            id: '13',
                            title : 'EMPRESAS',
                            questionsList : [
                                {
                                    id : '13-1',
                                    question : 'Se sua empresa contasse com suporte técnico especializado, como você se sentiria?',
                                    options  : [
                                        {
                                            optionId    : '1',
                                            soundId     : '1',
                                            title       : 'Feliz',
                                            description : '',
                                        },
                                        {
                                            optionId    : '2',
                                            soundId     : '2',
                                            title       : 'Indiferente',
                                            description : '',
                                        },
                                        {
                                            optionId    : '3',
                                            soundId     : '3',
                                            title       : 'Triste',
                                            description : '',
                                        },
                                    ] 
                                },
                                {
                                    id : '13-2',
                                    question : 'Se sua empresa NÃO contasse com suporte para transformação digital, como você se sentiria?',
                                    options  : [
                                        {
                                            optionId    : '1',
                                            soundId     : '1',
                                            title       : 'Feliz',
                                            description : '',
                                        },
                                        {
                                            optionId    : '2',
                                            soundId     : '2',
                                            title       : 'Indiferente',
                                            description : '',
                                        },
                                        {
                                            optionId    : '3',
                                            soundId     : '3',
                                            title       : 'Triste',
                                            description : '',
                                        },
                                    ] 
                                },
                            ]
                        },
                        {
                            id: '14',
                            title : 'SAÚDE',
                            questionsList : [
                                {
                                    id : '14-1',
                                    question : 'Como você se sentiria se tivesse um cartão saúde gratuito com BENEFÍCIOS?',
                                    options  : [
                                        {
                                            optionId    : '1',
                                            soundId     : '1',
                                            title       : 'Feliz',
                                            description : '',
                                        },
                                        {
                                            optionId    : '2',
                                            soundId     : '2',
                                            title       : 'Indiferente',
                                            description : '',
                                        },
                                        {
                                            optionId    : '3',
                                            soundId     : '3',
                                            title       : 'Triste',
                                            description : '',
                                        },
                                    ] 
                                },
                                {
                                    id : '14-2',
                                    question : 'Como você se sentiria se pagasse um preço MUITO CARO em um exame médico SIMPLES?',
                                    options  : [
                                        {
                                            optionId    : '1',
                                            soundId     : '1',
                                            title       : 'Feliz',
                                            description : '',
                                        },
                                        {
                                            optionId    : '2',
                                            soundId     : '2',
                                            title       : 'Indiferente',
                                            description : '',
                                        },
                                        {
                                            optionId    : '3',
                                            soundId     : '3',
                                            title       : 'Triste',
                                            description : '',
                                        },
                                    ] 
                                },
                                {
                                    id : '14-3',
                                    question : 'Como você se sentiria se pagasse um preço ACESSÍVEL em uma consulta médica?',
                                    options  : [
                                        {
                                            optionId    : '1',
                                            soundId     : '1',
                                            title       : 'Feliz',
                                            description : '',
                                        },
                                        {
                                            optionId    : '2',
                                            soundId     : '2',
                                            title       : 'Indiferente',
                                            description : '',
                                        },
                                        {
                                            optionId    : '3',
                                            soundId     : '3',
                                            title       : 'Triste',
                                            description : '',
                                        },
                                    ] 
                                },
                            ]
                        },
                    ],
                    styleEvent : {
                        backgroundColor : '#000',
                        textColor       : '#E4D192',
                        optionColor     : "#6E5601",
                        logoImage       : logoCarpet,
                        backgroundImage : backgroundCarpet,
                    }
                },
            ] as IEvent[],

            iconList : [
                {
                    id      : '1',
                    source  : '',
                    alt     : 'Happy Icon',
                },
                {
                    id      : '2',
                    source  : '',
                    alt     : 'Indiferent Icon',
                },
                {
                    id      : '3',
                    source  : '',
                    alt     : 'Sad Icon',
                },
            ] as IIcon[],

            lastQuestion : {
                eventId     : '',
                categoryId  : '',
                questionId  : '',
            } as ILastQuestionData,

            // Senha temporária, guardar no .env
            adminPass : 'security',
        }
    },
    actions : {
        getAllEvents() : IEvent[] {
            return this.events;
        },

        getCategoriesByEventId(eventId : string) : ICategory[] | [] {
            const currentEvent = this.events.find(event => {
                return event.id === eventId;
            });

            return currentEvent ? currentEvent.categoriesist : [];
        },

        getCurrentEventData(eventId : string) : null | IEvent {
            const currentEvent = this.events.find( eventData => {
                return eventData.id === eventId;
            });

            if(!currentEvent) {
                return null
            }

            return currentEvent;
        },

        getCurrentCategory(dataQuestion : ILastQuestionData) : null | ICategory {
            const currentEvent = this.events.find( event => {
                return event.id === dataQuestion.eventId;
            })

            if(!currentEvent){
                return null;
            }

            const currentcategory : ICategory | undefined = currentEvent.categoriesist.find( category => {
                return category.id === dataQuestion.categoryId;
            });

            if(!currentcategory) {
                return null
            }

            return currentcategory;
        },

        getRandomQuestion(dataQuestion : IQuestionModel) : null | IQuestion {
            const currentcategory = this.getCurrentCategory(dataQuestion);
            
            if(!currentcategory) {
                return null;
            }

            let questionList = currentcategory.questionsList;
            if(currentcategory.questionsList.length > 1) {

                questionList = currentcategory.questionsList.filter(question => {                    
                    return question.id !== this.lastQuestion.questionId;
                })
            }
            const randomQuestion = questionList[Math.floor(Math.random() * questionList.length)];

            if(!randomQuestion) {
                return null
            }

            this.changeLastQuestion({
                eventId     : dataQuestion.eventId,
                categoryId  : dataQuestion.categoryId,
                questionId  : randomQuestion.id,
            })

            return randomQuestion;
        },
        
        changeLastQuestion(questionData: ILastQuestionData) : void {
            this.lastQuestion.eventId       = questionData.eventId;
            this.lastQuestion.categoryId    = questionData.categoryId;
            this.lastQuestion.questionId    = questionData.questionId;
        },

        verifyAdminPass(password : string) : Boolean {
            if(this.adminPass === password) {
                return true;
            }
            return false;
        },

        getQuestionReaderByID(eventId : string) : Boolean | null {
            const currentEventIndex = this.events.findIndex( currentEvent => {
                return currentEvent.id === eventId;
            })

            const readerActive = this.events[currentEventIndex].reader;

            if(readerActive != undefined) {
                return readerActive
            }

            return null
        },

        toggleQuestionReader(eventId : string) : Boolean | null {
            const currentEventIndex = this.events.findIndex( currentEvent => {
                return currentEvent.id === eventId;
            })

            if(currentEventIndex !== -1 ) {
                const readerActive = this.events[currentEventIndex].reader;

                this.events[currentEventIndex].reader       = !readerActive;
                this.events[currentEventIndex].reloadPage   = !readerActive;

                return !readerActive
            }

            return null
        }
    },
});

export default useStore;