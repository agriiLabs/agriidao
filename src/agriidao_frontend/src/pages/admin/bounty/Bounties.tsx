import React, { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/Context";
import { Link, useParams } from "react-router-dom";
import { Bounty } from "../../../../../declarations/bounty/bounty.did";
import AddBounty from "./components/AddBounty";
import CategoryName from "../../../components/CategoryName";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const Bounties = () => {
  const { bountyActor } = useAuth(); //get agriichainBackend from the global context
  const { id } = useParams(); //how to access the url parameter i.e id
  const [bounties, setBounties] = useState<Bounty[]>([]); // sets the initial state of bounties to an empty array
  const [openForm, setOpenForm] = useState(false);
  const [bountySaved, setBountySaved] = useState(false);
  const {accessLevel} = useSelector((state : RootState) => state.app);

  useEffect(() => {
    getAllLatestBounties();
  }, [id]);

  useEffect(() => {
    if (bountySaved) {
      getAllLatestBounties();
    }
  }, [bountySaved]);

  const getAllLatestBounties = async () => {
    let res = await bountyActor.getAllLatestBounties(); // calls the backend and fetches the bounties
    setBounties(res); // set the bounties to the bounties array
  };

  return (
    <>
      {openForm && <AddBounty {...{ setOpenForm, setBountySaved }} />}
      <div className="row">
        <div className="col-12">
          <div className="page-title-box">
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <a href="javascript: void(0);">InventoryClub</a>
                </li>
                <li className="breadcrumb-item active">
                  <a href="#">Bounties</a>
                </li>
              </ol>
            </div>
            <h4 className="page-title">Bounties</h4>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="row mb-2">
                <div className="col-lg-8">
                  <form className="form-inline">
                    <div className="form-group mb-2">
                      <label htmlFor="inputPassword2" className="sr-only">
                        Search
                      </label>
                      <input
                        type="search"
                        name="search"
                        className="form-control"
                        id="inputPassword2"
                        placeholder="Search..."
                      />
                    </div>
                    <div className="form-group mx-sm-3 mb-2">
                      <label htmlFor="status-select" className="mr-2">
                        Purpose
                      </label>
                      <select
                        className="custom-select"
                        name="purpose"
                        id="status-select"
                      >
                        <option selected>Choose...</option>
                        <option value="1">All</option>
                        <option value="2">Seed Finance</option>
                        <option value="3">Fertliser Finance</option>
                        <option value="4">Machine Finance</option>
                        <option value="5">Offtaker Finance</option>
                      </select>
                    </div>
                    <div className="form-group mx-sm-3 mb-2">
                      <label htmlFor="status-select" className="mr-2">
                        Value
                      </label>
                      <select
                        className="custom-select"
                        name="fund_value"
                        id="status-select"
                      >
                        <option selected>Choose...</option>
                        <option value="1">1,000,000</option>
                        <option value="2">2,000,000</option>
                        <option value="3">3,000,000</option>
                        <option value="4">4,000,000</option>
                        <option value="5">5,000,000</option>
                        <option value="6">6,000,000</option>
                      </select>
                    </div>
                    <input
                      type="submit"
                      name=""
                      className="btn btn-info waves-effect waves-light mb-2 mr-2"
                      value="Filter"
                    />
                    <a
                      href="{% url 'bounty:bounty_list' %}"
                      className="btn btn-info waves-effect waves-light mb-2 mr-2"
                    >
                      Reset
                    </a>
                  </form>
                </div>
                <div className="col-lg-4">
                  <div className="text-lg-right">
                    {accessLevel && "admin" in accessLevel && <button
                      onClick={() => setOpenForm(true)}
                      className="btn btn-info waves-effect waves-light mb-2 mr-2"
                    >
                      Add Bounty
                    </button>}
                    
                  </div>
                </div>
              </div>

              <div className="table-container table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col" className="orderable">
                        Name
                      </th>
                      <th scope="col" className="orderable">
                        Type
                      </th>
                      <th scope="col" className="orderable">
                        Bounty Pool
                      </th>
                      <th scope="col">View</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bounties.map((bounty, index) => (
                      <tr className="even" key={index}>
                        <td>{bounty.name}</td>
                        <td>
                          <CategoryName id={bounty.acCategoryId} />
                        </td>
                        <td>{Number(bounty.bountyPool)}</td>
                        <td>
                          <Link to={`/rewards/bounty/${bounty.id}`}>View</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bounties;
