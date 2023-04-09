import { toast } from "react-hot-toast";

//validate login page username
export async function usernameValidate(values){
    const errors = usernameVerify({}, values);

    return errors;
}


//validate login page password
export async function passwordValidate(values){
    const errors = passwordVerify({}, values);

    return errors;
}



//validate username
function usernameVerify(error = {}, values) {
    if (!values.username) {
      error.username = toast.error('Username required...!');    
    } else if (values.username.includes(" ")) {
      error.username = toast.error('Invalid Username...!');
    }
    return error;
  }


/** validate password */
function passwordVerify(errors = {}, values) {

    const specialChars = /[@#$%^&*()]/;
    if (!values.password) {
      errors.password = toast.error("Password Required...!");    
    } else if (values.password.includes(" ")) {
      errors.password = toast.error("Invalid Password...!");
    }
    else if (values.password.length < 5) {
       errors.password = toast.error("Password must be more than five characters!");
    }
    else if (!specialChars.test(values.password)) {
        errors.password = toast.error("Password nust have special characters");
    }

    return errors;
  }


//validate reset passowrd

export async function resetPasswordValidation(values){
  const errors = passwordVerify({}, values);

  if(values.password !== values.confirm_pwd){
    errors.exist = toast.error("Passowrd Not Match ..!");
  }

  return errors;
}