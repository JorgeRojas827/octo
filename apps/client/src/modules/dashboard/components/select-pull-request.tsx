import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@radix-ui/react-select";

const SelectPullRequest = () => {
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a pull request" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Pull Requests</SelectLabel>
          <SelectItem value="apple">
            Fix bug in login{" "}
            <span className="opacity-50 text-primary">/ #1</span>
          </SelectItem>
          <SelectItem value="banana">
            Change Dashboard{" "}
            <span className="opacity-50 text-primary">/ #2</span>
          </SelectItem>
          <SelectItem value="blueberry">
            Cahnge styles in landing{" "}
            <span className="opacity-50 text-primary">/ #3</span>
          </SelectItem>
          <SelectItem value="grapes">
            Create conection with DB{" "}
            <span className="opacity-50 text-primary">/ #4</span>
          </SelectItem>
          <SelectItem value="pineapple">
            Fix errors in porduction{" "}
            <span className="opacity-50 text-primary">/ #5</span>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectPullRequest;
