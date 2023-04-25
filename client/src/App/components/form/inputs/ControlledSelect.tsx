import React from 'react';

import styles from './ControlledSelect.module.scss';
type TProps = {
  label: string;
  name: string;
  defaultOption: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (target: { name: string; value: string }) => void;
  disabledOption: boolean;
};

function ControlledSelect({ label, name, value, onChange, defaultOption, options, disabledOption }: TProps) {
  const handleChange = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ name: target.name, value: target.value });
  };

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <div className={styles.my_select}>
        {
          <>
            <select className={styles.select} id={name} name={name} value={value} onChange={handleChange}>
              <option disabled={disabledOption} value="DEFAULT" key="DEFAULT">
                {defaultOption}
              </option>
              {options &&
                options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
            </select>
            <span className={styles.arrow} />
          </>
        }
      </div>
    </div>
  );
}
export default ControlledSelect;
