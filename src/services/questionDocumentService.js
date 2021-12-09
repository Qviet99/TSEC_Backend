import questionDocumentRepository from '../data/repositories/questionDocumentRepository.js';
import {Status} from '../api/status.js';

const questionDocumentService = {
  createDocument: async(document) => {
    const result = await questionDocumentRepository.createDocument(document);
  
    return {
      status: Status.Success,
      result,
    };
  },

  getDocumentById: async(id) => {
    const result = await questionDocumentRepository.getDocumentById(id);

    if (!result) {
      return {
        status: Status.Fail,
        message: 'Question document not exist',
      };
    }

    return {
      status: Status.Success,
      result,
    };
  },
  
  getAllDocuments: async() => {
    const result = await questionDocumentRepository.getAllDocuments();
  
    return {
      status: Status.Success,
      result,
    };
  },

  getAllReadingDocuments: async() => {
    const result = await questionDocumentRepository.getAllReadingDocuments();
  
    return {
      status: Status.Success,
      result,
    };;
  },
  
  getAllListeningDocuments: async() => {
    const result = await questionDocumentRepository.getAllListeningDocuments();
  
    return {
      status: Status.Success,
      result,
    };;
  },

  updateDocumentById: async(id, data) => {
    const result = await questionDocumentRepository.getDocumentById(id);

    if (!result) {
      return {
        status: Status.Fail,
        message: 'Question document not exist',
      };
    }

    const updatedResult = await questionDocumentRepository.updateDocumentById(id, {...data});

    return {
      status: Status.Success,
      result: updatedResult,
    };
  },

  deleteDocument: async(id) => {
    const documentExist = await questionDocumentRepository.getDocumentById(id);

    if (!documentExist) {
      return {
        status: Status.Fail,
        message: 'Question document not exist',
      };
    }

    await questionDocumentRepository.deleteDocument(id);
  
    return {
      status: Status.Success,
    };
  },
}

export default questionDocumentService;