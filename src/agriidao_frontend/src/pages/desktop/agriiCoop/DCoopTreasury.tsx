import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/Context";
import { Link, NavLink, useParams } from "react-router-dom";
import { Coop } from "../../../../../declarations/coop_manager/coop_manager.did";
import DCoopCardProps from "./components/DCoopCard";
import getCoopActor from "../../coops/components/CoopActor";

function DCoopTreasury() {
    const { projectsActor } = useAuth();
    const { id } = useParams();
    const [coop, setCoop] = useState<Coop | null>(null);

    useEffect(() => {
        if (id) {
          getCoopDetails();
        }
      }, [id]);
      
      const getCoopDetails = async () => {
        try {
          if (!id) {
            console.error("Coop ID is undefined");
            return;
          }
      
          const coopActor = await getCoopActor(id);
          const coopDetails = await coopActor.getDetails();
          if (!coopDetails) {
            console.error("No details found for this Co-op ID:", id);
            return;
          }
          setCoop(coopDetails);
        } catch (error) {
          console.error("Error fetching co-op details:", error);
        }
      };
      
  return (
    <div>DCoopTreasury</div>
  )
}

export default DCoopTreasury