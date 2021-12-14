import questionRepository from '../data/repositories/questionRepository.js';
import examRepository from '../data/repositories/examRepository.js';
import courseRepository from '../data/repositories/courseRepository.js';
import levelRepository from '../data/repositories/levelRepository.js';
import authRepository from '../data/repositories/authRepository.js';
import {Status} from '../api/status.js';

const examService = {
  createEam: async(exam) => {
    const {questionIds} = exam;
    const listOfQuestionIdNotAvailable = [];
    const listOfQuestionWrongType = [];

    for (const id of questionIds) {
      const question = await questionRepository.getQuestionById(id);

      if (!question) {
        listOfQuestionIdNotAvailable.push(id);
      }

      if (question.type !== 'exam') {
        listOfQuestionWrongType.push(id);
      }
    };

    if (listOfQuestionIdNotAvailable.length > 0) {
      return {
        status: Status.Success,
        message: 'Exam contain some unavailable question',
        list: listOfQuestionIdNotAvailable,
      };
    }

    if (listOfQuestionWrongType.length > 0) {
      return {
        status: Status.Success,
        message: 'Exam contain some exercise type question',
        list: listOfQuestionWrongType,
      };
    }

    const result = await examRepository.createExam(exam);
  
    return {
      status: Status.Success,
      result,
    };
  },

  getExamResult: async(userId, id, data) => {
    let mark = 0;
    let totalMark = 0;
    let message;
    let courses = [];
    let nonDocQuestion = 0;
    let nAnswerNonDocQuestion = 0;
    let docQuestion = 0;
    let nAnswerDocQuestion = 0;

    const exam = await examRepository.getExamById(id);

    if (exam.questionIds.length > 0) {
      for (const questionId of exam.questionIds) {
        const question = await questionRepository.getQuestionById(questionId._id);

        if (question) {
          if (question.questionDocumentId) docQuestion++;
          else nonDocQuestion++;
          totalMark = totalMark + question.mark;
          data.forEach(value => {
            if (value._id === question._id.toString() && value.answer === question.answerRight) {
              if (question.questionDocumentId) nAnswerDocQuestion++;
              else nAnswerNonDocQuestion++;
              mark = mark + question.mark;
            }
          })
        }
      }
    }

    const resultRatio = mark * 1000 / totalMark;

    const realMark = getDozen(resultRatio);

    const analyzeMessage = analyze(nAnswerNonDocQuestion, nonDocQuestion, nAnswerDocQuestion, docQuestion, realMark);

    const courseLevel = await levelRepository.getLevelByMark(realMark + 50);

    if (!courseLevel) message = 'Currently there are no Course suitable for you';
    else courses = await courseRepository.getAllCourseByLevelId(courseLevel._id);

    await authRepository.updateAccountById(userId, {lastExamResult: realMark});

    return {
      status: Status.Success,
      result: {
        realMark,
        analyzeMessage,
        courses,
        message,
      },
    };
  },

  getExamById: async(examId) => {
    const result = await examRepository.getExamById(examId);

    if (!result) {
      return {
        status: Status.Fail,
        message: 'Exam not exist',
      };
    }

    return {
      status: Status.Success,
      result,
    };
  },

  getAllExam: async() => {
    const result = await examRepository.getAllExam();

    return {
      status: Status.Success,
      result,
    };
  },
  
  updateExam: async(id, exam) => {
    const {questionIds} = exam;
    const listOfQuestionIdNotAvailable = [];
    const listOfQuestionWrongType = [];

    const examExist = await examRepository.getExamById(id);

    if (!examExist) {
      return {
        status: Status.Fail,
        message: 'Exam not exist',
      };
    }

    for (const id of questionIds) {
      const question = await questionRepository.getQuestionById(id);

      if (!question) {
        listOfQuestionIdNotAvailable.push(id);
      }

      if (question.type !== 'exam') {
        listOfQuestionWrongType.push(id);
      }
    };

    if (listOfQuestionIdNotAvailable.length > 0) {
      return {
        status: Status.Success,
        message: 'Exam contain some unavailable question',
        list: listOfQuestionIdNotAvailable,
      };
    }

    if (listOfQuestionWrongType.length > 0) {
      return {
        status: Status.Success,
        message: 'Exam contain some exercise type question',
        list: listOfQuestionWrongType,
      };
    }

    await examRepository.updateExamById(id, exam);
  
    return {
      status: Status.Success,
    };
  },

  deleteExam: async(id) => {
    const examExist = await examRepository.getExamById(id);

    if (!examExist) {
      return {
        status: Status.Fail,
        message: 'Exam not exist',
      };
    }

    await examRepository.deleteExamById(id);
  
    return {
      status: Status.Success,
    };
  },
}

export default examService;

const getDozen = (n) => {
  var r = n%10;
  if(r>4) return Math.ceil(n/10) *10;
  else return Math.floor(n/10) *10;
}

const analyze = (choices, nChoices, doc, nDoc, mark) => {
  let choiceAnalyze = ""; 
  let docAnalyze = "";
  let markAnalyze = "";
  if (choices === nChoices / 2)
    choiceAnalyze = `khả năng làm trắc nghiệm của bạn ở mức trung bình với ${choices} câu dúng trên tổng thể ${nChoices} câu hỏi`
  else if (choices === nChoices)
    choiceAnalyze = `Chúc mừng bạn làm đúng hết tất cả các câu trắc nghiệm ^_^`
  else if (choices > nChoices/2 && choices < nChoices)
    choiceAnalyze = `Bạn làm đúng được hơn nữa số câu trắc nghiệm với ${choices} câu đúng trên ${nChoices} câu`
  else if (choices < nChoices/2)
    choiceAnalyze = `Bạn cần cải thiện thêm vì chỉ đúng chưa tới một nữa số câu trắc nghiệm với ${choices} câu đúng trên ${nChoices} câu`

  if (doc === nDoc / 2)
    docAnalyze = `khả năng đọc và nghe của bạn ở mức trung bình với ${doc} câu đúng trên tổng thể ${nDoc} câu hỏi`
  else if (doc === nDoc)
    docAnalyze = `Chúc mừng bạn làm đúng hết tất cả các câu đọc và nghe ^_^`
  else if (doc > nDoc/2 && doc < nDoc)
    docAnalyze = `Bạn làm đúng được hơn 1/2 số câu đọc và nghe với ${doc} câu đúng trên ${nDoc} câu`
  else if (doc < nDoc/2)
    docAnalyze = `Bạn cần cải thiện thêm vì chỉ đúng chưa tới một nữa số câu của đọc và nghe với ${doc} câu đúng trên ${nDoc} câu`
  
  if (mark === 1000) 
    markAnalyze = `Bạn thật giỏi, làm đúng hết đạt 1000/1000`
  else if (mark > 500 && mark < 1000)
    markAnalyze = `Khả năng tiếng anh của bạn rất khá có thể cải thiện thêm với các khóa học thuộc mức độ cao cấp và siêu cấp`
  else if (mark < 500)
    markAnalyze = 'Tiếng Anh của bạn chỉ đạt mức sơ cấp hãy xem thêm các khóa học phía dưới để cải thiện thêm'

  return `${choiceAnalyze}-${docAnalyze}-${markAnalyze}`
}