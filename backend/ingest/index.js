import { Inngest } from "inngest";
import User from "../modals/user.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "pingup-app" });
// ingest function save use data to a data base
const syncusercreation = inngest.createFunction(
    {id:'sync-user-data-from-clerk'},
    {event:'clerk/user.created'},
  async ({event}) => {
  try {
    console.log("========== USER CREATED EVENT ==========");
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    let username = email_addresses[0].email_address.split('@')[0];

    const user = await User.findOne({ username });
    if (user) {
      username = username + Math.floor(Math.random() * 10000);
    }

    const userdata = {
      _id: id,
      email: email_addresses[0].email_address,
      fullname: first_name + " " + last_name,
      profile_picture: image_url,
      username,
    };

    const createdUser = await User.create(userdata);
    console.log("User Created:", createdUser);

  } catch (error) {
    console.error("Error creating user:", error);
  }
}
)
// ingest function to updateuser  data in database
const syncuserupdate = inngest.createFunction(
    {id:'update-user-from-clerk'},
    {event:'clerk/user.updated'},
    async (event) => {
        const {id,first_name,last_name,email_addresses,image_url} =event.data
       const updateuserdata ={
        email:email_addresses[0].email_address,
        fullname:first_name + " " +last_name,
        profile_picture :image_url,
       }
       await User.findByIdAndUpdate(id,updateuserdata)
    }
)

// delete user from databse
const syncuserdelete = inngest.createFunction(
    {id:'delete-user-with-clerk'},
    {event:'clerk/user.deleted'},
    async (event) => {
          console.log("========== USER deleted EVENT ==========");
        const {id} =event.data
       
       await User.findByIdAndDelete(id)
    }
)

// Create an empty array where we'll export future Inngest functions
export const functions = [syncusercreation,
    syncuserupdate,
    syncuserdelete

];