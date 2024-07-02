import React, { useRef, useEffect } from "react";

export default function Checkbox({ checked, id, updateItem, ...rest }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.checked = checked;
      
      if (checked === null) {
        inputRef.current.indeterminate = true;
      } else {
        inputRef.current.indeterminate = false;
      }
    }
  }, [checked]);

  return (
    <input
      {...rest}
      ref={inputRef}
      type="checkbox"
    />
  );
}
