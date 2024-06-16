import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/Context";
import { CampaignUser } from "../../../../../declarations/bounty/bounty.did";

type Props = {
    campaignAccepted: CampaignUser[]
}

const CountAccepted : FC<Props> = ({campaignAccepted}) => {
  
  
  return (
    <div>
      <span> {campaignAccepted.length}</span>
    </div>
  );
};

export default CountAccepted;
