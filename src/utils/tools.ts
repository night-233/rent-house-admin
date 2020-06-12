import md5 from 'js-md5';

interface Avatar {
  name: string;
  color: string
}
const Tools = {
  calcUserIcon (nickname: string, splitNumber: number = 2): Avatar {
    let pattern = new RegExp("[\u4E00-\u9FA5]+");
    splitNumber = pattern.test(nickname) ? 1 : 2
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
  // 默认返回不带单位的数字格式
  unitConversion (size: number, unit: string, hasUnit: boolean, fixedSize = 1) {
    let destSize = Number(size);
    try {
      if (destSize) {
        const unitArr = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
        let power: any;
        if (unit && unitArr.includes(unit)) {
          power = unitArr.indexOf(unit);
        } else {
          power = Math.floor(Math.log(destSize) / Math.log(1024));
        }
        const destUnit = unitArr[power];
        destSize /= (1024 ** power);
        // 取 destSize 小数部分
        const destSizeDec = String(destSize)
          .split('.')[1];
        let fixedDecSize = destSize;
        if (destSizeDec && destSizeDec.length > fixedSize) {
          fixedDecSize = Number(destSize.toFixed(fixedSize));
        }
        return hasUnit ? `${fixedDecSize} ${destUnit}` : fixedDecSize;
      }
    } catch (e) {
      throw new Error(e);
    }
    return destSize;
  },

  /**
   * 计算文件大小
   */
  getFileSize(fileByte: number): string {
    var fileSizeByte = fileByte;
    var fileSizeMsg = "";
    if (fileSizeByte < 1048576) fileSizeMsg = (fileSizeByte / 1024).toFixed(2) + "KB";
    else if (fileSizeByte == 1048576) fileSizeMsg = "1MB";
    else if (fileSizeByte > 1048576 && fileSizeByte < 1073741824) fileSizeMsg = (fileSizeByte / (1024 * 1024)).toFixed(2) + "MB";
    else if (fileSizeByte > 1048576 && fileSizeByte == 1073741824) fileSizeMsg = "1GB";
    else if (fileSizeByte > 1073741824 && fileSizeByte < 1099511627776) fileSizeMsg = (fileSizeByte / (1024 * 1024 * 1024)).toFixed(2) + "GB";
    else fileSizeMsg = "超过1TB";
    return fileSizeMsg;
  }
}

export default Tools;
