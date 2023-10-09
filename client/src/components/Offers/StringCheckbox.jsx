/* eslint-disable react/prop-types */
const StringCheckbox = ({
  value,
  setValue,
  name,
  max,
  min,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <h3 className="font-semibold">{name ?? "Pass a text"}</h3>
      <div className="items-center">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          maxLength={max}
          minLength={min}
          required
          className="h-10 sm:w-96 w-full rounded placeholder-transparent px-2"
          placeholder="I am willing to pay"
        />
      </div>
    </div>
  );
};

export default StringCheckbox;
