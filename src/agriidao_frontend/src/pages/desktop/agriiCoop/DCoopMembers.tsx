import { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/Context";
import { Coop, CoopMember } from "../../../../../declarations/coop_manager/coop_manager.did";
import DCoopCardProps from "./components/DCoopCard";
import getCoopActor from "../../coops/components/CoopActor";
import { formatDate } from "../../../utils/Utils";

function DCoopMembers() {
    const { id } = useParams();
  const [coop, setCoop] = useState<Coop | null>(null);
  const [members, setMembers] = useState<CoopMember[] | null>(null);

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
        const coopMembers = await coopActor?.getAllMembers();
        if (!coopDetails) {
            console.error("No details found for this Co-op ID:", id);
            return;
        }
        setCoop(coopDetails);
        setMembers(coopMembers);
        } catch (error) {
        console.error("Error fetching co-op details:", error);
        }
    };

    console.log("coop", coop);
    console.log("members", members);
  return (
    <>
    <div className="d-flex align-items-center justify-content-between">
      <div>
        <h5 className="mb-0">Co-op Members</h5>
      </div>
      <div className="mb-0 position-relative">
      <NavLink
            to={`/d/coop-units/${id}`}
            className="btn btn-outline-dark col-sm-12"
          >
            Fund
          </NavLink>
      </div>
    </div>

    <div className="row">
      <div className="col-xl-4">
        <DCoopCardProps coop={coop} />
      </div>

      <div className="col-xl-8">
        <div className="col-xl-12 mt-4">
          <div className="card rounded shadow border-0 p-4">
            <div className="d-flex justify-content-between mb-4">
              <h5 className="mb-0">Members</h5>
            </div>
            <table className="table table-center bg-white mb-0">
              <thead>
                <tr>
                  <th className="border-bottom p-3">Member</th>
                  <th className="border-bottom p-3">Amount</th>
                  <th className="border-bottom p-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {members && members.length > 0 ? (
                  members.map((member, index) => (
                    <tr key={index}>
                      <td className="p-3">
                        <Link
                          to={`/d/coop/member/${member.id}`}
                          className="d-flex align-items-center"
                        >
                          {member.id}
                        </Link>
                      </td>
                      <td className="p-3">{Number(member?.balance)}</td>
                      <td className="p-3">{member?.balance ? formatDate(Number(member?.balance)) : ""}</td>
                    </tr>
                  ))
                ) : (
                  <td colSpan={3}>No data available</td>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default DCoopMembers