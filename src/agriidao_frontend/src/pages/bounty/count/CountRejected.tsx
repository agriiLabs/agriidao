import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/Context";
import { CampaignUser } from "../../../../../declarations/bounty/bounty.did";

type Props = {
    campaignRejected: CampaignUser[]
}

const CountRejected : FC<Props> = ({campaignRejected}) => {
  
  
  return (
    <div>
      <span> {campaignRejected.length}</span>
    </div>
  );
};

export default CountRejected;
