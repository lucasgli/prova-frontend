import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

import "./styles.css";

export default function ArrowIcon({ isOpen, isAnimating }) {
  return (
    <FontAwesomeIcon
      style={{
        color: isOpen ? "blue" : "",
        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
      }}
      icon={faChevronDown}
      className={isAnimating ? (isOpen ? "rotate-up" : "rotate-down") : null}
    />
  );
}