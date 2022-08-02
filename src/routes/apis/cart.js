import { getServiceSupabase } from '../../lib/admin';
import { admin } from '$lib/admin';

export async function post({ request }) {
	const { selectedItems, session } = await request.json();
	const { data } = await admin.auth.api.getUser(session.access_token);
	let userId = data.id;
	let userCartID;
	const cart = await admin.from('order').select().eq('user_id', userId).eq('status', 'cart');
	userCartID = cart.body[0].id;
	for (let i = 0; i < selectedItems.length; i++) {
		const { error } = await admin
			.from('line_item')
			.insert({
				order_id: userCartID,
				item_id: selectedItems[i].itemID,
				option_id: selectedItems[i].optionID,
				quantity: selectedItems[i].quantity,
				total_price: selectedItems[i].price * selectedItems[i].quantity
			});
		if (error) {
			return {
				status: 400
			};
		}
	}
	return {
		status: 200,
		message: 'Request done successfully'
	};
}
