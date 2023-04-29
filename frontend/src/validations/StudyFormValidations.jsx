// FormValidation.js

const validateTitle = (title) => {
    if (!title) {
      return 'Please enter a title';
    }
  };
  
  const validateDescription = (description) => {
    if (!description) {
      return 'Please enter a description';
    }
  };

  const validateGrade = (grade) => {
    if (!grade) {
      return 'Please select a grade';
    }
  };

  const validateSubject = (subject) => {
    if (!subject) {
      return 'Please enter the subject';
    }
  };
  
  const validateTeacher = (teacher) => {
    if (!teacher) {
      return 'Please enter a teacher name';
    }
    return '';
  };
  
  const validateNoteFile = (file) => {
    if (!file) {
      return 'Please select a file';
    }
    if (file.type !== 'application/msword' && file.type !== 'text/plain') {
      return 'Invalid file type! Only doc and txt files are allowed.';
    }
    return '';
  };

  const validatePdfFile = (file) => {
    if (!file) {
      return 'Please select a file';
    }
    if (file.type !== 'application/pdf') {
      return 'Invalid file type! Only PDF files are allowed.';
    }
    return '';
  };
  const validateLink = (link) => {
    if (!link) {
      return 'Please enter the URL';
    }
  };
  
  export {
    validateTitle,
    validateDescription,
    validateGrade,
    validateSubject,
    validateTeacher,
    validateNoteFile,
    validatePdfFile,
    validateLink
  };
  