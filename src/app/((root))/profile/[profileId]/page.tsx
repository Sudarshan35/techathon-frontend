import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

const Page=({params}:{params:Params})=>{

    return(
        <div>{params.profileId}</div>
    );
}

export default Page;