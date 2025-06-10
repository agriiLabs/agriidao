import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/Context";
import { Response } from "../../../utils/Types";

// import AddType from "./AddAcType";
// import Count from "./Count";

const AcTypeSettings = () => {
  const { settingsActor } = useAuth(); 
  const { id } = useParams(); 
  const [types, setTypes] = useState([]); 
  useEffect(() => {
    getAcTypes();
  }, []);

  const getAcTypes = async () => {
    let res = await settingsActor?.getAllLatestAcTypes();
    setTypes(res);
  };



  const [acType, setAcType] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [acTypeSaved, setTypeSaved] = useState(false);