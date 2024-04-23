export interface IQuestionModel {
    eventId     : string,
    categoryId  : string,
}

export interface ILastQuestionData {
    eventId     ?: string | null,
    categoryId  ?: string | null,
    questionId  ?: string | null,
}

export interface IQuestionAnswer {
    adminPassword ?: string
    eventID     : string
    categoryID  : string
    questionID  : string
    optionID    : string
}