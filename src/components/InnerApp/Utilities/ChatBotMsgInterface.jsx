import React, { useEffect, useRef, useState } from 'react';
// import CopyToClipboard from 'react-copy-to-clipboard';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Card, CardBody, Col, Row, UncontrolledTooltip } from 'reactstrap';
import { getActionTypes, getParsedTextFromHtml, getRole } from '../../../_mock/internalJsControl';
// import Chatbot from "../../images/alfredicon.svg";
// import Chatuser from "../../images/usericon.svg";
import {
  getChatStreamRequest,
  setChatFeedBackCommentRequest,
  setChatFeedBackCommentResponse,
  setInputDisableRequest,
  updateChatPreferenceRequest
} from '../../../store/EducationaChatBot/slice';
import { setActionTypeAndActionData } from '../../../store/UtilityCallFunction/slice';
import { ChatBotFeedBackModal } from "./ChatBotFeedBackModal";
import { ChatBotShareModal } from './ChatBotShareModal';
import EducationalBotHTMLcontent from './EducationalBotHTMLcontent';

let promptdislikeQuestions = [
  { qid: 1, question: "Should not have used memory" },
  { qid: 2, question: "Do not like the style" },
  { qid: 3, question: "Not factually correct" },
  { qid: 4, question: "Did not fully follow instructions" },
  { qid: 0, question: "More" }
]
const ChatBotMsgInterface = ({ props }) => {
  const dispatch = useDispatch()

  const {
    chatHistory,
    index,
    profilePicture,
    getProfileDetails,
    isInputDisable,
    actionType,
    // feedBackAlert,
    toatlHistory
  } = props;

  const messagesEndRef = useRef(null);

  const [selectedIcons, setSelectedIcons,] = useState([]); // State to track selected icons
  const [copied, setCopied] = useState(false); // to show copy action status;
  const [shareModelObj, setShareModelObj] = useState(null);
  const [textAndSpeechConvo, setTextAndSpeechConvo] = useState({
    isStartAudio: false,
    icon: "icon_alfred_audioplay",
    isStartSpeech: false,
    speechIcon: ""
  })

  const chatBotLoadingIndex = useSelector((state) => state?.utilityCallFunctionSlice?.chatBotLoadingIndex);
  const actionData = useSelector((state) => state?.utilityCallFunctionSlice?.actionData);
  const feedBackAlert = useSelector((state) => state?.educationalChatBotSlice?.feedBackAlert); // temprory fix
  const feedBackMessage = useSelector((state) => state?.educationalChatBotSlice?.feedBackMessage); // temprory fix

  const isUser = chatHistory?.role === getRole.USER;
  const isCurrentLoadingIndex = chatBotLoadingIndex === index

  useEffect(() => {
    scrollToBottom(); // Scroll to bottom whenever messages change
  }, [chatHistory, selectedIcons]);

  useEffect(() => {
    resetIsPromptOpen()
  }, [chatHistory]);

  // for removing feedback alert
  useEffect(() => {
    setTimeout(() => {
      dispatch(setChatFeedBackCommentResponse(false))
    }, 10000)
  }, [feedBackAlert, dispatch]);

  useEffect(() => {
    return () => {
      speechSynthesis.cancel()
    }
  });

  useEffect(() => {
    let parsedHtml = getParsedTextFromHtml(textAndSpeechConvo?.content);
    const utterance = new SpeechSynthesisUtterance(parsedHtml);
    if (textAndSpeechConvo?.isStartAudio)
      speechSynthesis.speak(utterance);
    else
      speechSynthesis.cancel();
  }, [textAndSpeechConvo]);

  const handleAction = (messageId, iconType, alfredValue, userValue) => {
    let isLikedIcon = iconType === 'like'
    setSelectedIcons(prevIcons => ({
      ...prevIcons,
      [messageId]: { reaction: iconType, isPromptOpen: !isLikedIcon }
    }))

    let reqObj = {
      message: alfredValue,
      preference: isLikedIcon
    }
    dispatch(updateChatPreferenceRequest(reqObj))
    // if selected dislike show modal
    if (iconType === 'dislike')
      setActionTypesForPrompt(getActionTypes.CHATPROMPTOPEN)
  }

  const handlePromptTabs = (value) => {
    if (value?.qid === 0)
      setActionTypesForPrompt(getActionTypes.CHATCOMMETOPEN)
    else
      dispatch(setChatFeedBackCommentRequest({ comment: (value?.question || value), botResponse: chatHistory?.content }))
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const setActionTypesForPrompt = (status, isPromptClose) => {
    dispatch(setActionTypeAndActionData({ actionType: status }))
  }

  // to reset prompt open
  const resetIsPromptOpen = () => {
    setSelectedIcons(prevIcons => {
      const updatedIcons = { ...prevIcons };
      Object.keys(updatedIcons).forEach(key => {
        updatedIcons[key].isPromptOpen = false;
      });
      return updatedIcons;
    });
  };

  const handleRegenerateResponse = () => {
    let inputValue = toatlHistory?.[toatlHistory?.length - 2]?.content;
    if (!inputValue?.trim()) return;
    dispatch(setInputDisableRequest(true))
    dispatch(getChatStreamRequest(inputValue))
  }

  // to get text from html code
  let getTextFromHtmlContent = getParsedTextFromHtml(chatHistory?.content);

  const shareActionHandle = (i, toatlHistory, status) => {
    // setShareModelObj({ isModelOpen: status, alfredValue: toatlHistory?.[i]?.content, userValue: toatlHistory?.[i - 1]?.content })
    dispatch(setActionTypeAndActionData({ actionData: { isModelOpen: status, alfredValue: toatlHistory?.[i]?.content, userValue: toatlHistory?.[i - 1]?.content } }))
  }

  // text to speech
  const textToSpeechHandle = (status, content) => {
    setTextAndSpeechConvo({
      isStartAudio: status,
      content,
      icon: status ? "icon_alfred_audiostop text-danger mt-0" : "icon_alfred_audioplay"
    })
  }

  return (
    <React.Fragment>
      <Row className={"mb-4 al_chatcontent" + (isUser ? " al_usermsg" : "")}>
        <div>
          {isUser ?
            <ChatBotTextUi props={{ imgUrl: (profilePicture), imgAlt: "chat user", imgId: "userimagehomeed", toolTipText: ((getProfileDetails && getProfileDetails?.username) || "User") }} /> :
            <ChatBotTextUi props={{ imgUrl: "", imgAlt: "Bot", imgId: "botimagehomeed", toolTipText: "Alfred" }} />
          }
        </div>
        <Col>
          {isUser ?
            <div>{chatHistory?.content}</div> :
            <div><EducationalBotHTMLcontent props={{ content: chatHistory?.content, citationLink: chatHistory?.citationLink, isCurrentLoadingIndex }} /></div>
          }
          {/* <div className='error_alert'>Sorry Unable to reach server at that moment can you please try again</div> */}

          {!isUser && !isInputDisable && (<>
            <p className="mb-0 mt-2 al_chatfeedbackactions d-flex align-items-center">
              <i className={"icon_alfred_like pointer me-3 " + (selectedIcons[index]?.reaction === 'like' ? 'like' : '')} onClick={() => handleAction(index, 'like', chatHistory?.content)}></i>
              <i className={"icon_alfred_dislike pointer me-3 " + (selectedIcons[index]?.reaction === 'dislike' ? 'text-danger mt-0' : '')} onClick={() => handleAction(index, 'dislike', chatHistory?.content)}></i>
              {/* <CopyToClipboard text={getTextFromHtmlContent} onCopy={() => setCopied(true)}>
                <i className="icon_alfred_copy me-3 pointer" style={{ color: copied ? 'green' : '' }}></i>
              </CopyToClipboard> */}
              <i className={`${textAndSpeechConvo?.icon} me-3 pointer`} style={{ fontSize: "15px" }} onClick={() => textToSpeechHandle(!textAndSpeechConvo?.isStartAudio, chatHistory?.content)}></i>
              <i className="icon_alfred_share me-3 pointer" style={{ fontSize: "15px" }} onClick={() => shareActionHandle(index, toatlHistory, true)}></i>
              {/* <i className="icon_alfred_sync me-3 pointer" onClick={() => handleRegenerateResponse()}></i> */}
            </p>

            {/* Dislike options */}
            {selectedIcons[index]?.isPromptOpen && (actionType === getActionTypes.CHATPROMPTOPEN || actionType === getActionTypes.CHATCOMMETOPEN) &&
              <DislikePrompt props={{ setActionTypesForPrompt, promptdislikeQuestions, handlePromptTabs }} />}

            {/* Feedback alert */}
            {(['like', 'dislike']?.includes(selectedIcons?.[index]?.reaction) && feedBackAlert) &&
              <Alert color="success" className='mt-2 d-inline-flex align-items-center'><i className="icon_alfred_smile_emoji me-1" style={{ fontSize: "15px" }}></i>{feedBackMessage}</Alert>}

            {/* Feedbackmodal */}
            {selectedIcons[index]?.isPromptOpen && actionType === getActionTypes.CHATCOMMETOPEN &&
              <ChatBotFeedBackModal props={{ setActionTypesForPrompt, handlePromptTabs, actionType }} />}

            {/* sharemodel */}
            {actionData?.isModelOpen && <ChatBotShareModal props={{ shareActionHandle, actionData }} />}
          </>)}
        </Col>
      </Row>
      <div ref={messagesEndRef} />
    </React.Fragment>
  )
}

export default ChatBotMsgInterface;

// ========= image and tooltip ============
export const ChatBotTextUi = ({ props }) => {

  const { imgUrl, imgAlt, imgId, toolTipText } = props;
  return (
    <>
      <img src={imgUrl} alt={imgAlt} id={imgId} />
      <UncontrolledTooltip
        modifiers={[{ preventOverflow: { boundariesElement: 'window' } }]}
        placement='bottom' target={imgId}>
        {toolTipText}
      </UncontrolledTooltip>
    </>
  )
}

// ============ dislike prompt option ==========
export const DislikePrompt = ({ props }) => {

  let { setActionTypesForPrompt, promptdislikeQuestions, handlePromptTabs } = props;

  return (
    <>
      <div className='p-3 w-100 mt-3' style={{ backgroundColor: "transparent", border: "1px solid #dddddd", borderRadius: "8px" }}>
        <div className='d-flex justify-content-between align-items-center'>
          <div>Tell us more...</div>
          <i className="icon_alfred_close pointer"
            onClick={() => setActionTypesForPrompt(getActionTypes.UNSELECT, true)}
          ></i>
        </div>
        <Row className="mt-3 al_promptcard">
          {promptdislikeQuestions && promptdislikeQuestions?.map((promptQuestion, index) => (
            <Col xs="auto" className="mb-2" key={promptQuestion?.qid}>
              <Card className='al_cardview pointer'
                style={{ position: "unset", minWidth: "unset", borderRadius: "8px" }}
                onClick={() => {
                  handlePromptTabs(promptQuestion)
                }}
              >
                <CardBody className='px-3 py-1 h-auto'>
                  <div className="text-xs-small lh-normal">{promptQuestion?.question}</div>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  )
}