import { supabase } from '../lib/initSupabase';

export async function fetchMyRooms(userId: string) {
  const { data: createdRooms, error } = await supabase
    .from("Rooms")
    .select()
    .eq("userId", userId);

  if (error) {
    console.error("Error fetching created rooms:", error);
    return [];
  }

  return createdRooms || [];
}

export async function fetchAccessedRooms(userId: string,userEmail: string) {
  const { data: memberRooms, error } = await supabase
    .from("Rooms")
    .select()
    .neq("userId", userId)
    .or(`Members.cs.{${userEmail}},Admins.cs.{${userEmail}}`);

  if (error) {
    console.error("Error fetching member rooms:", error);
    return [];
  }

  return memberRooms || [];
}
export async function createNewRoom(roomName: string, roomDescription: string, memberEmails: string[], userId: string, userEmail: string){
  const { data, error } = await supabase
  .from("Rooms")
  .insert({
      Name: roomName,
      Description: roomDescription,
      Admins: [userEmail],
      Members: memberEmails,
      userId: userId
  })
  .select();

if (error) throw error;

if(data && data[0]){
    return data[0];
}
}

export async function renameRoom(roomId: string, newName: string) {
  const { error } = await supabase
  .from("Rooms")
  .update({ Name: newName })
  .eq('id', roomId);

if (error) throw error;
return true;
}