import React from "react";
import { AiOutlineUser, AiOutlineEdit } from "react-icons/ai";

const ProfileEditBlock = () => {

    return (
        <>
            <div className="border-t-[2px] border-gray md:hidden"></div>
            <div className=' lg:flex justify-center'>
                <div>
                    <div className="flex justify-center">
                        <div className="px-4 py-8 ">
                            <h2 className="text-3xl text-center text-black-800 font-Impact">MON PROFIL</h2>
                            <div>
                                <div className='flex mt-7'>
                                    <AiOutlineUser className="justify-items-center hidden" />
                                    <p className="font-semibold">Nom</p>
                                </div>
                                <p className="text-black-600 font-['Roboto'] lg:mb-5">Juju</p>
                                <p className="font-semibold">Préférence mode</p>
                                <p className="text-black-600 font-['Roboto'] ">Mode femme</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mr-3 lg:ml-20 lg:mt-[91px]">
                    <div className="px-4 py-1">
                        <p className="font-semibold">Téléphone mobile</p>
                        <p className="lg:mb-5">06 30 30 30 30</p>
                        <p className="font-semibold">Date de naissance</p>
                        <p>01/01/1312</p>
                    </div>
                </div>
                <div className="pt-6  lg:ml-28 lg:mt-6">
                    <div className="border-solid border-2 border-black flex justify-center lg:pl-24 lg:pr-24 lg:pt-2 lg:pb-2 lg:mt-20 ml-10 mr-10">
                        <AiOutlineEdit className="justify-items-center" />
                        <p className="font-semibold ml-2">Modifier</p>
                    </div>
                </div>

            </div>


            <div className="lg:flex justify-between items-baseline border-solid lg:border-t border-black flow-root">
                <div className="flex justify-center">
                    <div className="px-4 py-8">
                        <p className="font-semibold">Votre adresse e-mail</p>
                        <p>jujuuj@live.fr</p>
                    </div>
                </div>
                    <div className=" border-solid border-2 border-black flex justify-center lg:pl-24 lg:pr-24 lg:pt-2 lg:pb-2 lg:mt-20 ml-10 mr-10 ">
                            <AiOutlineEdit className="justify-items-center" />
                            <p className="font-semibold ml-2">Modifier</p>
                    </div>
            </div>

            <div className="lg:flex justify-between items-baseline mt-5 border-solid lg:border-t lg:border-black border-b pb-10 flow-root">
                <div className="flex justify-center">
                    <div className="px-4 py-8">
                        <p className="font-semibold">Votre mot de passe</p>
                        <p>********</p>
                    </div>
                </div>
                        <div className=" border-solid border-2 border-black flex justify-center lg:pl-24 lg:pr-24 lg:pt-2 lg:pb-2 lg:mt-20 ml-10 mr-10">
                                <AiOutlineEdit className="justify-items-center" />
                                <p className="font-semibold ml-2">Modifier</p>
                        </div>
            </div>
        </>
    );
};

export default ProfileEditBlock;

