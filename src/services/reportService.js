import reportRepository from '../data/repositories/reportRepository.js';
import {Status} from '../api/status.js';

const reportService = {
  createReport: async(report) => {
    const result = await reportRepository.createReport(report);
  
    return {
      status: Status.Success,
      result,
    };
  },

  getReportById: async(reportId) => {
    const result = await reportRepository.getReportById(reportId);

    if (!result) {
      return {
        status: Status.Fail,
        message: 'Report not exist',
      };
    }

    return {
      status: Status.Success,
      result,
    };
  },
  
  getAllReport: async() => {
    const result = await reportRepository.getAllReport();
  
    return {
      status: Status.Success,
      result,
    };
  },

  deleteReport: async(id) => {
    const reportExist = await reportRepository.getReportById(id);

    if (!reportExist) {
      return {
        status: Status.Fail,
        message: 'Report not exist',
      };
    }

    await reportRepository.deleteReport(id);
  
    return {
      status: Status.Success,
    };
  },
}

export default reportService;