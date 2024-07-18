import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"

const SelectPullRequest = () => {
  return (
    <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a pull request" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Pull Requests</SelectLabel>
            <SelectItem value="apple">Fix bug in login #1</SelectItem>
            <SelectItem value="banana">Change Dashboard #2</SelectItem>
            <SelectItem value="blueberry">Cahnge styles in landing #3</SelectItem>
            <SelectItem value="grapes">Create conection with DB #4</SelectItem>
            <SelectItem value="pineapple">Fix errors in porduction #5</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
)
}

export default SelectPullRequest