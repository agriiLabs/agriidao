import { FC, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/Context";
import {
  Commodity,
  MarketLocationCommodity,
} from "../../../../../declarations/commodity/commodity.did";

type Props = {
  commoditySub: MarketLocationCommodity;
};

const CommoditySubs: FC<Props> = ({ commoditySub }) => {
  const { commodityActor } = useAuth();
  const { id } = useParams();
  const [commodity, setCommodity] = useState<Commodity | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);


  useEffect(() => {
    if (commoditySub) {
      getCommodity();
    }
  }, [commoditySub]);

  const getCommodity = async () => {
    console.log("commoditySub: ", commoditySub);
    if (!commoditySub || !commodityActor) {
      console.error("commodity request not found");
      return;
    }
    try {
      const res = await commodityActor.getCommodityLatest(
        commoditySub.commodityId
      );
      console.log("commodity res: ", res);
      if ("ok" in res) {
        setCommodity(res.ok);
      } else {
        console.error(res.err);
      }
    } catch (error) {
      console.error("Error fetching commodity: ", error);
    }
  };

  useEffect(() => {
    // Check if the user has submitted for this marketLocationId today
    const lastSubmission = localStorage.getItem(`lastSubmission-${commoditySub?.id}`);
    const today = new Date().toISOString().split("T")[0];

    if (lastSubmission === today) {
      setHasSubmitted(true);
    } else {
      setHasSubmitted(false);
    }
  }, [commoditySub?.id]);

  interface CommoditySubsProps {
    commoditySub: MarketLocationCommodity;
  }

  interface Commodity {
    name: string;
    // Add other properties as needed
  }

  interface MarketLocationCommodity {
    id: string;
    commodityId: string;
    // Add other properties as needed
  }

  return (
    <>
      {hasSubmitted ? (
        // Render check icon and disable the link
        <div className="d-flex mb-3">
          <div className="align-self-center ">
          <p className="font-16">{commodity?.name}</p>
        </div>
        <i className="fa fa-check-circle ms-auto text-success text-end mt-2" />
        </div>
        // <i className="fa fa-check ms-auto text-end text-dark mt-2" />
      ) : (
        // Render angle-right icon with link
        <Link 
        to={`/add-commodity-price/${commoditySub?.id}`}
        className="d-flex mb-3"
      >
        <div className="align-self-center ">
          <p className="font-16">{commodity?.name}</p>
        </div>
        <i className="fa fa-angle-right ms-auto text-end text-dark mt-2" />
      </Link>
      )}
      
    </>
  );
//             <div className="align-self-center ">
//             <p className="font-16">{commodity?.name}</p>
//             </div>
          
//           <i className="fa fa-angle-right ms-auto text-end text-dark mt-2" />
//         </Link>
     
//   );
};

export default CommoditySubs;
