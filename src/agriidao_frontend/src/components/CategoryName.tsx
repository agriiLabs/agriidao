import React, { useEffect, useState } from "react";

import { useAuth } from "../hooks/Context";
import { AcCategory } from "../../../declarations/settings/settings.did";

const CategoryName = ({ id }: { id: string }) => {
  const [acCategory, setAcCategory] = useState<AcCategory | null>(null); //the ac category object that

  const { settingsActor } = useAuth(); //get agriichainBackend from the global context

  // get latest category and commodities
  useEffect(() => {
    getAcCategoryLatest();
  }, [id]);
  const getAcCategoryLatest = async () => {
    const res = await settingsActor?.getAcCategoryLatest(id);

    if (res && "ok" in res) {
      setAcCategory(res.ok);
    } else {
      console.log(res);
    }
  };
  return <div>{acCategory && <span>{acCategory.name}</span>}</div>;
};

export default CategoryName;
