interface data{
    id:string,
    title:string,
    setCategory: (title: string) => void;
}

function Filter({title,setCategory}:data){;
   function clickHandler(title:any){
    console.log(title);
    setCategory(title);
    console.log("btn was clicked")
   }
    return(
        <div onClick={()=>clickHandler(title)} className={`filter transition-all duration-300 hover:text-yellow-100 border border-transparent hover:border-yellow-200 rounded-md`}>{title}</div>
    );
}

export default Filter;