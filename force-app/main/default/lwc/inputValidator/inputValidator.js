export function validateInput(inputType, inputValue) {
    const validator = {
        'email': {
            message: 'Input must be in email address form',
            validate: function(str) {
                var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                return pattern.test(str);
            }
        },
        'required': {
            message: 'Input is required',
            validate: function(str) {
                var pattern = /\S+/;
                return pattern.test(str);
            }
        },
        'number': {
            message: 'Input must be a number',
            validate: function(str) {
                var pattern = /^\d+\.?\d*$/;
                return pattern.test(str);
            }
        }
    };

    if (validator[inputType] && inputValue !== null && inputValue !== undefined) {
        const validationRule = validator[inputType];
        const isValid = validationRule.validate(inputValue);
        return {
            isValid: isValid,
            message: isValid ? '' : validationRule.message
        };
    } else {
        return {
            isValid: false,
            message: `Invalid input or input type: ${inputType}`
        };
    }
}
