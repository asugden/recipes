import { Select } from "@chakra-ui/react";
import _ from "lodash";
import { useQuery } from "react-query";
import IItem from "../db/interfaces/IItem";

interface Props {
  group: string;
  queryFn: () => Promise<IItem[]>;
  selectDefault?: string;
  onChange?: any;
}

// const computeAuthorWidth = (name: string): number => {};

const Selector = ({
  group,
  queryFn,
  selectDefault,
  onChange,
}: Props): JSX.Element => {
  const { data, status } = useQuery(["ingredients", group], () => queryFn(), {
    staleTime: 1000 * 60 * 15,
  });

  return status === "success" && data ? (
    <Select
      placeholder={selectDefault ? selectDefault : undefined}
      onChange={onChange}
    >
      {data.map((item: IItem, idx: number) => (
        <option value={item.name} key={idx}>
          {_.startCase(_.toLower(item.name))}
        </option>
      ))}
    </Select>
  ) : (
    <></>
  );
};

export default Selector;
