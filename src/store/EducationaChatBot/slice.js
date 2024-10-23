import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    chatHistory: [],
    isInputDisable: false,
    isChatBotLoading: false,
    regenerateResponse: false,
    feedBackAlert: false,
    feedBackMessage: "",
    isMenuExpand: true,
    isPdfViewExpand: false,
    pdfReferenceLink: "",
    conversationList: [],
    selectedConvoSessionId: undefined,
}
const educationalChatBotSlice = createSlice({
    name: 'educationalChatBotSlice',
    initialState,
    reducers: {
        setResetPendingEducationalBotRequest: (state, action) => {
            return initialState
        },
        setChatHistoryRequest: (state, action) => {
            state = {
                ...state,
                chatHistory: (action.payload === undefined || action.payload === null) ? [] :
                    Array.isArray(action.payload) ? action.payload : state?.chatHistory?.length > 0 ? [
                        ...state?.chatHistory,
                        action.payload
                    ] : [action.payload]
            }
            return state
        },
        updateChatPreferenceRequest: () => { },
        updateChatPreferenceResponse: (state, action) => {
            state.feedBackAlert = action?.payload?.feedBackAlert
            state.feedBackMessage = action?.payload?.feedBackMessage
        },
        getChatStreamRequest: (state) => {
            state.isChatBotLoading = true
        },
        getChatStreamResponse: (state, action) => {
            state.isChatBotLoading = false
            state.chatHistory = action?.payload?.updatedHistory
            state.regenerateResponse = action?.payload?.regenerateResponse
        },
        setInputDisableRequest: (state, action) => {
            state.isInputDisable = action.payload
        },
        setChatFeedBackCommentRequest: () => { },
        setChatFeedBackCommentResponse: (state, action) => {
            state.feedBackAlert = action?.payload?.feedBackAlert
            state.feedBackMessage = action?.payload?.feedBackMessage
        },
        setMenuOrPdfExpend: (state, action) => {
            state.isMenuExpand = action?.payload?.isMenuExpand
            state.isPdfViewExpand = action?.payload?.isPdfViewExpand
            state.pdfReferenceLink = action?.payload?.pdfReferenceLink
        },
        getEducationalBotConversationRequest: () => { },
        getEducationalBotConversationResponse: (state, action) => {
            state.conversationList = action.payload?.conversationList
            state.groupedConversationByDate = action?.payload?.groupedConversationByDate
        },
        setSelectedConversationSessionId: (state, action) => {
            state.selectedConvoSessionId = action?.payload
        },
        sendChatByEmailOrMobileRequest: () => { },
        resetRegenerateResponse: (state) => {
            state.regenerateResponse = false
        }
    }
});

const { actions, reducer } = educationalChatBotSlice;

export const {
    setResetPendingEducationalBotRequest,
    setChatHistoryRequest,
    setInputDisableRequest,
    updateChatPreferenceRequest, updateChatPreferenceResponse,
    getChatStreamRequest, getChatStreamResponse,
    setChatFeedBackCommentRequest, setChatFeedBackCommentResponse,
    setMenuOrPdfExpend,
    getEducationalBotConversationRequest, getEducationalBotConversationResponse,
    setSelectedConversationSessionId,
    sendChatByEmailOrMobileRequest,
    resetRegenerateResponse,
} = actions;

export default reducer;