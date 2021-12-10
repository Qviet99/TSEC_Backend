import courseService from '../../services/courseService.js';

const courseController = {
  //Create
  createCourse: async(req, res , next) => {
    const {course} = req.body;

    const result = await courseService.createCourse(course);

    return res.send(result);
  },

  //Buy Course
  registerCourse: async(req, res , next) => {
    const {id} = req.params;
    const userId = req.user._id;
    const result = await courseService.registerCourseForUser(userId, id);

    return res.send(result);
  },

  //Read
  getCourse: async(req, res , next) => {
    const {id} = req.params;
    const result = await courseService.getCourseById(id);

    return res.send(result);
  },

  //Read All
  getAllCourse: async(req, res , next) => {
    const {levelId} = req.query;
    const result = await courseService.getAllCourse(levelId);

    return res.send(result);
  },

  //Read All Register Course
  getAllRegisteredCourses: async(req, res , next) => {
    const userId = req.user._id;

    const result = await courseService.getAllRegisteredCourses(userId);

    return res.send(result);
  },

  getAllUserBoughtCourses: async(req, res , next) => {
    const userId = req.user._id;

    const result = await courseService.getAllUserBoughtCourses(userId);

    return res.send(result);
  },

  //Read All Of Current User
  getAllCourseOfUser: async(req, res , next) => {
    const result = await courseService.getAllCourseOfUser(req.user._id);

    return res.send(result);
  },

  //Read All Suggestion Courses based on user exam mark
  getSuggestionCourses: async(req, res , next) => {
    const {mark} = req.params;
    const result = await courseService.getSuggestionCourses(mark);

    return res.send(result);
  },

  //Update
  updateCourse: async(req, res , next) => {
    const {id} = req.params;
    const {course} = req.body;
    const result = await courseService.updateCourse(id , course);

    return res.send(result);
  },

  //Delete
  deleteCourse: async(req, res , next) => {
    const {id} = req.params;

    const result = await courseService.deleteCourse(id);

    return res.send(result);
  },
}

export default courseController