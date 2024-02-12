

export default function Card({data}:any) {
  return (
    <div className="flex">
      <div className="card h-96 w-80 border-2 bg-richblack-900 border-white flex flex-col items-center pt-2 rounded-lg">
        <div className="img  border-2 h-52 w-72 border-yellow-600 rounded-md object-cover">
            <img src={data.image.url}  alt={data.image.alt} />
        </div>
        <div className="title text-md">{data.title}</div>
        <div className="tutor text-xs">course Instructor:sudarshan</div>
        <div className="description text-xs w-72 text-center mb-2">{data.description.slice(0,150)}</div>
        <div className="btn w-72 h-6 bg-yellow-200  text-center rounded-md">join course</div>
      </div>
    </div>
  )
}
