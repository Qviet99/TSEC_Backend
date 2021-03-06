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
  if (mark === 0) return 'B???n kh??ng bi???t m???t ch??t ti???ng Anh n??o lu??n :|'

  if (choices === nChoices / 2)
    choiceAnalyze = `kh??? n??ng l??m tr???c nghi???m c???a b???n ??? m???c trung b??nh v???i ${choices} c??u d??ng tr??n t???ng th??? ${nChoices} c??u h???i`
  else if (choices === nChoices)
    choiceAnalyze = `Ch??c m???ng b???n l??m ????ng h???t t???t c??? c??c c??u tr???c nghi???m ^_^`
  else if (choices > nChoices/2 && choices < nChoices)
    choiceAnalyze = `B???n l??m ????ng ???????c h??n n???a s??? c??u tr???c nghi???m v???i ${choices} c??u ????ng tr??n ${nChoices} c??u`
  else if (choices < nChoices/2)
    choiceAnalyze = `B???n c???n c???i thi???n th??m v?? ch??? ????ng ch??a t???i m???t n???a s??? c??u tr???c nghi???m v???i ${choices} c??u ????ng tr??n ${nChoices} c??u`

  if (doc === nDoc / 2)
    docAnalyze = `kh??? n??ng ?????c v?? nghe c???a b???n ??? m???c trung b??nh v???i ${doc} c??u ????ng tr??n t???ng th??? ${nDoc} c??u h???i`
  else if (doc === nDoc)
    docAnalyze = `Ch??c m???ng b???n l??m ????ng h???t t???t c??? c??c c??u ?????c v?? nghe ^_^`
  else if (doc > nDoc/2 && doc < nDoc)
    docAnalyze = `B???n l??m ????ng ???????c h??n 1/2 s??? c??u ?????c v?? nghe v???i ${doc} c??u ????ng tr??n ${nDoc} c??u`
  else if (doc < nDoc/2)
    docAnalyze = `B???n c???n c???i thi???n th??m v?? ch??? ????ng ch??a t???i m???t n???a s??? c??u c???a ?????c v?? nghe v???i ${doc} c??u ????ng tr??n ${nDoc} c??u`
  
  if (mark === 1000) 
    markAnalyze = `B???n th???t gi???i, l??m ????ng h???t ?????t 1000/1000`
  if (mark  > 900 && mark < 1000)
    markAnalyze = `B???n th???t gi???i, l??m g???n ????ng h???t r???i n???u b???n mu???n ??i???m cao h??n n???a c?? th??? l???a ch???n nh???ng kh??a si??u c???p`
  else if (mark >= 600 && mark <= 899)
    markAnalyze = `Kh??? n??ng ti???ng anh c???a b???n r???t kh?? ?????t m???c ????? cao c???p c?? th??? h???c th??m c??c kh??a h???c ??? m???c t????ng ??????ng ho???c cao h??n ????? c???i thi???n`
  else if (mark >= 300 && mark <= 599)
    markAnalyze = 'Ti???ng Anh c???a b???n ?????t m???c trung c???p h??y xem th??m c??c kh??a h???c ??? m???c ????? t????ng ??????ng ho???c cao c???p ????? c???i thi???n'
  else if (mark < 300)
  markAnalyze = 'Ti???ng Anh c???a b???n ch??? ?????t m???c s?? c???p b???n c???n c???i thi???n nhi???u ?????y h??y xem c??c kh??a h???c d?????i ????y'

  return `${choiceAnalyze}-${docAnalyze}-${markAnalyze}`
}