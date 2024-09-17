import Link from "next/link";

const SideBarUser = ({
  index,
  speaker,
}: {
  index: number;
  speaker: { username: string; tag: string };
}) => {
  return (
    <span key={index} className="user-container">
      <div className="user-data">
        <span className="user-name">@{speaker.username}</span>
        <span className="user-tag">
          Speaks about <span className="user-tag-detail">{speaker.tag}</span>
        </span>
      </div>
    </span>
  );
};

export default SideBarUser;
