import Report from '../schemas/report.js';

const reportRepository = {
  createReport: async(report) => {
    const result = await Report.create({...report});
  
    return result;
  },

  getReportById: async(reportId) => {
    const result = await Report.findById(reportId);

    return result;
  },
  
  
  getAllReport: async() => {
    const result = await Report.find();
  
    return result;
  },

  deleteReport: async(id) => {
    const result = await Report.deleteOne({_id: id});
  
    return result;
  },
}

export default reportRepository;