
import { Liveblocks } from "@liveblocks/node";
import { NextRequest, NextResponse } from "next/server";

/**
 * Authenticating your Liveblocks application
 * https://liveblocks.io/docs/authentication
 */
//shift to lib
const liveblocks = new Liveblocks({
  secret: "sk_dev_7VKcAuTKk5CAdfI-kXTfzsSsU0xba60sNY0Y51qhEX9_ywGqDENdPxSzK0SbRMJf",
});

export async function POST(request: NextRequest) {
  //chheck for auth
 const dummyUser={
   name:"saksham",
   email:"ksaksham39@gmail.com",
   avatar:"https://liveblocks.io/avatars/avatar-1.png",
 }
try{
 const { room} = await request.json()
 console.log(room,'room')
 
 const session= liveblocks.prepareSession(dummyUser.email, {
   userInfo: dummyUser, 
 });

 //check if this usere is authhorzed or is there in the room

 session.allow(room, session.FULL_ACCESS);
 const { body, status } = await session.authorize();
console.log('youn are authorized')

 return new Response(body, { status });
}catch(e){
  return NextResponse.json(e, { status: 400 });}
}