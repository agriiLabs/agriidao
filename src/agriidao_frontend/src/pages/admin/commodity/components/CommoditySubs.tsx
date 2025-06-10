import {FC, useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../../hooks/Context';
import { Commodity, MarketLocationCommodity } from '../../../../../declarations/commodity/commodity.did';

type Props = {
    commoditySub: MarketLocationCommodity;
};

const CommoditySubs: FC<Props> = ({ commoditySub }) => {
    const { commodityActor } = useAuth();
    const { id } = useParams();
    const [commodity, setCommodity] = useState<Commodity | null>(null);

    useEffect(() => {
        if(commoditySub){
            getCommodity()
        }
    }, [commoditySub]);

    const getCommodity = async () => {
        console.log("commoditySub: ", commoditySub)
        if(!commoditySub || !commodityActor){
            console.error("commodity request not found")
            return;
        }
        try {
            const res = await commodityActor.getCommodityLatest(commoditySub.commodityId);
            console.log("commodity res: ", res)
            if("ok" in res){
                setCommodity(res.ok)
            } else {
                console.error(res.err)
            }
        } catch (error) {
            console.error("Error fetching commodity: ", error)
        }
    };

    return (
        <tr className='even'>
            <td><h5>{commodity?.name}</h5></td>
            <td>
            <Link to={`/commodity-prices/${commoditySub?.id}`}>View</Link>
        </td>
        </tr>
    );
};

export default CommoditySubs;