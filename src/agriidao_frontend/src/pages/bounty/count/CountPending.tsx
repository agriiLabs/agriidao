import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/Context";
import { CampaignUser } from "../../../../../declarations/bounty/bounty.did";

type Props = {
    campaignPending: CampaignUser[]
}

const CountPending : FC<Props> = ({campaignPending}) => {
  
  
  return (
    <div>
      <span> {campaignPending.length}</span>
    </div>
  );
};

export default CountPending;
