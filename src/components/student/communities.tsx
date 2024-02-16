"use client";
export default function Communities({communities,setCommunities}:{communities:[],setCommunities:any}) {


  if(communities.length==0)
  {
      return(
          <div className="nochats flex justify-center align-center items-center">No communities found</div>
      )
  }

  //
  return (
    <div className="w-[30rem] h-full bg-richblack-800">
      <div className="chats">
        {communities.map((community:any) => (
          <div
            className="div h-12 w-35 pl-6 bg-richblack-800 border-b-2 border-blue-500 "
            key={community._id}
          >
            {community.title}
          </div>
        ))}
      </div>
    </div>
  );
}
