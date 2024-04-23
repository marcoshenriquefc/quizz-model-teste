import http from "./config";
import { IQuestionAnswer } from "../interfaces/questions";

export default class DataQuestion {

    static async saveDataAnswer( questionResponse : IQuestionAnswer ) {
        const adminPasswords = "SecurityAdmin!!";
        const body = {
            adminPassword   : adminPasswords,
            eventID         : questionResponse.eventID,
            categoryID      : questionResponse.categoryID,
            questionID      : questionResponse.questionID,
            optionID        : questionResponse.optionID,
        };

        return http.post(
            '',
            body
        )
    }
}