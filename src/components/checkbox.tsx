import React from "react";
import { motion } from "framer-motion";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  indeterminate?: boolean;
}

export const Checkbox = React.forwardRef(
  ({ indeterminate, ...rest }: CheckboxProps, ref: any) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input
          onClick={(e) => e.stopPropagation()}
          type="checkbox"
          className={`scale-150 transition-all ease-in duration-150 accent-green-600`}
          ref={resolvedRef}
          {...rest}
        />
      </>
    );
  }
);
