/* eslint-disable react/prop-types */
import { useNewOfferMutation } from "../../Redux/Listing/offerApiSlice";

export default function CustomCheckbox({
  selected,
  onChange,
  itemsNames,
  name,
}) {
  const [{ isLoading }] = useNewOfferMutation();

  function handleCheckBoxChange(e) {
    const { checked, name } = e.target;

    if (checked) {
      onChange([...selected, name]);
    } else {
      onChange([
        ...selected.filter(
          (selectedItem) => selectedItem !== name
        ),
      ]);
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <h3 className="font-semibold">{name ?? "Select"}</h3>
      <ul className="items-center w-full text-sm border rounded-lg sm:flex overflow-auto max-h-40 bg-base-100">
        {itemsNames.length > 0 &&
          itemsNames.map((item, index) => (
            <li
              key={index}
              className="w-full border-b sm:border-b-0 sm:border-r"
            >
              <div className="flex items-center pl-3">
                <input
                  id={`${index} - ${name} - list - item`}
                  type="checkbox"
                  checked={selected.includes(`${item}`)}
                  name={`${item}`}
                  onChange={handleCheckBoxChange}
                  className="w-4 h-4 sm:w-6 sm:h-6 rounded focus:ring-primary-focus"
                  disabled={isLoading}
                />
                <label
                  htmlFor={`${index} - ${name} - list - item`}
                  className="w-full py-3 ml-2 text-sm font-medium"
                >
                  <span>{item}</span>
                </label>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
