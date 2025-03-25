import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import imagePath2 from "../../../../assets/images/projects-default.png";
import { useAuth } from "../../../../hooks/Context";
import { ckUSDCe6s } from "../../../../constants/canisters_config";
import { Principal } from "@dfinity/principal";

interface DCoopCardProps {
  coop: any;
}

const DCoopCardProps: React.FC<DCoopCardProps> = ({ coop }) => {
  const { coopIndexerActor } = useAuth();
  const { id } = useParams();
  const [allocatedUnits, setAllocatedUnits] = useState<number>(0);
  const [membersCount, setMembersCount] = useState<{ [key: string]: number }>(
    {}
  );

  useEffect(() => {
    if (!coop) return;
    const totalUnit = Number(coop.totalUnit) || 0;
    const availableUnit = Number(coop.availableUnit) || 0;
    setAllocatedUnits(totalUnit - availableUnit);
  }, [coop]);

  // const getCoopMembers = async () => {
  //   try {
  //     if (!id) {
  //       console.error("Coop ID is undefined");
  //       return;
  //     }
  //     const res = await coopIndexerActor?.getMembershipsByCoopId(
  //       Principal.fromText(id)
  //     );
  //     const count = res
  //       ? res.filter(
  //           (record) => record.coopId.toText() === coop?.id?.toString()
  //         ).length
  //       : 0;
  //     setMembersCount((prev) => ({ ...prev, [id]: count }));
  //   } catch (error) {
  //     console.error("Error fetching co-op members:", error);
  //   }
  // };

  useEffect(() => {
    if (!coop) return;
    getCoopMembers();
  }, [coop]);

  const getCoopMembers = async () => {
    let res = await coopIndexerActor?.getAllMemberships();
    if (res) {
      const membershipCounts: { [key: string]: number } = {};
      res.forEach((membership) => {
        const coopId = membership.coopId.toText();
        membershipCounts[coopId] = (membershipCounts[coopId] || 0) + 1;
      });

      setMembersCount(membershipCounts);
    }
  };

  return (
    <>
      <div className="col-xl-12 mt-4">
        <div className="card rounded shadow border-0 p-4">
          <div className="d-flex">
            <img
              src={imagePath2}
              width="35"
              className="avatar avatar-ex-small rounded"
              alt="Default Co-op Image"
              style={{ marginRight: "15px" }}
            />
            <h5 className="mb-0 mt-1">{coop?.name}</h5>
          </div>
          <div className="mt-4">
            <dl className="row">
              <dt className="col-sm-4">Code</dt>
              <dd className="col-sm-8 text-end">
                {coop?.ticker ? coop?.ticker : "-"}
              </dd>
              <dt className="col-sm-6">Total Contributions</dt>
              <dd className="col-sm-6 text-end">
                {(allocatedUnits * (Number(coop?.unitPrice) ?? 0)) / ckUSDCe6s}{" "}
                USDC
              </dd>
              <dt className="col-sm-6">Members</dt>
              <dd className="col-sm-6 text-end">
                {membersCount[id ?? ""] ?? 0}
              </dd>
              <dt className="col-sm-4">Canister ID</dt>
              <dd className="col-sm-8 text-end">
                {coop?.id ? coop?.id.toString() : "-"}
              </dd>
            </dl>
            <div
              className="mt-4"
              dangerouslySetInnerHTML={{ __html: coop?.summary || "" }}
            ></div>

            <div className="mt-4">
              <NavLink
                to={`/d/coop/overview/${id}`}
                className="btn btn-outline-dark col-sm-12"
              >
                Overview
              </NavLink>
            </div>
            <div className="mt-2">
              <NavLink
                to={`/d/coop/projects/${id}`}
                className="btn btn-outline-dark col-sm-12"
              >
                Projects
              </NavLink>
            </div>
            <div className="mt-2">
              <NavLink
                to={`/d/coop/treasury/${id}`}
                className="btn btn-outline-dark col-sm-12"
              >
                Treasury
              </NavLink>
            </div>
            <div className="mt-2">
              <NavLink
                to={`/d/coop/proposals/${id}`}
                className="btn btn-outline-dark col-sm-12"
              >
                Proposals
              </NavLink>
            </div>
            <div className="mt-2">
              <NavLink
                to={`/d/coop/members/${id}`}
                className="btn btn-outline-dark col-sm-12"
              >
                Members
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DCoopCardProps;
