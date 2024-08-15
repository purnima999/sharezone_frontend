import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ProfileImageUpload = () => {
    
    const { uploadedProfileImage } = useSelector((state) => state?.profileSlice);
    const { profilePicture } = useSelector((state) => state?.utilityCallFunctionSlice);
    const profilePictureData = (!uploadedProfileImage && uploadedProfileImage === "") ? profilePicture : uploadedProfileImage?.file;

    return (
        <React.Fragment>
            <div className={"al_profile_photo "}>
                <img src={profilePictureData} alt="profilePhoto" loading='eager' />
            </div>
        </React.Fragment>
    )
}

export default ProfileImageUpload;