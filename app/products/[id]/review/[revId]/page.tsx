

import { notFound } from "next/navigation";

export default async function ProductReview({params}:{params:Promise<{id:string; revId:string}>})
{
    const {id,revId} = await params
     
    if (parseInt(revId)>1000){
        notFound();
    }
    return(
        <>  
            id : {id}, review id : {revId}
        </>
    )
}