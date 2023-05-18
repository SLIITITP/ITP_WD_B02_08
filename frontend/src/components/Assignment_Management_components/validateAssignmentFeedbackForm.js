export const validateAssignmentFeedbackForm = (teachersName, grade, assignmentType, email, message) => {
    let errors = {};
  
    if (!teachersName.trim()) {
      errors.teachersName = "Teacher's Name is required";
    }
  
    if (!grade) {
      errors.grade = "Grade is required";
    }
  
    if (!assignmentType) {
      errors.assignmentType = "Assignment Type is required";
    }
  
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      errors.email = "Please enter a valid email address";
    }
  
    if (!message.trim()) {
      errors.message = "Message is required";
    }
  
    return errors;
  };
  
  const isValidEmail = (email) => {
    // Use a regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  

  