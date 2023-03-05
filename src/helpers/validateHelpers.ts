export const getMaxMessage = (max: number) => {
  return `Макcимальная длина ${max} символов`;
};
export const getMinMessage = (min: number) => {
  return `Минимальная длина ${min} символов`;
};

export const TIN_PATTERN = /^[0-9]{10,12}$/;
export const VAT_PATTERN = /^[0-9]{9}$/;
export const VAT_PATTERN_WITH_REG_START = /^55/;
export const VNP_PATTERN = /^[0-9]{9}$/;
export const BIN_PATTERN = /^[0-9]{12}$/;
export const KBE_PATTERN = /^[0-9]{2}$/;
export const IIK_PATTERN = /^KZ[0-9a-zA-Z]{18}$/;

export const CIO_PATTERN = /^[0-9]{4}[0-9A-Z]{2}[0-9]{3}$/;
export const OGRN_PATTERN = /^[0-9]{13,15}$/;
export const BANK_ACCOUNT_PATTERN = /^[0-9]{20}$/;
export const ADDRESS_PATTERN = /(.+);(.+);(.+);(.+)/;
export const BIC_PATTERN = /^[0-9]{9}$/;

export const DIGITS_PATTERN: RegExp = /^[0-9]$/;
export const DEFAULT_SYMBOLS_PATTERN: RegExp = /^[a-zA-Z0-9]$/;

export type CardType = "default" | "maestro" | "mastercard" | "mir" | "visa";

export const getCardType = (number: string): CardType | undefined => {
  if (number.match(/^4/)) {
    return "visa";
  }
  if (
    /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(
      number
    )
  ) {
    return "mastercard";
  }

  if (number.match(/^(4026|417500|4508|4844|491(3|7))/)) {
    return "visa";
  }

  if (number.match(/^(5018|5020|5038|6304|6759|6761|6763)[0-9]{8,15}$/)) {
    return "maestro";
  }

  if (number.match(/^220[0-4]\d{0,12}/)) {
    return "mir";
  }

  return undefined;
};

export const maskByCountriesCode = {
  ru: {
    condition: /^\+79/,
    mask: "+9 999 999-99-99",
    test: /^79\d{9}$/,
  },
  kz: {
    condition: /^\+7[367]/,
    mask: "+9 999 999-99-99",
    test: /^7[367]\d{9}$/,
  },
  ua: {
    condition: /^\+380/,
    mask: "+999 99 9999999",
    test: /^380\d{9}$/,
  },
  am: {
    condition: /^\+374/,
    mask: "+999 99 99-99-99",
    test: /^374\d{8}$/,
  },
  by: {
    condition: /^\+375/,
    mask: "+999 99 999-99-99",
    test: /^375\d{9}$/,
  },
  md: {
    condition: /^\+373/,
    mask: "+999 99 99-99-99",
    test: /^373\d{8}$/,
  },
  az: {
    condition: /^\+994/,
    mask: "+999 99 999-99-99",
    test: /^994\d{9}$/,
  },
  kg: {
    condition: /^\+996/,
    mask: "+999 999 999-999",
    test: /^996\d{9}$/,
  },
  ge: {
    condition: /^\+995/,
    mask: "+999 999 999-999",
    test: /^995\d{9}$/,
  },
  lv: {
    condition: /^\+371/,
    mask: "+999 99 999-999",
    test: /^371\d{8}$/,
  },
  uz: {
    condition: /^\+998/,
    mask: "+999 99 999-99-99",
    test: /^998\d{9}$/,
  },
  rs: {
    condition: /^\+381/,
    mask: "+999 99 999-999",
    test: /^381\d{8}$/,
  },
  ee: {
    condition: /^\+372/,
    mask: "+999 99 999-999",
    test: /^372\d{7,8}$/,
  },
  lt: {
    condition: /^\+370/,
    mask: "+999 999 999-999",
    test: /^370\d{7,8}$/,
  },
};

/**
 * @param {String }phone
 * @returns {string}
 */
export const getPhoneMask = (phone: string) => {
  phone = String(phone).replace(/[^0-9+]+/g, "") ;

  const countryItem = Object.values(maskByCountriesCode).find((item) => {
    return item.condition.test(phone);
  });

  if (countryItem) {
    return countryItem.mask;
  }

  return "+9 999 999-99-9999";
};


// =========================================== 
const CreditCardDetector = {
  blocks: {
      uatp:          [4, 5, 6],
      amex:          [4, 6, 5],
      diners:        [4, 6, 4],
      discover:      [4, 4, 4, 4],
      mastercard:    [4, 4, 4, 4],
      dankort:       [4, 4, 4, 4],
      instapayment:  [4, 4, 4, 4],
      jcb15:         [4, 6, 5],
      jcb:           [4, 4, 4, 4],
      maestro:       [4, 4, 4, 4],
      visa:          [4, 4, 4, 4],
      mir:           [4, 4, 4, 4],
      unionPay:      [4, 4, 4, 4],
      general:       [4, 4, 4, 4]
  },

  re: {
      // starts with 1; 15 digits, not starts with 1800 (jcb card)
      uatp: /^(?!1800)1\d{0,14}/,

      // starts with 34/37; 15 digits
      amex: /^3[47]\d{0,13}/,

      // starts with 6011/65/644-649; 16 digits
      discover: /^(?:6011|65\d{0,2}|64[4-9]\d?)\d{0,12}/,

      // starts with 300-305/309 or 36/38/39; 14 digits
      diners: /^3(?:0([0-5]|9)|[689]\d?)\d{0,11}/,

      // starts with 51-55/2221–2720; 16 digits
      mastercard: /^(5[1-5]\d{0,2}|22[2-9]\d{0,1}|2[3-7]\d{0,2})\d{0,12}/,

      // starts with 5019/4175/4571; 16 digits
      dankort: /^(5019|4175|4571)\d{0,12}/,

      // starts with 637-639; 16 digits
      instapayment: /^63[7-9]\d{0,13}/,

      // starts with 2131/1800; 15 digits
      jcb15: /^(?:2131|1800)\d{0,11}/,

      // starts with 2131/1800/35; 16 digits
      jcb: /^(?:35\d{0,2})\d{0,12}/,

      // starts with 50/56-58/6304/67; 16 digits
      maestro: /^(?:5[0678]\d{0,2}|6304|67\d{0,2})\d{0,12}/,

      // starts with 22; 16 digits
      mir: /^220[0-4]\d{0,12}/,

      // starts with 4; 16 digits
      visa: /^4\d{0,15}/,

      // starts with 62/81; 16 digits
      unionPay: /^(62|81)\d{0,14}/
  },

  getStrictBlocks: function (block) {
    var total = block.reduce(function (prev, current) {
      return prev + current;
    }, 0);

    return block.concat(19 - total);
  },

  getInfo: function (value:any, strictMode:boolean) {
      let blocks = CreditCardDetector.blocks,
          re = CreditCardDetector.re;

      // Some credit card can have up to 19 digits number.
      // Set strictMode to true will remove the 16 max-length restrain,
      // however, I never found any website validate card number like
      // this, hence probably you don't want to enable this option.
      strictMode = !!strictMode;

      for (let key in re) {
          if (re[key].test(value)) {
              let matchedBlocks = blocks[key];
              return {
                  type: key,
                  blocks: strictMode ? this.getStrictBlocks(matchedBlocks) : matchedBlocks
              };
          }
      }

      return {
          type: 'unknown',
          blocks: strictMode ? this.getStrictBlocks(blocks.general) : blocks.general
      };
  }
};
