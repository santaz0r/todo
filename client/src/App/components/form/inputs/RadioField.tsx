type TProps = {
  name: string;
  value: string;
  id: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  state: string;
  label: string;
};

function RadioField({ label, name, value, id, onChange, state }: TProps) {
  return (
    <label>
      {label}
      <input name={name} type="radio" value={value} id={id} checked={state === value} onChange={onChange} />
    </label>
  );
}

export default RadioField;
