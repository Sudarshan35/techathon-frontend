export const BASE_URL="http://192.168.29.85:3030";

let userDetails:any;

if (typeof window !== 'undefined') {
    userDetails = JSON.parse(localStorage.getItem('user') || 'null');
}
else{
    userDetails=undefined;
}

export { userDetails };