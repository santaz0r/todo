import { FieldErrors, FieldValues, UseFormRegister, Path } from 'react-hook-form';

type TProps<TFormValues extends FieldValues> = {
  label: string;
  defaultOption: string;
  options: string[];
  field: Path<TFormValues>;
  error: FieldErrors<TFormValues>;
  register: UseFormRegister<TFormValues>;
  disabledOption: boolean;
  defOpt?: string;
};

function SelectField<TFormValues extends Record<string, unknown>>({
  label,
  defaultOption,
  options,
  field,
  error,
  register,
  disabledOption,
  defOpt,
}: TProps<TFormValues>) {
  return (
    <div>
      <label htmlFor={field}>{label}</label>
      <div>
        {
          <>
            <select
              id={field}
              {...register(field, {
                required: 'Your need to choose a priority',
              })}
              defaultValue={defOpt}
            >
              <option disabled={disabledOption} value="" key="DEFAULT">
                {defaultOption}
              </option>
              {options &&
                options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
            </select>
            <span />
          </>
        }
      </div>
      {<div className="error">{error[field]?.message?.toString()}</div>}
    </div>
  );
}
export default SelectField;
