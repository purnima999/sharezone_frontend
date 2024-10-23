import * as _ from "lodash";
import { toast } from "react-toastify";
import { call, put, select, takeLeading } from 'redux-saga/effects';
import { callAPI, getActionTypes, getParsedData, loginRoles } from "../../_mock/helperIndex";
import { setActionTypeAndActionData, setChatBotLoadingIndex, setLoading } from "../UtilityCallFunction/slice";
import { store } from '../store';
import {
    getChatStreamRequest,
    getChatStreamResponse,
    getEducationalBotConversationRequest,
    getEducationalBotConversationResponse,
    sendChatByEmailOrMobileRequest,
    setChatFeedBackCommentRequest,
    setChatFeedBackCommentResponse,
    setInputDisableRequest,
    updateChatPreferenceRequest,
    updateChatPreferenceResponse
} from "./slice";

// LIKE DISLIKE CHAT RESPONSE
function* updateChatPreference(action) {
    let feedBackAlert = false;
    let feedBackMessage = "Glad you liked this answer!"
    const authUser = yield select(state => state.sessionStoreSlice?.authUser);
    let url = authUser?.role === loginRoles.PATIENT ? '/preference_chat' : authUser?.role === loginRoles.ADMIN ? '/preference_chat_admin' : '/preference_chat_unknown';

    try {

        const response = yield call(callAPI, {
            url: url,
            method: 'POST',
            data: action?.payload,
            contentType: 'application/json',
        });
        console.log("updateChatPreference_response=>", response)
        if (response?.status && response?.statuscode === 200)
            feedBackAlert = action?.payload?.preference
        else
            toast(response?.message, {
                position: "top-right",
                type: "error",
            });
    } catch (error) {
        console.log("error", error)
        // toast(error?.message || "Sorry, We are unable to reach server!",, {
        //     position: "top-right",
        //     type: "error",
        // });
    }
    yield put(updateChatPreferenceResponse({ feedBackAlert, feedBackMessage }))
}


export const fetchChatStream = async (payload, prevChatHistory, innerBot, authToken, sessionId, nonAuthSessionId) => {

    let isUpdated = false;
    let regenerateResponse = false;
    let updatedHistory = [...prevChatHistory];
    let isFirstChunk = true; // Flag to identify the first chunk

    const data = {
        message: payload || "",
    };
    const apiUrl = `https://api.stream.helloalfred.ai/${innerBot ? `educational_bot` : `educational_bot_home`}`;
    const headers = {
        'Content-Type': 'application/json',
    };
    if (innerBot) {
        headers["Authorization"] = `Bearer ${authToken}`;
        data["session_id"] = sessionId;
    } else {
        data["id"] = "1234-9876-54321";
        data["session_id"] = nonAuthSessionId;
    }

    try {
        const responseStream = await fetch(apiUrl, {
            method: 'POST',
            headers,
            body: JSON.stringify(data),
        });
        console.log("responseStream=>", { responseStream });

        if (responseStream?.status === 200) {
            const reader = responseStream.body.getReader();
            const decoder = new TextDecoder();
            let done = false;

            while (!done) {
                const { value, done: doneReading } = await reader.read();
                done = doneReading;
                const chunk = decoder.decode(value, { stream: true });

                let parsedChunk = getParsedData(chunk);

                console.log("chunk=>", { chunk, parsedChunk });

                if (parsedChunk && parsedChunk?.statuscode !== 200) {
                    updatedHistory = [...updatedHistory, { content: "Sorry Unable to reach server at that moment can you please try again!", role: 'Alfred' }];
                    regenerateResponse = true;
                } else {
                    let splittedChunkByIdentifier = chunk?.includes("#2SE24DC") && chunk?.split("#2SE24DC");
                    let isPdfExist = splittedChunkByIdentifier && splittedChunkByIdentifier?.length > 1;

                    const citationContent = isPdfExist ? splittedChunkByIdentifier[0] : null;
                    const chunkWithoutReferenceLink = isPdfExist ? splittedChunkByIdentifier[1] : chunk;

                    let citationObj = isPdfExist && citationContent && getParsedData(citationContent)?.data;

                    console.log("chunkWithoutReferenceLink=>", { chunk, parsedChunk, splittedChunkByIdentifier, chunkWithoutReferenceLink });

                    const lastMessage = updatedHistory[updatedHistory.length - 1];
                    if (isFirstChunk && isPdfExist) {
                        updatedHistory = [
                            ...updatedHistory,
                            { citationLink: citationObj, role: 'Alfred', content: '' },
                        ];
                        isFirstChunk = false; // Set the flag to false after processing the first chunk
                    } else {
                        if (lastMessage && lastMessage.role === 'Alfred') {
                            updatedHistory = [
                                ...updatedHistory.slice(0, updatedHistory.length - 1),
                                { ...lastMessage, content: lastMessage.content + chunkWithoutReferenceLink }
                            ];
                        } else {
                            updatedHistory = [...updatedHistory, { content: chunkWithoutReferenceLink, role: 'Alfred' }];
                        }
                    }
                }

                // Dispatch action to update chat history
                isUpdated = true;
                store.dispatch(getChatStreamResponse({ updatedHistory, regenerateResponse }));
            }
        }
    } catch (error) {
        console.error('Error streaming response:', error);
        updatedHistory = [...updatedHistory, { content: "Sorry Unable to reach server at that moment can you please try again!", role: 'Alfred' }];
        store.dispatch(getChatStreamResponse({ updatedHistory, regenerateResponse }));
        throw error;
    }

    return { isUpdated, updatedHistory };
};


