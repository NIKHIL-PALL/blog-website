

const ProfilePicture = ({userName}) => {
    
    const firstLetter = userName.charAt(0).toUpperCase();
    const colors = ['#FF5733', '#FFC300', '#FF5733', '#FFC300', '#FF5733'];
    return(
        <div className="font-medium font-mont text-white w-10 rounded-full flex items-center justify-center text-2xl h-10" style={{backgroundColor : `${colors[firstLetter.charCodeAt(0) % colors.length]}` }} >
            {firstLetter}
        </div>
    );
}

export default ProfilePicture;