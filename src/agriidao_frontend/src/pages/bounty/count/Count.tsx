import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/Context";
import { CampaignUser } from "../../../../../declarations/bounty/bounty.did";

type Props = {
  campaignSubs: CampaignUser[]
}

const Count : FC<Props> = ({campaignSubs}) => {
  
  
  return (
    <div>
      <span> {campaignSubs.length}</span>
    </div>
  );
};

export default Count;