// TO GET UNSTREAMED RESPONSE BOT EDUCATIONAL BOT
// function* fetchInnerEducationalBotResponse(payload, prevChatHistory) {
//     let updatedHistory = [...prevChatHistory];

//     let reqObj = {
//         message: payload || ""
//     }
//     try {
//         const response = yield call(callAPI, {
//             url: 'https://api.stream.helloalfred.ai/educational_bot',
//             method: 'POST',
//             data: reqObj,
//             contentType: 'application/json',
//         });
//         console.log("fetchInnerEducationalBotResponse=>", response)
//         if (response?.status && response?.statuscode === 200) {
//             updatedHistory = [...updatedHistory, { content: response?.data?.alfred, role: 'Alfred' }];
//             store.dispatch(getChatStreamResponse(updatedHistory));
//         } else if (response.statuscode === 500) {
//             updatedHistory = [...updatedHistory, { content: "Sorry Unable to reach server at that moment can you please try again!", role: 'Alfred' }];
//         } else {
//             toast(response?.message, {
//                 position: "top-right",
//                 type: "error",
//             });
//         }
//     } catch (error) {
//         console.error('Error streaming response:', error);
//         throw error;
//     }
//     yield put(getChatStreamResponse(updatedHistory))
// }


// TO GET CHAT STREAM
function* getEducationalBotChatStream(action) {
    let { inputValue, innerBot } = action?.payload;
    const { authToken, sessionId, nonAuthSessionId, authUser, selectedConvoSessionId } = yield select(state => state.sessionStoreSlice);

    const convoSessionId = selectedConvoSessionId ? selectedConvoSessionId : sessionId;

    try {
        const prevChatHistory = yield select(state => state.educationalChatBotSlice?.chatHistory || []);
        let chatLoadingIndex = prevChatHistory?.length;
        store.dispatch(setChatBotLoadingIndex(chatLoadingIndex));

        let { isUpdated, updatedHistory } = yield call(fetchChatStream, (inputValue || action?.payload), prevChatHistory, innerBot, authToken, convoSessionId, nonAuthSessionId);

        if (isUpdated) {
            let URL = `https://api.stream.helloalfred.ai/${innerBot
                ? (authUser.role === loginRoles.PATIENT ? `educational-bot-answer-dump` : `educational-bot-answer-dump-admin`)
                : `educational-bot-home-answer-dump`}`;

            let reqObj = {
                // patient_id: innerBot ? authToken : "1234-9876-54321",
                session_id: innerBot ? convoSessionId : nonAuthSessionId,
                alfred: updatedHistory?.[updatedHistory?.length - 1]?.content,
                user: updatedHistory?.[updatedHistory?.length - 2]?.content,
                refference: updatedHistory?.[updatedHistory?.length - 1]?.citationLink ? (JSON.stringify(updatedHistory?.[updatedHistory?.length - 1]?.citationLink)) : {}
            }
            let dumpBotChatResponse = yield call(callAPI, {
                url: URL,
                method: 'POST',
                data: reqObj,
                contentType: 'application/json',
            });
            console.log("dumpBotChatResponse", { nonAuthSessionId, reqObj, dumpBotChatResponse });

            if (dumpBotChatResponse?.status && dumpBotChatResponse?.statuscode === 200 && authUser?.role === loginRoles.ADMIN)
                // to sync conversation for admin
                store.dispatch(getEducationalBotConversationRequest({ isInternalCall: true }));
            else
                console.error("error=>", dumpBotChatResponse?.message);
        }
    } catch (error) {
        console.error('Error in getEducationalBotChatStream saga:', error);
    } finally {
        yield put(setInputDisableRequest(false))
        yield put(setChatBotLoadingIndex(null))
        store.dispatch(setActionTypeAndActionData({ actionType: getActionTypes.UNSELECT }))
    }
}

