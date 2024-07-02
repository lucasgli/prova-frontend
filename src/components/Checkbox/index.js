import React, { useRef, useEffect } from "react";

export default function Checkbox({ checked, id, updateItem, ...rest }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      if (checked === null) {
        inputRef.current.indeterminate = true;
        inputRef.current.checked = false;
      } else {
        inputRef.current.checked = checked;
      }
    }
  }, [checked]);

  const handleChangeValue = (newStatus) => {
    updateItem(newStatus, id);
  };

  return (
    <input
      {...rest}
      ref={inputRef}
      type="checkbox"
      onChange={() => {
        handleChangeValue(inputRef.current.checked);
      }}
    />
  );
}
