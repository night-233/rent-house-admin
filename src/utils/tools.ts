import md5 from 'js-md5';

interface Avatar {
  name: string;
  color: string
}
export default {
  calcUserIcon (nickname: string, splitNumber: number = 2): Avatar {
    const base = [
      '#F0B949',
      '#F78E59',
      '#E15769',
      '#9A76DB',
      '#776BDB',
      '#4C8EC8',
      '#5384E0',
      '#66AFEE',
      '#5ACECE',
      '#8BDE61',
    ];
    const hash = md5(nickname);
    const middleChar = hash[16];
    const index = Number(middleChar);
    if (isNaN(index)) {
      const charCode = middleChar.charCodeAt();
      const index = charCode % 10;
      return { color: base[index], name: nickname.split('').splice(0, splitNumber).join('') };
    }
    return { color: base[index], name: nickname.split('').splice(0, splitNumber).join('') };
  },
}