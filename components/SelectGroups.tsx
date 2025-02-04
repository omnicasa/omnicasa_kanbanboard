import SelectSite from "./SelectSite";
import SelectPerson from "./SelectPerson";
import SelectFilter from "./SelectFilter";
import SelectSort from "./SelectSort";

const SelectGroups: React.FC = () => {
  return (
    <div className="flex items-center space-x-2">
      <SelectSite />
      <SelectPerson />
      <SelectFilter />
      <SelectSort />
    </div>
  );
};

export default SelectGroups;
