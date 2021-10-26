import Joi from "joi";
import {Status} from './../status.js';

export const JoiSchema = {
  course: 'course',
  exam: 'exam',
  exercise: 'exercise',
  level: 'level',
  question: 'question',
  report: 'report',
  topic: 'topic',
  user: 'user',
}

export function joiValidator(schema, param) {
  return async (req, res, next) => {
    try {
      const body = req.body;

      await schema.validateAsync(body[param]);
      next();
    } catch (err) {
      console.log(err);
      return res.send(
        err.details.map((x) => ({
          status: Status.Fail,
          message: x.message,
        })),
      )
    }
  }
}

export const JoiValidationSchema = {
  course: Joi.object({
    courseName: Joi.string().required(),
    courseDescription: Joi.string().required(),
    courseThumbnail: Joi.string().allow('', null),
    courseVideos: Joi.array().items(
      Joi.object().keys({
        videoName: Joi.string().required(),
        videoUrl: Joi.string().required(),
      }),
    ),
    courseLevelId: Joi.string().required(),
    courseDuration: Joi.string().required(),
    ownerId: Joi.string().required(),
    price: Joi.number().min(0).required(),
  })
  .required()
  .options({abortEarly: false}),

  exam: Joi.object({
    questionIds: Joi.array().items(Joi.string().required()),
    examTime: Joi.string().required(),
  })
  .required()
  .options({abortEarly: false}),

  exercise: Joi.object({
    questionIds: Joi.array().items(Joi.string().required()),
  })
  .required()
  .options({abortEarly: false}),

  level: Joi.object({
    levelName: Joi.string().required(),
    levelMinPoint: Joi.number().min(0).required(),
    levelMaxPoint: Joi.number().min(1).required(),
  })
  .required()
  .options({abortEarly: false}),

  question: Joi.object({
    topicId: Joi.string().required(),
    type: Joi.string().required(),
    questionContent: Joi.string().required(),
    answerChoices: Joi.array().items(Joi.string().required()),
    answerRight: Joi.string(),
    mark: Joi.number().min(1),
  })
  .required()
  .options({abortEarly: false}),

  report: Joi.object({
    reportContent: Joi.string().required(),
  })
  .required()
  .options({abortEarly: false}),

  topic: Joi.object({
    name: Joi.string().required(),
  })
  .required()
  .options({abortEarly: false}),

  user: Joi.object({
    accountId: Joi.string().required(),
    fullName: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    dayOfBirth: Joi.date().allow('', null),
    gender: Joi.string().allow('', null),
    address: Joi.string().allow('', null),
  })
  .required()
  .unknown(true)
  .options({abortEarly: false}),
}