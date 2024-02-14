export default function Chat({data}:{data:any}) {

    console.log(data); // Useful for debugging
    console.log("Username:", data.username); // Log the username for debugging
    console.log("This is a card component if you don't know"); // Improved readability

    // Assuming data.time is a valid date string
    const messageTime = new Date(data.time);
    const formattedTime = messageTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    return (
        <div className='mx-4 mt-4'>
            <div className={`div h-auto w-auto rounded-full bg-richblack-800 flex flex-col   max-w-[30rem] px-4 py-2 ${data.username === "Alice" ? 'justify-self-end' : ''}`}>
                <p className='text-xs text-yellow-100 pl-2'>{data.username}</p>
                <p className='text-white text-sm pl-6'>{data.chat}</p>
                <p className='text-xs text-end pr-3'>{formattedTime}</p>
            </div>
            <div className="input"></div>
        </div>
    );
}
