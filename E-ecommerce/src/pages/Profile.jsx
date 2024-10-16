import authStore from '../store/user';
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";

import EditNav from '../components/Profile/EditNav';
import ProfileEditBlock from '../components/Profile/ProfileEditBlock'

export default function Profile() {
    const token = authStore(state => state.token);
    return (
        <>
            <div className=' md:flex sm:justify-center md:justify-start'>
                <EditNav />
                <div className=' '>
                    <ProfileEditBlock />
                </div>

            </div>
            {/* <p>{token}</p> */}
        </>
    )
}