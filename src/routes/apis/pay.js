import { admin } from '$lib/admin';
import { supabase } from '$lib/supabase';

export async function post({request}){
  const { data, session, flag } = await request.json();
  

  if(flag === 0){
    try{
      console.log(data);
      const { user } = await admin.auth.api.getUser(session.access_token);
		  let userId = user.id;
      const response = await admin.from('order').insert({status : "paid", user_id : userId, address_id : data.addressOption.id, request : data.addressOption.request});
      let orderId = response.data[0].id;
      for(let i=0; i<data.items.length; i++){
        await admin.from('line_item').insert({order_id : orderId, item_id : data.items[i].id, option_id : data.items[i].optionId, quantity : data.items[i].quantity, price : data.items[i].price * data.items[i].quantity});
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
      console.log(data);
      console.log(data.cartList[0].id);
      const { user } = await admin.auth.api.getUser(session.access_token);
		  let userId = user.id;
		  const response = await admin.from('order').insert({status : "paid", user_id : userId, address_id : data.addressOption.id, request : data.addressOption.request});
      let orderId = response.data[0].id;
      console.log(orderId);
      for(let i=0; i<data.cartList.length; i++){
        await admin.from('line_item').update({order_id : orderId}).eq('id',data.cartList[i].id);
        
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