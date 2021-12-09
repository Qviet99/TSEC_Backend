import QuestionDocument from '../schemas/questionDocument.js';

const questionDocumentRepository = {
  createDocument: async(content) => {
    const result = await QuestionDocument.create({...content});
  
    return result;
  },

  getDocumentById: async(id) => {
    const result = await QuestionDocument.findById(id);

    return result;
  },
  
  
  getAllDocuments: async() => {
    const result = await QuestionDocument.find();
  
    return result;
  },

  getAllReadingDocuments: async() => {
    const result = await QuestionDocument.find({documentType: "reading"});
  
    return result;
  },

  getAllListeningDocuments: async() => {
    const result = await QuestionDocument.find({documentType: "listening"});
  
    return result;
  },

  updateDocumentById: async(id, data) => {
    const result = await QuestionDocument.findByIdAndUpdate(id, {...data});

    return result;
  },

  deleteDocument: async(id) => {
    const result = await QuestionDocument.deleteOne({_id: id});
  
    return result;
  },
}

export default questionDocumentRepository;