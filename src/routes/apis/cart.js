import { admin } from '$lib/admin';

export async function post({ request }) {
	const { selectedItems, session } = await request.json();
	try {
		const { data } = await admin.auth.api.getUser(session.access_token);
		let userId = data.id;
		let userCartID;
		let duplicateCheck = null;
		const cart = await admin.from('order').select().eq('user_id', userId).eq('status', 'cart');
		userCartID = cart.body[0].id;
		for (let i = 0; i < selectedItems.length; i++) {
			duplicateCheck = await admin
				.from('line_item')
				.select()
				.eq('order_id', userCartID)
				.eq('item_id', selectedItems[i].itemID)
				.eq('option_id', selectedItems[i].optionID);
			if (duplicateCheck.data.length === 0) {
				const { error } = await admin.from('line_item').insert({
					order_id: userCartID,
					item_id: selectedItems[i].itemID,
					option_id: selectedItems[i].optionID,
					quantity: selectedItems[i].quantity,
					price: selectedItems[i].price * selectedItems[i].quantity
				});
			} else {
				let quantity = duplicateCheck.body[0].quantity + selectedItems[i].quantity;
				await admin
					.from('line_item')
					.update({ quantity: quantity })
					.match({ id: duplicateCheck.body[0].id });
			}
			duplicateCheck = null;
		}
		return {
			status: 200,
			message: 'Request done successfully'
		};
	} catch (error) {
		return {
			status: 400
		};
	}
}

export async function del({request}){
	const { item, session } = await request.json();
	let itemId = item.id
	try{
		const { data } = await admin.auth.api.getUser(session.access_token);
		let userId = data.id;
		let userCartID;
		const cart = await admin.from('order').select().eq('user_id', userId).eq('status', 'cart');
		userCartID = cart.body[0].id;
		await admin.from('line_item').delete().eq('order_id',userCartID).eq('id', itemId);
		return{
			status:200
		};
	}
	catch(error){
		return {
			status: 400
		};
	}
}

export async function patch({request}){
	const { data, session, action} = await request.json();
	console.log(data);
	let itemId = data.id
	let quantity = data.quantity;
	console.log(session);
	try{
		const { data } = await admin.auth.api.getUser(session.access_token);
		let userId = data.id;
		let userCartID;
		const cart = await admin.from('order').select().eq('user_id', userId).eq('status', 'cart');
		userCartID = cart.body[0].id;
		if(action === 'plus'){
			await admin.from('line_item').update({quantity : quantity + 1}).eq('id',itemId);
		}
		else if (action === 'minus'){
			await admin.from('line_item').update({quantity : quantity - 1}).eq('id',itemId);
		}
		return{
			status:200
		};
	}
	catch(error){
		return {
			status: 400
		};
	}
}