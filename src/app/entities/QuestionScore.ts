
/*
  Entity representing the response to a specific quesition asked during a screening
*/
export interface QuestionScore {
  qSID: number;
  questionId: number;
  screeningID: number;
  score: number;
  commentary: string;
  bucketId: number;
  beginTime: Date;
}
