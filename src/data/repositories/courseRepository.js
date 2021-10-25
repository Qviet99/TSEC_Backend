import Course from '../schemas/course.js';

const courseRepository = {
  createCourse: async(course) => {
    const result = await Course.create({...course});
  
    return result;
  },

  getCourseById: async(id) => {
    const result = await Course.findById(id);

    return result;
  },

  getCourseByName: async(courseName) => {
    const result = await Course.findOne({courseName});

    return result;
  },

  getAllCourse: async(levelId) => {
    let query = null;
    if (levelId) query = {levelId};
    const result = await Course.find(query);

    return result;
  },

  getAllRegisteredCourses: async(registeredCourses) => {
    const result = await Course.find({_id: {$in: registeredCourses}});

    return result;
  },

  getAllCourseOfUser: async(ownerId) => {
    const result = await Course.find({ownerId});

    return result;
  },

  getAllCourseByLevelId: async(courseLevelId) => {
    const result = await Course.find({courseLevelId});

    return result;
  },

  updateCourseById: async(id, course) => {
    const result = await Course.findByIdAndUpdate(id, {$set: {...course}});

    return result;
  },

  deleteCourseById: async(id) => {
    const result = await Course.deleteOne({_id: id});

    return result;
  },
}

export default courseRepository;