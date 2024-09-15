"use client";

import { useState } from "react";

const ToggleExpandSwitch = (initialState = true) => {
  const [isExpanded, setIsExpanded] = useState(initialState);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return { isExpanded, toggleExpand };
};

export default ToggleExpandSwitch;
