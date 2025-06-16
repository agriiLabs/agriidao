import { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/Context";
import { Commodity } from "../../../../../declarations/agriidao_backend/agriidao_backend.did";
import CategoryName from "../../../components/CategoryName";

const Commodities = () => {
  const { agriidaoActor } = useAuth(); 
  const { id } = useParams(); 
  const [commodities, setCommodities] = useState<Commodity[]>([]); 

  useEffect(() => {
    getAllLatestCommodities();
  }, [id]);
  
  const getAllLatestCommodities = async () => {
    let res = await agriidaoActor?.getAllLatestCommodities(); 
    setCommodities(res || []);
  };

  return (
    <>
      {/* {openForm && (
        <AddCommodity {...{ setOpenForm, setCommoditySaved }} />
      )} */}
      
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <h5 className="mb-0">Commodities</h5>
        </div>

        <div className="mb-0 position-relative">
          <NavLink
            to={`/d/start-coop/`}
            className="btn btn-outline-dark col-sm-12"
          >
            Add Commodity
          </NavLink>
        </div>
      </div>

      <div className="col-xl-12 mt-4">
        <div className="card border-0">
          <div
            className="table-responsive shadow rounded-bottom"
            data-simplebar
            style={{ height: "545px" }}
          >
            <table className="table table-center bg-white mb-0">
              <thead>
                <tr>
                  <th className="border-bottom p-3" style={{ width: "150px" }}>
                    Name
                  </th>
                  <th className="border-bottom p-3" style={{ width: "150px" }}>
                    Ticker
                  </th>
                  <th className="border-bottom p-3" style={{ width: "150px" }}>
                    Commodity Type
                  </th>
                  <th className="border-bottom p-3" style={{ width: "150px" }}>
                    Image
                  </th>
                  <th className="border-bottom p-3" style={{ width: "150px" }}>
                    View
                  </th>
                </tr>
              </thead>

              <tbody>
                {commodities && commodities.length > 0 ? (
                  commodities.map((commodity, index) => (
                    <tr className="even" key={index}>
                      <td className="p-3">
                      <span className="ms-2">{commodity.name}</span></td>
                      <td className="p-3">{commodity.ticker}</td>
                      <td className="p-3"><CategoryName id={commodity.acCategoryId}/></td>
                      <td className="p-3">
                        {commodities && (
                          <img // TODO: dislay commodity image 
                            src={
                              commodity.commodityPic === ""
                              ? "/default-image.png"
                              : commodity.commodityPic
                            }
                            alt="commodity pic"
                            width="80"
                            className="img-fluid avatar-xl rounded"
                            />
                        )}

                      </td>

                      <td className="p-3">
                        <Link to={`/commodity-summary/${commodity.id}`}>View</Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5}  className="text-center">No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Commodities; //whatever the name of the functional component declared above should be used here

