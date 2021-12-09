import Course from '../schemas/course.js';

const courseRepository = {
  createCourse: async(course) => {
    const result = await Course.create({...course});
  
    return result;
  },

  getCourseById: async(id) => {
    const result = await Course.findById(id).populate({ path: 'courseLevelId', select: 'levelName' }).populate({ path: 'owner', select: 'fullName'});

    return result;
  },

  getCourseByName: async(courseName) => {
    const result = await Course.findOne({courseName}).populate({ path: 'courseLevelId', select: 'levelName' }).populate({ path: 'owner', select: 'fullName'});

    return result;
  },

  getAllCourse: async(levelId) => {
    let query = null;
    if (levelId) query = {courseLevelId: levelId};
    const result = await Course.find(query).populate({ path: 'courseLevelId', select: 'levelName' }).populate({ path: 'owner', select: 'fullName'});

    return result;
  },

  getAllUserBoughtCourses: async(courseIds) => {
    const result = await Course.find({_id: [...courseIds]}).populate({ path: 'courseLevelId', select: 'levelName' }).populate({ path: 'owner', select: 'fullName'});

    return result;
  },

  getAllCourseOfUser: async(ownerId) => {
    const result = await Course.find({ownerId}).populate({ path: 'courseLevelId', select: 'levelName' }).populate({ path: 'owner', select: 'fullName'});

    return result;
  },

  getAllCourseByLevelId: async(courseLevelId) => {
    const result = await Course.find({courseLevelId}).populate({ path: 'courseLevelId', select: 'levelName' }).populate({ path: 'owner', select: 'fullName'});

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