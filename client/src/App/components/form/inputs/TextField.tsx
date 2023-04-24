import { FieldErrors, FieldValues, Path, UseFormRegister } from 'react-hook-form';
import Regexp from './patterns';
import { useState } from 'react';

type TProps<TFormValues extends FieldValues> = {
  label: string;
  field: Path<TFormValues>;
  type?: string;
  error: FieldErrors<TFormValues>;
  register: UseFormRegister<TFormValues>;
  formType?: 'login' | 'reg';
  value?: string;
};

function TextField<TFormValues extends Record<string, unknown>>({
  label,
  error,
  register,
  type,
  field,
  formType,
  value,
}: TProps<TFormValues>): JSX.Element {
  const [showPassword, setShowPassword] = useState(false);
  const today = new Date().toISOString().split('T')[0];

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  return (
    <div>
      <label htmlFor={field}>{label}</label>
      <div>
        <input
          defaultValue={value}
          type={showPassword ? 'text' : type}
          id={field}
          min={today}
          {...(formType !== 'login'
            ? {
                ...register(field, {
                  required: 'This field is required',
                  pattern: {
                    value: Regexp[field].pattern,
                    message: Regexp[field].message,
                  },
                }),
              }
            : { ...register(field, { required: 'This field is required' }) })}
        />
        {<div className="error">{error[field]?.message?.toString()}</div>}
        {type === 'password' && (
          <label htmlFor="chk" className={'styles.pass_label'}>
            <input type="checkbox" id="chk" onChange={toggleShowPassword} checked={showPassword} />
            {'showPassword'}
          </label>
        )}
      </div>
    </div>
  );
}
TextField.defaultProps = {
  type: 'text',
};

export default TextField;
