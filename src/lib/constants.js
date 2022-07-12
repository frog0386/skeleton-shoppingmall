export const adminMenus = [
	['profile', ['user_info', 'account', 'follow', 'referer']],
	['contest', ['apply', 'comment', 'save_list', 'gift']],
	['contact', ['contact_category']],
	['faq', ['faq_category']],
	['jewel', ['star']],
	['withdrawal', []]
];

export const adminFields = {
	profile: {
		isCreate: false,
		fields: {
			id: {},
			user_id: {},
			nickname: {},
			image: { type: 'image' },
			created_at: { type: 'date' }
		}
	},
	user_info: {
		isCreate: false,
		fields: {
			id: {},
			user_id: {},
			phone: {},
			created_at: { type: 'date' }
		}
	},
	account: {
		isCreate: false,
		fields: {
			id: {},
			user_id: {},
			email: {},
			provider: {},
			uid: {},
			created_at: { type: 'date' }
		}
	},
	follow: {
		isCreate: false,
		fields: {
			id: {},
			user_id: {},
			target_id: { type: 'user' },
			created_at: { type: 'date' }
		}
	},
	referer: {
		isCreate: false,
		fields: {
			id: {},
			user_id: {},
			target_id: { type: 'user' },
			created_at: { type: 'date' }
		}
	},
	contest: {
		fields: {
			id: {},
			user_id: {},
			image: { type: 'image' },
			type: {},

			title: {},
			reward: {},
			apply_start: { type: 'date' },
			apply_end: { type: 'date' },
			result_time: { type: 'date' },
			entry_fee: {},
			category_id: {},
			is_public: { type: 'boolean' },

			introduction: { type: 'textarea' },
			created_at: { type: 'date' }
		}
	},
	apply: {
		fields: {
			id: {},
			user_id: {},
			title: {},
			contest_id: {},
			body: { type: 'textarea' },
			created_at: { type: 'date' }
		}
	},
	comment: {
		fields: {
			id: {},
			user_id: {},
			apply_id: {},
			body: {},
			created_at: { type: 'date' }
		}
	},
	gift: {
		fields: {
			id: {},
			user_id: {},
			apply_id: {},
			contest_id: {},
			amount: {},
			target_id: { type: 'user' },
			message: {},
			created_at: { type: 'date' }
		}
	},
	save_list: {
		fields: {
			id: {},
			user_id: {},
			apply_id: {},
			contest_id: {},
			created_at: { type: 'date' }
		}
	},
	contact: {
		fields: {
			id: {},
			body: {},
			answer: {},
			user_id: {},
			type: {},
			is_answered: {},
			category_id: {},
			created_at: { type: 'date' }
		}
	},
	contact_category: {
		fields: {
			id: {},
			title: {}
		}
	},
	faq: {
		fields: {
			id: {},
			title: {},
			answer: {},
			category_id: {}
		}
	},
	faq_category: {
		fields: {
			id: {},
			title: {}
		}
	},
	jewel: {
		fields: {
			id: {},
			user_id: {},
			amount: {},
			title: {},
			created_at: { type: 'date' }
		}
	},
	star: {
		fields: {
			id: {},
			user_id: {},
			amount: {},
			created_at: { type: 'date' }
		}
	},
	withdrawal: {
		fields: {
			id: {},
			user_id: {},
			amount: {},
			status: {},
			created_at: { type: 'date' }
		}
	}
};
