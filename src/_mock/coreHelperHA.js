import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import * as Yup from 'yup';
import App from '../App';
import { customPatterns } from './helperIndex';
import { Provider } from 'react-redux';
import store from '../store/store';

let controleErrors = {
    "min": "Minimum {min} {type} are required",
    "max": "Max {max} {type} are allowed",
    "alphasp": "Allow only alpha and {spacial} but not allowed Space",
    "alphaspace": "Allow only alpha Characters "
}

var N = (e, s, t) => new Promise((a, n) => {
    var l = o => {
        try {
            d(t.next(o))
        } catch (c) {
            n(c)
        }
    },
        u = o => {
            try {
                d(t.throw(o))
            } catch (c) {
                n(c)
            }
        },
        d = o => o.done ? a(o.value) : Promise.resolve(o.value).then(l, u);
    d((t = t.apply(e, s)).next())
});


// Initial rendering 
export var loadPreDataAndApp = (e = !1) => N(void 0, null, function* () {
    //stop log in production
    process.env.NODE_ENV === "production" && (console.log = function () { })
    let app = React.createElement(Provider, {
        store: store
    },
        React.createElement(Router, null, React.createElement(App, null)))
    parseInt(React.version) >= 18 ? ReactDOM.createRoot(document.getElementById("root")).render(app) : ReactDOM.replace(app, document.getElementById("root"))
})

// Custom Validations 
let getCustomPatten = (msgType) => {
    let filteredPaten = customPatterns.find(t => t.type === msgType);
    return filteredPaten || ""
}
export var customContentValidation = (errorMsg, pattenObj, max = 0, min = 0) => {
    let patternMsg, pattenReg, minV, customPattern, reuiredF = Yup.string();

    return (errorMsg !== "" && (reuiredF = reuiredF.required(errorMsg)),
        min !== 0 && (minV = controleErrors.min.replace("{min}", min + "").replace("{type}", pattenObj?.patternType === "number" ? 'numbers' : 'characters'), reuiredF = reuiredF.min(min, minV).trim(minV)),
        max !== 0 && (reuiredF = reuiredF.max(max, controleErrors.max.replace("{max}", max + ""))),
        pattenObj && (
            customPattern = pattenObj.patternType ? getCustomPatten(pattenObj.patternType) : "",
            customPattern && (
                patternMsg = (customPattern?.message) ? controleErrors[pattenObj.message] : "",
                (pattenReg = customPattern.pattern, pattenObj.spacialChar && customPattern.alowChar &&
                    (patternMsg = patternMsg?.replace(/{spacial}/g, pattenObj.spacialChar)),
                    pattenReg = new RegExp(customPattern.alowChar?.replace(/{spacial}/g, pattenObj.spacialChar)))
            ),
            reuiredF = reuiredF.matches(pattenReg, {
                message: patternMsg
            })), reuiredF.nullable()
    )
}

