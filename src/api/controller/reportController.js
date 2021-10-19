import reportService from '../../services/reportService.js';

const reportController = {
  //Create
  createReport: async(req, res , next) => {
    const {report} = req.body;
    const result = await reportService.createReport(report);
  
    return res.send(result);
  },

  //Read
  getReport: async(req, res , next) => {
    const reportId = req.params.id;
    const result = await reportService.getReportById(reportId);

    return res.send(result);
  },
  
  //Read All
  getAllReport: async(req, res , next) => {
    const result = await reportService.getAllReport();
  
    return res.send(result);
  },

  //Read All
  deleteReport: async(req, res , next) => {
    const {id} = req.params;
    const result = await reportService.deleteReport(id);
  
    return res.send(result);
  },
}

export default reportController;