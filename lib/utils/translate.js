import axios from 'axios';

const translateText = async (text, target) => {
  const encoded = encodeURIComponent(text);
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${target}&dt=t&q=${encoded}`;
  const res = await axios.get(url);
  if (res.status !== 200) throw new Error(`Translate API error: ${res.status}`);

  const raw = res.data[0].map(t => t[0]).join('');

  const lower = raw.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
};

export default translateText;
