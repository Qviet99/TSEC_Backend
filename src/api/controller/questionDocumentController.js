import questionDocumentService from '../../services/questionDocumentService.js';

const questionDocumentController = {
  //Create
  createQuestionDocument: async(req, res , next) => {
    const {questionDocument} = req.body;
    const result = await questionDocumentService.createDocument(questionDocument);
  
    return res.send(result);
  },

  //Read
  getQuestionDocument: async(req, res , next) => {
    const documentId = req.params.id;
    const result = await questionDocumentService.getDocumentById(documentId);

    return res.send(result);
  },
  
  //Read All
  getAllQuestionDocuments: async(req, res , next) => {
    const result = await questionDocumentService.getAllDocuments();
  
    return res.send(result);
  },

  getAllReadingDocuments: async(req, res , next) => {
    const result = await questionDocumentService.getAllReadingDocuments();
  
    return res.send(result);
  },

  getAllListeningDocuments: async(req, res , next) => {
    const result = await questionDocumentService.getAllListeningDocuments();
  
    return res.send(result);
  },

  //Update 
  updateQuestionDocument: async(req, res , next) => {
    const documentId = req.params.id;
    const {questionDocument} = req.body;
    const result = await questionDocumentService.updateDocumentById(documentId, questionDocument);

    return res.send(result);
  },

  //Read All
  deleteQuestionDocument: async(req, res , next) => {
    const {id} = req.params;
    const result = await questionDocumentService.deleteDocument(id);
  
    return res.send(result);
  },
}

export default questionDocumentController;