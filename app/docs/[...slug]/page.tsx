import React from 'react'

async function page({params}:{params:Promise<{slug : string[]}>}) {
  const {slug} = await params
  return (
    <div>page i aaa {slug.map((e,i)=><li key={i}>{e}</li>)}</div>
  )
}

export default page