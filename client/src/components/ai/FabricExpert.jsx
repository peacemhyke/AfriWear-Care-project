import { useEffect, useRef, useState } from "react";
import { Send, LoaderCircle } from "lucide-react";

import { fabricExpertResponses } from "../../data/fabricExpertResponses";

import styles from "./FabricExpert.module.css";

function FabricExpert({ garment }) {
  const [question, setQuestion] = useState("");
  const [thinking, setThinking] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "Fabric Expert",
      text: garment.careGuide.aiResponse,
    },
  ]);

  // Keeps track of the chat area
  const chatBoxRef = useRef(null);

  // Keeps track of whether the user is near the bottom
  const isNearBottomRef = useRef(true);

  const getResponse = (text) => {
    const lower = text.toLowerCase();

    if (lower.includes("machine")) {
      return fabricExpertResponses.machine;
    }

    if (lower.includes("bleach")) {
      return fabricExpertResponses.bleach;
    }

    if (
      lower.includes("dry") ||
      lower.includes("sun")
    ) {
      return fabricExpertResponses.dry;
    }

    if (
      lower.includes("detergent") ||
      lower.includes("soap")
    ) {
      return fabricExpertResponses.detergent;
    }

    if (lower.includes("iron")) {
      return fabricExpertResponses.iron;
    }

    if (
      lower.includes("store") ||
      lower.includes("hanger")
    ) {
      return fabricExpertResponses.storage;
    }

    return fabricExpertResponses.default;
  };

  // Check whether the user is close to the bottom
  const handleScroll = () => {
    const chat = chatBoxRef.current;

    if (!chat) return;

    const distanceFromBottom =
      chat.scrollHeight -
      chat.scrollTop -
      chat.clientHeight;

    isNearBottomRef.current = distanceFromBottom < 80;
  };

  // Scroll to the newest message
  const scrollToBottom = (smooth = true) => {
    const chat = chatBoxRef.current;

    if (!chat) return;

    chat.scrollTo({
      top: chat.scrollHeight,
      behavior: smooth ? "smooth" : "auto",
    });
  };

  // Automatically move to new messages
  useEffect(() => {
    if (isNearBottomRef.current) {
      scrollToBottom(true);
    }
  }, [messages, thinking]);

  const handleQuestion = () => {
    if (!question.trim() || thinking) return;

    const userQuestion = question.trim();

    // The user is now actively chatting,
    // so we want to follow the conversation.
    isNearBottomRef.current = true;

    setMessages((prev) => [
      ...prev,
      {
        sender: "You",
        text: userQuestion,
      },
    ]);

    setQuestion("");
    setThinking(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "Fabric Expert",
          text: getResponse(userQuestion),
        },
      ]);

      setThinking(false);
    }, 1000);
  };

  return (
    <section className={styles.container}>

      <div className={styles.header}>
        <div>
          <h2>Meet Fabric Expert</h2>

          <span>
            Your AI Garment Care Assistant
          </span>
        </div>
      </div>

      <div
        className={styles.chatBox}
        ref={chatBoxRef}
        onScroll={handleScroll}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={
              message.sender === "You"
                ? styles.userMessage
                : styles.aiMessage
            }
          >
            <strong>{message.sender}</strong>

            <p>{message.text}</p>
          </div>
        ))}

        {thinking && (
          <div className={styles.thinking}>
            <LoaderCircle
              size={18}
              className={styles.loader}
            />

            <span>
              Fabric Expert is thinking...
            </span>
          </div>
        )}
      </div>

      <div className={styles.inputArea}>
        <input
          type="text"
          placeholder="Ask another question..."
          value={question}
          disabled={thinking}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleQuestion();
            }
          }}
        />

        <button
          onClick={handleQuestion}
          disabled={thinking}
          aria-label="Send question"
        >
          <Send size={18} />
        </button>
      </div>

    </section>
  );
}

export default FabricExpert;