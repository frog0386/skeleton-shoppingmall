import { admin } from '$lib/admin';
import { supabase } from '$lib/supabase';

export async function post({request}){
  const { data, session, flag } = await request.json();
  

  if(flag === 0){
    try{
      const { user } = await admin.auth.api.getUser(session.access_token);
		  let userId = user.id;
      const response = await admin.from('order').insert({status : "paid", user_id : userId});
      let orderId = response.data[0].id;
      for(let i=0; i<data.length; i++){
        await admin.from('line_item').insert({order_id : orderId, item_id : data[i].id, option_id : data[i].optionID, quantity : data[i].quantity, price : data[i].price * data[i].quantity});
      }
      return{
        status:200
      };
    }catch(error){
      status:400
    }
  }
  else if (flag === 1){
    try{
      const { user } = await admin.auth.api.getUser(session.access_token);
		  let userId = user.id;
		  const response = await admin.from('order').insert({status : "paid", user_id : userId});
      let orderId = response.data[0].id;
      for(let i=0; i<data.length; i++){
        await admin.from('line_item').update({order_id : orderId}).eq('id',data[i].id);
      }

      return{
        status:200
      };
    }catch(error){
      status : 400
    }
  }
  else{
    return{
      status:400,
      message : "Invalid flag"
    };
  }
}