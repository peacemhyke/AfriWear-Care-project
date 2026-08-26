import { useEffect, useRef, useState } from "react";
import { Send, LoaderCircle } from "lucide-react";

import { fabricExpertResponses } from "../../data/fabricExpertResponses";

import styles from "./FabricExpert.module.css";

function FabricExpert({ garment }) {
  const [question, setQuestion] = useState("");
  const [thinking, setThinking] = useState(false);

  const buildInitialResponse = () => {
    const fabricName = garment?.fabric?.name || "this fabric";

    const careInstructions = garment?.careInstructions || [];

    const washing = careInstructions.find(
      (item) => item.category?.toLowerCase() === "washing"
    );

    const drying = careInstructions.find(
      (item) => item.category?.toLowerCase() === "drying"
    );

    const ironing = careInstructions.find(
      (item) => item.category?.toLowerCase() === "ironing"
    );

    return `Hi! I'm Fabric Expert 👋🏽 This garment uses ${fabricName}. ${
      washing?.instruction || "Follow the recommended washing instructions."
    } ${
      drying?.instruction || "Dry it according to the fabric requirements."
    } ${
      ironing?.instruction || "Use the recommended ironing method."
    } Ask me anything about caring for this garment.`;
  };

  const [messages, setMessages] = useState([
    {
      sender: "Fabric Expert",
      text: buildInitialResponse(),
    },
  ]);

  const chatBoxRef = useRef(null);
  const isNearBottomRef = useRef(true);

  const getResponse = (text) => {
    const lower = text.toLowerCase();

    if (lower.includes("machine")) {
      return fabricExpertResponses.machine;
    }

    if (lower.includes("bleach")) {
      return fabricExpertResponses.bleach;
    }

    if (lower.includes("dry") || lower.includes("sun")) {
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

  const handleScroll = () => {
    const chat = chatBoxRef.current;

    if (!chat) return;

    const distanceFromBottom =
      chat.scrollHeight -
      chat.scrollTop -
      chat.clientHeight;

    isNearBottomRef.current = distanceFromBottom < 80;
  };

  const scrollToBottom = (smooth = true) => {
    const chat = chatBoxRef.current;

    if (!chat) return;

    chat.scrollTo({
      top: chat.scrollHeight,
      behavior: smooth ? "smooth" : "auto",
    });
  };

  useEffect(() => {
    if (isNearBottomRef.current) {
      scrollToBottom(true);
    }
  }, [messages, thinking]);

  const handleQuestion = () => {
    if (!question.trim() || thinking) return;

    const userQuestion = question.trim();

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