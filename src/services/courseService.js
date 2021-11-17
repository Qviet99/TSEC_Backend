import courseRepository from '../data/repositories/courseRepository.js';
import levelRepository from '../data/repositories/levelRepository.js';
import authRepository from '../data/repositories/authRepository.js';
import {Status} from '../api/status.js';

const courseService = {
  createCourse: async(course) => {
    const {courseName, courseLevelId} = course;
    const courseNameExist = await courseRepository.getCourseByName(courseName);

    if (courseNameExist) {
      return {
        status: Status.Fail,
        message: 'Course Name Already Exist',
      };      
    }

    const levelExist = await levelRepository.getLevelById(courseLevelId);
    
    if (!levelExist) {
      return {
        status: Status.Fail,
        message: 'Course Level Not Exist',
      };   
    }

    const result = await courseRepository.createCourse(course);

    return {
      status: Status.Success,
      result,
    };
  },

  registerCourseForUser: async(userId, id) => {
    const userAccount = await authRepository.getAccountById(userId);

    if (!userAccount) {
      return {
        status: Status.Fail,
        message: 'Account not exist',
      };  
    }

    const {registeredCourses} = userAccount;

    const hasNotBought = registeredCourses.every((id) => id.toString() !== id.toString());

    if (!hasNotBought) {
      return {
        status: Status.Fail,
        message: 'Already bought the course',
      };  
    }

    await authRepository.updateAccountById(userId, {registeredCourses: [...registeredCourses, id]});

    return {
      status: Status.Success,
    };
  },
  
  getCourseById: async(courseId) => {
    const result = await courseRepository.getCourseById(courseId);
      
    return {
      status: Status.Success,
      result,
    };
  },

  getAllCourse: async(levelId) => {
    const result = await courseRepository.getAllCourse(levelId);
      
    return {
      status: Status.Success,
      result,
    };
  },

  getAllRegisteredCourses: async(userId) => {
    const userAccount = await authRepository.getAccountById(userId);

    const result = userAccount.registeredCourses;
      
    return {
      status: Status.Success,
      result,
    };
  },
  
  getAllCourseOfUser: async(id) => {
    const result = await courseRepository.getAllCourseOfUser(id);

    return {
      status: Status.Success,
      result,
    };
  },

  getSuggestionCourses: async(mark) => {
    const courseLevel = await levelRepository.getLevelByMark(mark);

    if (!courseLevel) {
      return {
        status: Status.Fail,
        message: 'Currently there are no Course suitable for you',
      };   
    }

    const result = await courseRepository.getAllCourseByLevelId(courseLevel._id);
      
    return {
      status: Status.Success,
      result,
    };
  },

  updateCourse: async(id, userId, course) => {
    const courseExist = await courseRepository.getCourseById(id);

    if (!courseExist) {
      return {
        status: Status.Fail,
        message: 'Course Not Exist',
      };  
    }

    if (userId.toString() !== course.ownerId.toString()) {
      return {
        status: Status.Fail,
        message: 'User Do Not Have Permission',
      };     
    }

    const {courseName, courseLevelId} = course;

    const courseNameExist = await courseRepository.getCourseByName(courseName);

    if (courseNameExist && courseNameExist._id.toString() !== id) {
      return {
        status: Status.Fail,
        message: 'Course Name Already Exist',
      };      
    }

    const levelExist = await levelRepository.getLevelById(courseLevelId);
    
    if (!levelExist) {
      return {
        status: Status.Fail,
        message: 'Course Level Not Exist',
      };   
    }

    await courseRepository.updateCourseById(id, course);
      
    return {
      status: Status.Success,
    };
  },

  deleteCourse: async(id, userId) => {
    const courseExist = await courseRepository.getCourseById(id);

    if (!courseExist) {
      return {
        status: Status.Fail,
        message: 'Course Not Exist',
      };  
    }

    if (userId.toString() !== courseExist.ownerId.toString()) {
      return {
        status: Status.Fail,
        message: 'User Do Not Have Permission',
      };     
    }

    await courseRepository.deleteCourseById(id);
      
    return {
      status: Status.Success,
    };
  },
}

export default courseService;