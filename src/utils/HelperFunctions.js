import { API_CONFIG } from '../config/ApiConfig.js';
import { LOGS } from '../config/Logs.js';
import { PATTERNS } from '../config/Patterns.js';
import jsSHA from 'jssha';

export function postRequestWithFormData(requestData, route, paramsObject) {
    const formData = new FormData();
    for (const key in requestData) {
        if (requestData[key] instanceof Array) {
            for (let i = 0; i < requestData[key].length; i++) {
                formData.append(`${key}[]`, requestData[key][i]);
            }
        }
        else if (requestData[key] instanceof Object) {
            for (let item in Object.keys(requestData[key])) {
                formData.append(`${key}[]`, requestData[key][item]);
            }
        }
        else {
            if (requestData[key] === null) {
				requestData[key] = '';
            }
            formData.append(key, requestData[key].toString());
        }
    }

    let apiKey = localStorage.getItem('apiKey');
    formData.append('apiKey', apiKey);
    let params = {
        method: 'POST',
        credentials: 'include',
        body: formData,
    };
    return baseRequest(paramsObject, route, params);
}

export function getData(paramsObject, route) {
    let params = {
        credentials: 'include'
    };
    return baseRequest(paramsObject, route, params);
}

function createQueryParamsString(paramsObject) {
    const strArr = [];
	for (const key in paramsObject) {
		if (paramsObject.hasOwnProperty(key) && typeof (key) !== "object") {
			strArr.push(`${encodeURI(key)}=${encodeURI(paramsObject[key])}`);
		}
	}
	return strArr.join("&");
}

function encodeURI(str) {
    return encodeURIComponent(str)
        .replace(PATTERNS.encodeURIChars, c => `%${c.charCodeAt(0).toString(16).toUpperCase()}`);
}

export function createQueryString(paramsObject, route) {
    let tempParamsObject = JSON.parse(JSON.stringify(paramsObject));
    tempParamsObject.z_ca = Math.floor(Math.random() * 100000);
    tempParamsObject.api_key = API_CONFIG.api_key;
    tempParamsObject = sortParams(tempParamsObject);

    const signature = `${API_CONFIG.api_secret + API_CONFIG.url_suffix + route}?${createQueryParamsString(tempParamsObject)}`;
	const shaObject = new jsSHA("SHA-512", "TEXT");
	shaObject.update(signature);
	tempParamsObject.signature = shaObject.getHash("HEX");

    if (LOGS.ENABLE_LOGS) {
        console.info(`${API_CONFIG.url + API_CONFIG.url_suffix + route}?${createQueryParamsString(tempParamsObject)}`);
    }
    return `${API_CONFIG.url + API_CONFIG.url_suffix + route}?${createQueryParamsString(tempParamsObject)}`;
}

function sortParams(paramsObject) {
	const keys = [];
	for (const i in paramsObject) {
		keys.push(i);
	}
	keys.sort();
	const sortedParams = {};
	for (let i = 0; i < keys.length; i++) {
		sortedParams[keys[i]] = paramsObject[keys[i]];
	}
	return sortedParams;
}

function baseRequest(paramsObject, route, params) {
    const urlWithParams = createQueryString(paramsObject, route);

    if (LOGS.ENABLE_LOGS) {
		console.info(`paramsObject =====> `, paramsObject);
		console.info(`route =====> `, route);
		console.info(`params =====> `, params);
		console.info(`urlWithParams =====> `, urlWithParams);
    }
    
    return fetch(urlWithParams, params)
        .then(response => 
            response.text().then((text) => {
                let parsed = null;
                try {
                    parsed = text ? JSON.parse(text) : {};
                }
                catch(error) {
                    console.info(`ERROR: while parsing response from route ${route}: `, text);
                    return;
                }
                parsed.status = response.status;
                if (LOGS.ENABLE_LOGS) {
                    console.info(`Response from route ${route}: `, parsed);
                }
                return parsed;
            })
        )
        .then((resJson) => {
            return resJson;
        })
        .catch((error) => {
            console.info(`ERROR: In baseRequest when on route ${route}: `, error);
            return error;
        });
}