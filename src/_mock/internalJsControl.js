import { AxiosInstance } from '../_mock/utilities';

// gender options 
export const getGenderoptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
];

// eductaion options
export const getEductaionOptions = [
    { value: "High school", label: "High school" },
    { value: "undergraduate", label: "undergraduate" },
    { value: "graduate", label: "graduate" },
    { value: "postgraduate", label: "postgraduate" },
];

// actionTypes
export const getActionTypes = {
    UNSELECT: 0,
    EDIT: 1,
    ISCONFIRM: 2,
    SELECT: 3
}

// profile page sub componets 
export const getProfileTabs = {
    CHANGEPASSWORD: "changePassword",
}

// custom pattens for custom validations
export const customPatterns = [{},
{ type: 'alphasp', pattern: /^[a-zA-Z]*$/, message: 'alphasp', alowChar: '^[a-zA-Z{spacial}]*$' },
{ type: 'alphaspace', pattern: /^[a-zA-Z ]*$/, message: 'alphaspace', alowChar: '^[a-zA-Z {spacial}]*$' },
{ type: 'number', pattern: /^[0-9]{1,20}$/, message: 'number', alowChar: null },

]

// roles
export const getBotRole = {
    USER: 'User',
    BOT: 'Bot'
}

// for Api Integration
export const callAPI = async ({ url, method, data, contentType }) => {
    const axiosInstance = AxiosInstance(contentType);
    try {
        const response = await axiosInstance({
            url,
            method,
            data,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// preventdefault for numbers 

export const allowedNumbersOnField = (fieldLength, e) => {
    const re = /^[0-9\b]+$/;

    if (!re.test(e.key) || (e.target.value.length >= fieldLength && e.key !== 'Backspace')) {
        e.preventDefault();
    }
}

// for page title 
export const pageTitle = (title) => {
    return (document.title = title);
};