import React from "react";
import Select from "react-select";
import { Label } from "@/components/ui/label";

function SelectwithSearch({
  matcher,
  register,
  label,
  values = [],
  setValue,
  id,
}) {
  const options = values.map((item) => ({
    value: item.$id,
    label: item[matcher],
  }));

  const selectedOption = options.find((option) => option.value === id);

  const handleChange = (selected) => {
    setValue(register, selected?.value, { shouldValidate: true });
  };

  return (
    <div>
      <Label htmlFor={register}>{label}</Label>
      <Select
        options={options}
        value={selectedOption}
        onChange={handleChange}
        placeholder={label}
        className="w-full"
        classNamePrefix="custom-select"
        styles={{
          placeholder: (base) => ({
            ...base,
            color: id ? "black" : "gray",
          }),
        }}
      />
    </div>
  );
}

export default SelectwithSearch;
