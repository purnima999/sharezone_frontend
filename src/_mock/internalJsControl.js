import { jwtDecode } from "jwt-decode";
import { AxiosInstance } from '../_mock/utilities';
import ChatFemaleuser from "../images/femaleuserImg.jpg";
import nodata from "../images/nodata.svg";
import nosearchdata from "../images/nosearchdata.svg";
import ChatMaleuser from "../images/userprofile.jpg";

// gender options 
export const getGenderoptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
];

//  residence options
export const getResidenceoptions = [
    { value: "Myself/Patient", label: "Myself/Patient" },
    { value: "Family Member", label: "Family Member" },
    { value: "Care Giver", label: "Care Giver" },
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
    SELECT: 3,
    CHATCOMMETOPEN: 4,
    ADD: 5,
    CHATPROMPTOPEN: 6
}

// profile page sub componets 
export const getProfileTabs = {
    CHANGEPASSWORD: "changePassword",
    BANKDETAILS: "bankDetails",
    SETTINGS: "settings"
}

// Home page tabs
export const getActivetab = {
    HEALTHHUB: "health_hub",
    EXPTMONITORING: "expert_monitoring",
    SYMPTOMSLIST: "list_your_symptoms",
    LIFEGOAL: "lifestyle_goals",
    ORMANAGEMENT: "optimal_risk_managemment"
}

// custom pattens for custom validations
export const customPatterns = [{},
{ type: 'alphasp', pattern: /^[a-zA-Z]*$/, message: 'alphasp', alowChar: '^[a-zA-Z{spacial}]*$' },
{ type: 'alphaspace', pattern: /^[a-zA-Z ]*$/, message: 'alphaspace', alowChar: '^[a-zA-Z {spacial}]*$' },
{ type: 'number', pattern: /^[0-9]{1,20}$/, message: 'number', alowChar: null },
{ type: 'alphaNumeric', pattern: /^[a-zA-Z0-9 ]+$/, message: 'alphaNumeric', alowChar: '^[a-zA-Z0-9 {spacial}]*$' },
{ type: 'alhaNumericWithSpl', pattern: /^.*$/, charactersmessage: 'alhaNumericWithSpl', allowChar: '.*' },
{ type: 'alphaspaceSpl', pattern: /^[a-zA-Z ]*$/, message: 'alphaspaceSpl', alowChar: '^[a-zA-Z {spacial}]*$' },

]

// roles
export const getRole = {
    USER: 'User',
    ALFRED: 'Alfred',
    PATIENT: 'patient',
    PHYSICIAN: 'doctor',
    ADMIN: 'admin',
    SUPERADMIN: 'superadmin'
}

// LOGIN ROLES
export const loginRoles = {
    SUPERADMIN: 9,
    ADMIN: 1,
    DOCTOR: 2,
    PATIENT: 3
}

// Healthhub weeks 
export const getWeekValue = {
    WEEKONE: "week1",
    WEEKTWO: "week2",
    WEEKTHREE: "week3",
    WEEKFOUR: "week4",
    WEEKFIVE: "week5",
    WEEKSIX: "week6"
}

// registration flows
export const getRegForm = {
    REGTYPESELECTION: 1,
    REGFORM: 2,
    OTPFORM: 3,
    SETPASSWORDFORM: 4,
    SUBSCRIPTIONFORM: 5,
    CONFIRMATIONFORM: 6,
}

export const getAuthRoute = {
    REGISTER: 1,
    SIGNIN: 2,
    GOOGLESIGNIN: 3,
    APPLESIGNIN: 4,
    FORGOTPASSWORDFROM: 5
}

export const getAuthRouteNames = {
    REGISTER: '/registration',
    SIGNIN: '/signin',
    FORGOTPASSWORDFROM: '/forgot-password'
}

// WEEK OPTIONS
export const getWeekoptions = [
    { value: "week1", label: "Week 1" },
    { value: "week2", label: "Week 2" },
    { value: "week3", label: "Week 3" },
    { value: "week4", label: "Week 4" },
    { value: "week5", label: "Week 5" },
    { value: "week6", label: "Week 6" },
    { value: "week7", label: "Week 7" },
    { value: "week8", label: "Week 8" },
    { value: "week9", label: "Week 9" },
    { value: "week10", label: "Week 10" },
    { value: "week11", label: "Week 11" },
    { value: "week12", label: "Week 12" },
];

// export const getWeekoptions = (numberOfWeeks = 12) => {
//     return Array.from({ length: numberOfWeeks }, (_, index) => ({
//         value: `week${index + 1}`,
//         label: `Week ${index + 1}`,
//     }));
// };

// TO GET ADMIN USER TAB 
export const getAdminUserTabs = {
    PENDING: "Pending",
    APPROVE: "Approved",
    HOLD: "Hold",
    REJECT: "Reject"
}

// TO GET ADMIN USERS STATUS
export const getAdminUserStatus = {
    PENDING: 0,
    APPROVE: 1,
    HOLD: 2,
    REJECT: 3,
    UNDO: 4
}

