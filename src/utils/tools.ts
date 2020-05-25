import md5 from 'js-md5';

interface Avatar {
  name: string;
  color: string
}
export default {
  calcUserIcon (nickname: string, splitNumber: number = 2): Avatar {
    let pattern = new RegExp("[\u4E00-\u9FA5]+");
    splitNumber = pattern.test(nickname) ? 1 : 2
    console.log('dd', splitNumber)
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
    let name = splitNumber === 1 ? nickname.slice(-1) : nickname.slice(0, splitNumber)
    if (isNaN(index)) {
      const charCode = middleChar.charCodeAt();
      const index = charCode % 10;
      return { color: base[index], name };
    }
    return { color: base[index], name };
  },
}