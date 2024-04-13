


const getDate = () => {
    const currentDate = new Date();
    
    const options = { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: true // Use AM/PM format
    };
    
    const formattedDateTime = currentDate.toLocaleString('en-GB', options); // 'en-GB' represents the format dd-mm-yyyy
    console.log(formattedDateTime); // Output: 11-04-2024, 05:03 PM
    return formattedDateTime;
}

export default getDate;
