const ClipboardHistory = ({
  items,
  onCopy,
}: {
  items: string[];
  onCopy: (text: string) => void;
}) => (
  <ul className="mt-4 space-y-2">
    {items.map((item, index) => (
      <li
        key={index}
        className="p-2 bg-gray-100 rounded shadow cursor-pointer hover:bg-gray-200"
        onClick={() => onCopy(item)}
      >
        {item}
      </li>
    ))}
  </ul>
);
export default ClipboardHistory;
