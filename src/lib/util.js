import { v4 as uuidv4 } from 'uuid';
import { supabase } from '$lib/supabase';

export const getKey = async (file, bucket = 'app') => {
	if (!file) return null;
	const fileExt = file.name.split('.').pop();
	const fileName = `${uuidv4()}.${fileExt}`;
	const { error } = await supabase.storage.from(bucket).upload(fileName, file);
	if (error) {
		return null;
	} else {
		return fileName;
	}
};

export const getImageKey = async (file, bucket = 'app') => {
	const fileName = `${uuidv4()}.png`;
	const { error } = await supabase.storage.from(bucket).upload(fileName, file, {
		contentType: 'image/png'
	});
	if (error) {
		return null;
	} else {
		return fileName;
	}
};

export const getUrl = async (key, bucket = 'app') => {
	if (!key) {
		return '/empty.png';
	}

	const { publicURL } = await supabase.storage.from(bucket).getPublicUrl(key);
	return publicURL;
};
