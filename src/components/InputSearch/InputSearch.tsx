export interface IInputSearchProps {
  onChange: (value: string) => void;
  placeholder: string;
}

export const InputSearch = (props: IInputSearchProps) => {
  return (
    <input
      className="bg-lightGray text-white placeholder:text-white p-2 h-[2.5rem] rounded-xl m-2 "
      type="search"
      placeholder={props.placeholder}
      onChange={(e) => props.onChange(e.target.value)}
    />
  );
};
