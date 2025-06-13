import {FC, useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../../hooks/Context';
import { MarketLocationAgent } from '../../../../../declarations/agriidao_backend/agriidao_backend.did';
import { User } from '../../../../../declarations/user/user.did';
import { Principal } from '@dfinity/principal';

type Props = {
    userSub: MarketLocationAgent;
};

const UserSubs: FC<Props> = ({ userSub }) => {
    const { userActor } = useAuth();
    const { id } = useParams();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if(userSub){
            getUser()
        }
    }, [userSub]);

    const getUser = async () => {
        if(!userSub || !userActor){
            console.error("user request not found")
            return;
        }
        try {
            const res = await userActor.getUserLatestByPrincipal(Principal.fromText(userSub.userId));
            if("ok" in res){
                setUser(res.ok)
            } else {
                console.error(res.err)
            }
        } catch (error) {
            console.error("Error fetching user: ", error)
        }
    };

    return (
        <tr className='even'>
            <td><h5>{user?.username}</h5></td>
            <td>
            <Link to={`/campaign-participant-detail/${userSub?.id}`}>View</Link>
        </td>
        </tr>
    );
};

export default UserSubs;