export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const  id  = (await params).id

  return (
    <div>page {id}</div>
  )
}


// export default async function page(params:type) {
  
// }export default async function Page({ params }: { params: Promise<{ id: string }> }) {
//   const { id } = (await params).id

//   return (
//     <div>page {id}</div>
//   )
// }