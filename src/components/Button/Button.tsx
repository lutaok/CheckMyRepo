import { ReactNode } from "react";
import { classNames } from "@utils/classNames";
import "./Button.scss";

interface ButtonProps {
  children: string;
  className?: string;
  disabled?: boolean;
  icon?: ReactNode;
  onClick: () => void;
}

const Button = ({ children, className, disabled, icon, onClick }: ButtonProps): JSX.Element => {
  const buttonClasses = {
    button: true,
    disabled: !!disabled,
    [`${className}`]: !!className,
  };

  return (
    <button className={classNames(buttonClasses)} disabled={!!disabled} onClick={onClick}>
      {children}
      {icon && icon}
    </button>
  );
};

export default Button;
