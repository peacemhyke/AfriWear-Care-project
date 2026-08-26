import { useState } from "react";
import styles from "./FabricWisdom.module.css";

function FabricWisdom({ garment }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const garmentName =
    garment?.garment?.name || "this garment";

  const fabricName =
    garment?.fabric?.name || "African textile";

  const slides = [
    {
      title: "Did You Know?",
      content: (
        <>
          Your <strong>{garmentName}</strong> is made from{" "}
          <strong>{fabricName}</strong>. Washing it inside out
          with cold water helps preserve its colours and keeps the
          fabric looking vibrant for much longer.
        </>
      ),
    },

    {
      title: "Textile Story",
      content: (
        <>
          {fabricName} is part of Africa's rich textile culture,
          carrying stories of identity, creativity, celebration
          and everyday life.
        </>
      ),
    },

    {
      title: "Fabric Expert Tip",
      content: (
        <>
          Care for your {fabricName} garment gently. Avoid harsh
          treatment and follow the recommended care instructions
          to help preserve its appearance and lifespan.
        </>
      ),
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === slides.length - 1 ? 0 : prev + 1
    );
  };

  const previousSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  const slide = slides[currentSlide];

  return (
    <section className={styles.card}>

      <div className={styles.header}>
        <h2>🌿 Fabric Wisdom</h2>
      </div>

      <div className={styles.slide} key={currentSlide}>
        <span className={styles.slideNumber}>
          {String(currentSlide + 1).padStart(2, "0")}
        </span>

        <h3>{slide.title}</h3>

        <p>{slide.content}</p>
      </div>

      <div className={styles.controls}>

        <button
          onClick={previousSlide}
          aria-label="Previous slide"
          className={styles.arrow}
        >
          ←
        </button>

        <div className={styles.dots}>
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`${styles.dot} ${
                currentSlide === index
                  ? styles.activeDot
                  : ""
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className={styles.arrow}
        >
          →
        </button>

      </div>

    </section>
  );
}

export default FabricWisdom;