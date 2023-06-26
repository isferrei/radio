import classNames from "classnames";

type ButtonTheme = "primary" | "secondary" | "default";

export interface IButtonProps {
  variation?: ButtonTheme;
  children?: React.ReactNode;
  icon?: string;
  iconWidth?: number;
  iconHeight?: number;
  onClick?: () => void;
}

export const Button = (props: IButtonProps) => {
  const handleThemes = (buttonTheme: ButtonTheme) => {
    switch (buttonTheme) {
      case "primary":
        return "bg-gray rounded-full";
      case "secondary":
        return "";
      default:
        return "bg-gray text-white p-2 rounded-xl flex gap-1 w-full";
    }
  };

  return (
    <button
      onClick={props.onClick}
      className={classNames(handleThemes(props.variation ?? "default"))}
    >
      {props.icon && (
        <img
          src={`/assets/${props.icon}.svg`}
          alt={`${props.icon} icon button`}
          height={`${props.iconHeight}px`}
          width={`${props.iconWidth}px`}
        />
      )}
      {props.children}
    </button>
  );
};
