/**
 * Example of JSON stored in database for a question:
 * {
 *   type: "selection",
 *   description: "Select the correct answer",
 *   options: [{id: "first", label: "First"}, {id: "second", label: "Second"}],
 * }
 *
 * Example of JSON stored in database for an answer:
 * {
 *   type: "selection",
 *   selected_id: "first",
 * }
 */

interface TaskQuestionAndAnswer<QuestionType extends string, Question, Answer> {
  type: QuestionType;
  description: string;
  question: Question;
  answer: Answer;
}

type SelectionQuestion = TaskQuestionAndAnswer<
  "selection",
  {
    options: {
      id: string;
      label: string;
    }[];
  },
  {
    selected_id: string;
  }
>;

type TextQuestion = TaskQuestionAndAnswer<
  "text",
  {
    placeholder: string;
  },
  {
    text: string;
  }
>;

type AnyQuestionAndAnswer = SelectionQuestion | TextQuestion;

export type AnyQuestion<
  Type extends AnyQuestionAndAnswer["type"] = AnyQuestionAndAnswer["type"]
> = Extract<AnyQuestionAndAnswer, { type: Type }>["question"] &
  Pick<AnyQuestionAndAnswer, "description"> & { type: Type };

export type AnyAnswer<
  Type extends AnyQuestionAndAnswer["type"] = AnyQuestionAndAnswer["type"]
> = Extract<AnyQuestionAndAnswer, { type: Type }>["answer"] & { type: Type };
