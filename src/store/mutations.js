export default {
    
    FILL_ERROR: (state, {field, message}) => {
        state.validation.fields[field].errorMessage = message;
    },
    VALIDATION_FIELD_COMPLETE: (state, field) => {
        state.validation.fields[field].isValid = true;
        state.validation.fields[field].errorMessage = "";
    },
    VALIDATION_FIELD_ERROR: (state, field) => {
        state.validation.fields[field].isValid = false;
    },
    CLEAR_VALIDATION_FIELDS: (state) => {
        state.validation.fields = {};
    },
    INIT_VALIDATION: (state, fields) => {
        const validationFields = {};

        fields.forEach((field) => {
            validationFields[field] = {
                isValid: false,
                errorMessage: ""
            };
        });
        state.validation.fields = validationFields;
    },

    PROCESSING: (state) => {
        state.processingState = true;
    },
    PROCESSED: (state) => {
        state.processingState = false;
    },
    SET_TOKEN: (state, token) => {
        state.auth.token = token;
    },
    LOGIN: (state) => {
        state.auth.isLoggedin = true;
    },
    LOGOUT: (state) => {
        state.auth.isLoggedin = false;
    },

    CLEAN_RESPONSE: (state) => {
        state.response.isError = false;
        state.response.isSuccess = false;
        state.response.error = {};
        state.response.success = {};
    },
    RESPONSE_ERROR: (state, error) => {
        state.response.isError = true;
        state.response.error = error;
    },
    RESPONSE_SUCCESS: (state, success) => {
        state.response.isSuccess = true;
        state.response.success = success;
    }
}