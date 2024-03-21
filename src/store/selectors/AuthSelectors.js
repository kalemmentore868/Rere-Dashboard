export const isAuthenticated = (state) => {
    const tokenDetailsString = localStorage.getItem('userDetails');
    let token = '';
    
    if(tokenDetailsString){
        const tokenDetails = JSON.parse(tokenDetailsString);
        token = tokenDetails.token
    }

    if (token) return true;
    return false;
};
