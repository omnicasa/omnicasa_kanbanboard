import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import SelectSite from "./SelectSite";
import SelectPerson from "./SelectPerson";

const SelectGroups: React.FC = () => {
  return (
    <div className="flex items-center space-x-2">
      <SelectSite />
      <SelectPerson />
      <Select>
        <SelectTrigger className="max-w-[200px] px-4 text-primary font-medium text-sm">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="most_updated">Most recently updated</SelectItem>
          <SelectItem value="least_updated">Least recently updated</SelectItem>
          <SelectItem value="most_added">Most recently added</SelectItem>
          <SelectItem value="least_added">Least recently added</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectGroups;
