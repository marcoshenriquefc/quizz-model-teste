export interface IEvent {
    id              : string,
    title           : string,
    reloadPage      : Boolean, 
    reader         ?: Boolean,
    categoriesist   : ICategory[],
    styleEvent     ?: IStyleEvent,
}

export interface IStyleEvent {
    logoImage           ?: string,
    backgroundImage     ?: string,
    backgroundColor     ?: string,
    optionColor         ?: string,
    textColor           ?: string,
}

export interface ICategory {
    id              : string,
    title           : string,
    questionsList    : IQuestion[],
}

export interface IQuestion{
    id          : string,
    question    : string,
    options     : IAnswer[],
}

export interface IAnswer {
    optionId        : string,
    soundId        ?: string,
    title           : string, 
    icon           ?: IIcon,
    description     : string
}

export interface IIcon {
    id      : string,
    source  : string,
    alt    ?: string,
}