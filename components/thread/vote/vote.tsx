import DownVote from "../../../assets/icons/common/down-arrow";
import UpVote from "../../../assets/icons/common/up-arrow";

import { Colors } from "@/constants/Colors";

import { VoteWrapper } from "./vote.style";

const Vote = ({
  vote,
  voteValue,
}: {
  vote: number;
  voteValue: string | undefined;
}) => {
  return (
    <VoteWrapper isPositive={vote > 0}>
      <UpVote
        color={voteValue === "UP" ? Colors.blue : Colors.lightBlack}
        className="vote"
      />
      <span>{vote}</span>
      <DownVote
        color={voteValue === "DOWN" ? Colors.blue : Colors.lightBlack}
        className="vote"
      />
    </VoteWrapper>
  );
};

export default Vote;
