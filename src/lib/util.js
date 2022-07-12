import { v4 as uuidv4 } from 'uuid';
import { supabase } from '$lib/supabase';
import moment from 'moment';
import ImageResize from 'image-resize';

export const detectMediaType = (key) => {
	const images = ['jpg', 'gif', 'png', 'jpeg', 'JPG', 'GIF', 'PNG', 'JPEG'];
	const videos = ['mp4', '3gp', 'ogg', 'mov', 'avi', 'MP4', '3GP', 'OGG', 'MOV', 'AVI'];
	const audios = ['mp3', 'wav', 'aac', 'aiff', 'flac', 'MP3', 'WAV', 'AAC', 'AIFF', 'FLAC'];

	const extension = key.split('.').pop();

	if (images.includes(extension)) {
		return 'img';
	} else if (videos.includes(extension)) {
		return 'video';
	} else if (audios.includes(extension)) {
		return 'audio';
	} else {
		return null;
	}
};

export const getProfile = async (user) => {
	// 로그인을 했는데
	if (user) {
		let profile;
		const { data, error } = await supabase.from('profile').select().eq('user_id', user.id);
		profile = data[0];
		if (!error && !profile) {
			const { data: profiles } = await supabase.from('profile').insert({
				user_id: user.id,
				nickname: user.email.split('@')[0],
				code: getCode()
			});
			profile = profiles[0];
		}
		// console.log('profile', profile);
		return profile;
	} else {
		return null;
	}
};

export const getKey = async (file, bucket = 'app') => {
	if (!file) return null;
	const fileExt = file.name.split('.').pop();
	const fileName = `${uuidv4()}.${fileExt}`;
	const { error } = await supabase.storage.from(bucket).upload(fileName, file);
	if (error) {
		console.log('error', error);
		return null;
	} else {
		return fileName;
	}
};

export const getImageKey = async (file, bucket = 'app') => {
	if (!file) {
		return null;
	}
	const fileName = `${uuidv4()}.png`;
	const { error } = await supabase.storage.from(bucket).upload(fileName, file, {
		contentType: 'image/jpg'
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

export const getCode = () => {
	var result = '';
	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	var charactersLength = characters.length;
	for (var i = 0; i < 5; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
};

export const getPhoneCode = () => {
	var result = '';
	var characters = '0123456789';
	var charactersLength = characters.length;
	for (var i = 0; i < 6; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
};

export const getTimeDiff = (created_at) => {
	const now = new Date();
	const createdAtDate = new Date(created_at);
	let printTimeDiff;
	const fullTimeDiff = (now.getTime() - createdAtDate.getTime()) / (1000 * 60);
	const timeDiff = Math.floor(fullTimeDiff);
	if (timeDiff < 1) {
		printTimeDiff = '방금 전';
	} else if (timeDiff < 60) {
		printTimeDiff = timeDiff + '분 전';
	} else if (timeDiff < 1440) {
		printTimeDiff = Math.floor(timeDiff / 60) + '시간 전';
	} else {
		printTimeDiff = (createdAtDate.getFullYear() % 100) + '.';

		if (createdAtDate.getMonth() + 1 < 10) {
			printTimeDiff += '0' + (createdAtDate.getMonth() + 1) + '.';
		} else {
			printTimeDiff += createdAtDate.getMonth() + 1 + '.';
		}

		if (createdAtDate.getDate() < 10) {
			printTimeDiff += '0' + createdAtDate.getDate();
		} else {
			printTimeDiff += createdAtDate.getDate();
		}
	}

	return printTimeDiff;
};

export const formatBytes = (bytes, decimals = 2) => {
	if (bytes === 0) return '0 Bytes';

	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export const dateFormat = (date) => {
	try {
		return moment(date).format('YYYY-MM-DD HH:mm');
	} catch (e) {
		console.log(e);
		return '시간이나 포맷이 잘못되었습니다.';
	}
};

export const resize = async (file) => {
	try {
		var imageResize = new ImageResize({
			format: 'jpg',
			width: 1024,
			quality: 0.7,
			outputType: 'blob'
		});
		return await imageResize.play(file);
	} catch (e) {
		return null;
	}
};
