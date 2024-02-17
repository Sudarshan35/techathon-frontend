export const BASE_URL="http://172.16.104.158:3030";

let userDetails:any;

if (typeof window !== 'undefined') {
    userDetails = JSON.parse(localStorage.getItem('user') || 'null');
}
else{
    userDetails=undefined;
}

export { userDetails };