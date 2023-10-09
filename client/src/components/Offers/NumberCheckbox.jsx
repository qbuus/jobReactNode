/* eslint-disable react/prop-types */
const NumberCheckbox = ({
  setValue,
  value,
  name,
  max,
  min,
  step,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <h3 className="font-semibold">
        {name ?? "Pass a number"}
      </h3>
      <div className="relative flex gap-1 items-center flex-row">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="number"
          min={min}
          max={max}
          step={step}
          required
          className="h-10 w-72 rounded placeholder-transparent px-2"
          placeholder="I am willing to pay"
        />
        <span className="font-semibold text-sm">PLN</span>
      </div>
    </div>
  );
};

export default NumberCheckbox;
