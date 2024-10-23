import React, { useEffect, useRef, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export default function ChatBotSearchArea({ handleFormSubmit, isInputDisable }) {
  const inputRef = useRef();
  const { transcript, listening, resetTranscript, finalTranscript } = useSpeechRecognition();

  const [inputValue, setInputValue] = useState(""); // user input
  const [isShowSendBtn, setIsShowSendBtn] = useState(false); // Show send button if input is not empty
  const [spechBtn, setSpechBtn] = useState(true); // Speech start and stop icon handling

  useEffect(() => {
    inputRef.current?.focus();
    return () => {
      resetTranscript();
    }
  }, []);

  useEffect(() => {
    if (finalTranscript) {
      setInputValue(prevInput => prevInput + finalTranscript);
      setIsShowSendBtn(true);
      resetTranscript();
    }
  }, [finalTranscript]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (value.trim() !== "") {
      setIsShowSendBtn(true);
    } else {
      setIsShowSendBtn(false);
    }
  };

  const getIconClassName = () => {
    let className = isShowSendBtn
      ? "icon_alfred_sendmsg h-auto"
      : spechBtn && !listening
        ? "icon_alfred_speech h-auto"
        : listening && "icon_alfred_audiostop pointer text-danger mt-0";
    let concatDisableclass = isInputDisable ? className?.concat(" disabled pointer") : className
    return concatDisableclass;
  };

  const handleIconSubmit = () => {
    if (isShowSendBtn) {
      handleFormSubmit(inputValue);
      setIsShowSendBtn(false); // Hide the send button after submission
    } else {
      if (listening) {
        SpeechRecognition.stopListening();
        setSpechBtn(true); // Reset to initial speech button state when stopped
      } else {
        SpeechRecognition.startListening();
        setSpechBtn(false);
      }
    }
    setInputValue(""); // Clear the input after submission
  };

  const clearInputValue = () => {
    setInputValue("");
    resetTranscript();
    setIsShowSendBtn(false);
    setSpechBtn(true);
  };

  const handleBackspace = (e) => {
    if (e?.key === "Backspace" && inputValue.length === 0) {
      resetTranscript(); // If no text is in input, reset transcript
      setIsShowSendBtn(false);
      setSpechBtn(true);
    }
  };


  useEffect(() => {
    if (inputValue?.length === 0) {
      setIsShowSendBtn(false);
      setSpechBtn(true);
    }
  }, [inputValue])

  return (
    <React.Fragment>
      <form action="#">
        <i className="icon_alfred_search h-auto"></i>
        <input
          type="text"
          placeholder="Ask a question about Atrial Fibrillation"
          name="message"
          value={transcript || inputValue}
          onChange={handleInputChange}
          disabled={isInputDisable}
          ref={inputRef}
          onKeyDown={(e) => {
            if (e?.key === "Enter") {
              e.preventDefault();
              handleFormSubmit(inputValue);
              setInputValue("");
              setIsShowSendBtn(false); // Hide send button after submission
            }
            handleBackspace(e); // Ensure backspace works
          }}
        />
        {isShowSendBtn && inputValue && (
          <i className="icon_alfred_close" onClick={clearInputValue} />
        )}
        <i className={getIconClassName()} onClick={handleIconSubmit} />
      </form>
    </React.Fragment>
  );
}
