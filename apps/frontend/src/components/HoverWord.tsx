type HoverWordProps = {
  value: string;
};

export const HoverWord = ({ value }: HoverWordProps) => {
  const isWord = /\p{L}|\p{N}/u.test(value);

  if (!isWord) {
    return <span>{value}</span>;
  }
  return (
    <span
      className="cursor-pointer hover:bg-yellow-200 transition rounded px-0.5"
      onMouseEnter={() => {
        console.log("hover:", value);
      }}
    >
      {value}
    </span>
  );
};