// TO SET FEEDBACK
function* setChatFeedBackComment(action) {

    let feedBackAlert = false;
    let feedBackMessage = "Thanks for your feedback!"
    let { comment, botResponse } = action?.payload;

    let reqObj = {
        question: botResponse,
        comment: comment
    }

    const authUser = yield select(state => state.sessionStoreSlice?.authUser);
    let url = authUser?.role === loginRoles.ADMIN ? '/chat_comment_admin' : '/chat_comment';

    try {
        const response = yield call(callAPI, {
            url: url,
            method: 'POST',
            data: reqObj,
            contentType: 'application/json',
            intenalToken: authUser?.role === loginRoles.PATIENT ? null : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXRpZW50X2lkIjoiMTIzNC05ODc2LTU0MzIxIn0.dX4_jwAwsw6FHJeQicHp1NmOWVfkLzYa5QujP8Cit8g"
        });
        console.log("setChatFeedBackComment_response=>", response);
        if (response?.status && response?.statuscode === 200) {
            feedBackAlert = true
            store.dispatch(setActionTypeAndActionData(getActionTypes.UNSELECT))
        } else
            toast(response?.message, {
                position: "top-right",
                type: "error",
            });
    } catch (error) {
        toast(error?.message || "Sorry, We are unable to reach server!", {
            position: "top-right",
            type: "error",
        });
    }
    yield put(setChatFeedBackCommentResponse({ feedBackAlert, feedBackMessage }))
}

// TO GET ALL THE CONVERSATION OF EDUCATION BOT 
function* getEducationalBotConversation(action) {
    if (!action.payload?.isInternalCall)
        store.dispatch(setLoading(true));
    let conversationList = [];
    let groupedConversationByDate = [];
    try {
        const response = yield call(callAPI, {
            url: '/admin/get_conversation',
            method: 'POST',
            data: null,
            contentType: 'application/json',
        });
        console.log("getEducationalBotConversation_response=>", response)
        if (response?.status && (response?.statuscode === 200 || response?.statuscode === 204) && response?.data) {
            let parsedResponse = getParsedData(response?.data);
            conversationList = parsedResponse?.records?.map((record) => {
                return {
                    ...record,
                    conversation_history: record.conversation_history?.map((detail) => {
                        return {
                            // ...detail,
                            role: detail.role === 'assistant' ? 'Alfred' : 'User',
                            content: detail.content || "",
                            citationLink: detail.refference?.citationLink || null
                        };
                    })
                };
            });

            console.log("conversationList=>", parsedResponse, conversationList)
            // grouping the data based on the dates
            groupedConversationByDate = (conversationList && _.groupBy(conversationList, "cdate")) || [];
            // set last convesation selected 
            // let lastRecord = conversationList && groupedConversationByDate?.[Object.keys(groupedConversationByDate)?.[0]]?.[0]?.session_id || null;
            // yield put(setSelectedConversationSessionId(lastRecord));
        } else
            toast(response?.message, {
                position: "top-right",
                type: "error",
            });
    } catch (error) {
        toast(error?.message || "Sorry, We are unable to reach server!", {
            position: "top-right",
            type: "error",
        });
    }
    yield put(getEducationalBotConversationResponse({ conversationList, groupedConversationByDate }));
    store.dispatch(setLoading(false));
}

// SET CHAT BY EMAIL OR MOBILE 
function* sendChatByEmailOrMobile(action) {
    store.dispatch(setLoading(true));
    let { values, shareModelObj } = action?.payload;
    let isSessionShare = shareModelObj?.session_id;

    let reqObj = isSessionShare ?
        {
            session_id: shareModelObj?.session_id
        } :
        {
            data: shareModelObj?.userValue,
            message: shareModelObj?.alfredValue
        }

    let url = values?.selectedChanel === "email" ? (isSessionShare ? "/session_Conversation_to_email" : "/send_email_to_phone") :
        values?.selectedChanel === "mobile" ? (isSessionShare ? "/session_Conversation_to_phone" : "/send_sms_to_phone") : "";

    try {
        // const response = yield call(callAPI, {
        //     url: url,
        //     method: 'POST',
        //     data: reqObj,
        //     contentType: 'application/json',
        // });

        let response = {
            status: true,
            statuscode: 200,
            message: `${values?.selectedChanel === "email" ? 'Email' : 'SMS'} send successfully!`
        }

        if (response?.status && response?.statuscode === 200)
            store.dispatch(setActionTypeAndActionData({ actionData: null }))

        toast(response?.message, {
            position: "top-right",
            type: response?.status && response?.statuscode === 200 ? "success" : "error",
        });
    } catch (err) {
        toast(err?.message || "Sorry, We are unable to reach server!", {
            position: "top-right",
            type: "error",
        });
    }
    store.dispatch(setLoading(false));
}

function* watchHomeEducationalBotSaga() {
    yield takeLeading(updateChatPreferenceRequest.type, updateChatPreference)
    yield takeLeading(getChatStreamRequest.type, getEducationalBotChatStream)
    yield takeLeading(setChatFeedBackCommentRequest.type, setChatFeedBackComment)
    yield takeLeading(getEducationalBotConversationRequest.type, getEducationalBotConversation);
    yield takeLeading(sendChatByEmailOrMobileRequest.type, sendChatByEmailOrMobile)
}

export default watchHomeEducationalBotSaga;