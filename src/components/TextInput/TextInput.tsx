import "./TextInput.scss";

interface TextInputProps {
  name: string;
  value: string;
  placeholder: string;
  onValueChange: (value: string) => void;
}

const TextInput = ({ name, value, placeholder, onValueChange }: TextInputProps): JSX.Element => {
  return (
    <div className="input-container">
      <input
        name={name}
        className="text-input"
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(event) => {
          onValueChange(event.target.value);
        }}
      ></input>
    </div>
  );
};

export default TextInput;