// lifestyle tab Symptoms Keys
export const getLsitOfSymptoms = [
    { key: "breathnessda", symptomName: "Breathlessness during activity", frequency: "", serverity: "", isAffectingLife: "" },
    { key: "breathnessea", symptomName: "Breathlessness even at rest", frequency: "", serverity: "", isAffectingLife: "" },
    { key: "dizziness", symptomName: "Dizziness", frequency: "", serverity: "", isAffectingLife: "" },
    { key: "col_swet", symptomName: "Cold sweat", frequency: "", serverity: "", isAffectingLife: "" },
    { key: "p_tiredness", symptomName: "Pronounced tiredness", frequency: "", serverity: "", isAffectingLife: "" },
    { key: "chest_pain", symptomName: "Chest pain", frequency: "", serverity: "", isAffectingLife: "" },
    { key: "pressurechest", symptomName: "Pressure / discomfort in chest", frequency: "", serverity: "", isAffectingLife: "" },
    { key: "worry", symptomName: "Worry", frequency: "", serverity: "", isAffectingLife: "" },
    { key: "weakness", symptomName: "Weakness", frequency: "", serverity: "", isAffectingLife: "" },
    { key: "infirmity", symptomName: "Infirmity", frequency: "", serverity: "", isAffectingLife: "" },
    { key: "nsynacpe", symptomName: "Near syncope", frequency: "", serverity: "", isAffectingLife: "" },
    { key: "syncope", symptomName: "Syncope", frequency: "", serverity: "", isAffectingLife: "" },
    { key: "tirednessafterwards", symptomName: "Tiredness afterwards", frequency: "", serverity: "", isAffectingLife: "" }
];

// Profile complition summary
const getProfileCompletionSUmmary = async (payload) => {
    try {
        const response = await AxiosInstance("application/json").post(
            "/profile-completions-summary",
            payload
        );
        if (
            response &&
            response.status === 200 &&
            response.data.statuscode === 200
        ) {
            return response.data;
        }
    } catch (error) {
        return false;
    }
};


export const getProfileCmpDetails = async (link, reOpenModel = false) => {
    let redirectionPath = "", modalMessage = "", isModalVisible = false, navigationLink = ""
    let reqObj = ((link === "historychat") ? { history_chat: true } : (link === "transcriptsummary") ? { history_trans: true } : (link === "chat") ? { behavioural_chat: true } : "")
    const profileCompletion = reqObj && await getProfileCompletionSUmmary(reqObj);
    console.log("profileCompletion_response=>", { reqObj, link, profileCompletion })
    if (profileCompletion?.status && profileCompletion?.data) {
        redirectionPath = { link: link, route: profileCompletion?.data?.web_redirection_key };
        if (!reOpenModel)
            isModalVisible = !isModalVisible;
        modalMessage = profileCompletion?.message;
    } else {
        isModalVisible = false;
        navigationLink = link
    }
    return { redirectionPath, isModalVisible, modalMessage, navigationLink }
};


// for Api Integration
export const callAPI = async ({ url, method, data, contentType, intenalToken = null }) => {
    console.log("internaltoken=>", intenalToken)
    const axiosInstance = AxiosInstance(contentType, intenalToken);
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

// to get genderbasedProfile Picture
export const getProfilePictureByGender = (getProfileDetails) => {
    return ((getProfileDetails?.profile_url === "NA") ? (getProfileDetails?.gender?.toLowerCase() === "female" ? ChatFemaleuser : ChatMaleuser) : getProfileDetails?.profile_url)
}


export const getDecodedTokenFromLocalStorage = (token) => {
    if (token) {
        try {
            const decoded = jwtDecode(token);
            return decoded;
        } catch (error) {
            console.error("Error decoding token:", error);
            return null;
        }
    } else {
        return null;
    }
};

// TO SEACRH MULTI KEY IN TABLE
export const getSearchedDataByKeyValues = (values, keys, searchKey) => {
    if (!Array.isArray(values) || !Array.isArray(keys) || !searchKey) return [];

    const lowerSearchKey = searchKey.toLowerCase();

    return values.filter(item =>
        keys.some(key =>
            typeof item[key] === 'string' && item[key].toLowerCase().includes(lowerSearchKey)
        )
    );
};


// pagination items 
export const getPaginationItem = 8;

// get mobile number length without country code
export const getmobileLengthWithoutCO = (value, country = null, dialCode = null) => {
    return value && value?.replace(country?.dialCode || dialCode, "")?.length
}

// to get no data found and no search data message and image
export const getNoDataFoundOrNoResult = (totalData, filteredData) => {
    let obj = totalData?.length === 0 ? { img: nodata, msg: "No data found!" }
        : filteredData?.length === 0 ? { img: nosearchdata, msg: "No Search result found" }
            : null;
    return obj;
}

// to get parsed data 
export const getParsedData = (data) => {
    try {
        return JSON.parse(data)
    } catch (error) {
        console.log("Parsing error!")
        return null
    }
}

// get parse text from html 
export const getParsedTextFromHtml = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    return doc.body.textContent;
}

// to get substring of 100words 
export const getTruncateString = (str, maxWords) => {
    const words = str.split(' ');
    if (words.length <= maxWords) {
        return str;
    }
    return words.slice(0, maxWords).join(' ') + '...';
}


// to HTML chunk content 
export const getSplitContentIntoChunks = (htmlContent, wordsPerChunk = 200) => {
    const div = document.createElement('div');
    div.innerHTML = htmlContent;
    const text = div.innerText || div.textContent; // Get plain text

    const words = text.split(/\s+/); // Split the content by spaces
    let chunks = [];

    for (let i = 0; i < words.length; i += wordsPerChunk) {
        let chunk = words.slice(i, i + wordsPerChunk).join(' '); // Join words to form a chunk
        chunks.push(chunk);
    }

    return chunks.map(chunk => {
        return { __html: chunk }; // Return chunks as HTML again
    });
};