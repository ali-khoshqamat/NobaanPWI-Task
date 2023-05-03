import { FixedSizeList, ListChildComponentProps } from "react-window";

const List = () => {
  const data = Array.from({ length: 1000000 }, (_, index) => `Item ${index}`);
  const Row = ({ index, style }: ListChildComponentProps) => (
    <div
      style={style}
      className="bg-stone-100 p-1 w-full border border-green-600 rounded-md"
    >
      {data[index]}
    </div>
  );

  return (
    <>
      <FixedSizeList
        height={500}
        width={500}
        itemCount={1000000}
        itemSize={35}
        className="!w-11/12 bg-red-100 border border-solid border-gray-300 rounded-md"
      >
        {Row}
      </FixedSizeList>
    </>
  );
};

export default List;
