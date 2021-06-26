export default {
    isValidationComplete(state) {
        const fields = Object.keys(state.validation.fields);
        const validations = fields.map((item) => {
            return state.validation.fields[item].isValid;
        });

        return validations.every(item => item);
    }
}