import validation from "validate.js";

export default {
    install: (app) => {
        
        app.config.globalProperties.$validator = validation.validators;
        
        app.config.globalProperties.$validate = (fields, constraints) => {
            return validation(fields, constraints);
        }

        app.config.globalProperties.$validateAsync = (fields, constraints) => {
            return validation.async(fields, constraints);
        }

        app.config.globalProperties.$validateSingle = (value, constraints) => {
            return validation.single(value, constraints);
        }
    }
}