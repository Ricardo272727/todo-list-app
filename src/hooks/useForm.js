import { useState } from 'react';

const getFieldValue = ({ target }) => {
    if(!target) return null;
    if(target.type === 'checkbox')
        return target.checked;
    return target.value;
}

const useForm = (initialValues = {}, validateFunc) => {
  const [fields, setFields] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const cleanError = (name) => setErrors({...errors, [name]: null});
  const addError = (name, error) => setErrors({...errors, [name]: error});

 
  const handleChange = (e) => {
    let { name, value } = e.target;
    if(validateFunc)
      execValidateFunc(name, value);
    
    setFields({
        ...fields,
      [name]: getFieldValue(e)
    })
  };

  const execValidateFunc = (name, value) => {
      let valid = validateFunc(name, value);
      if(valid.error){
            addError(name, valid.error);
            return false;
      } else if(valid.validator) {
         if(valid.validator(fields)){
            cleanError(name);
            return true;
         } else {
            addError(name, valid.message);
            return false;
         }
      } else {
        cleanError(name);
        return true;
      }
  }   

  const getInput = (name, validate) => {
    return {
      name,
      value: fields[name],
      onChange: handleChange
    }
  };
  
  const getCheckbox = (name) => {
    return {
        name,
        checked: fields[name],       
        onChange: handleChange
    }
  };

  const validate = () => {
    if(!validateFunc) return true;
    
    let keys = Object.keys(fields);
    for(let i = 0; i < keys.length; i+=1)
      if(!execValidateFunc(keys[i], fields[keys[i]]))
        return false;
    return true;
  };

  return {
    getInput,
    getCheckbox,
    errors,
    fields,
    validate
  }
};

export default useForm;
