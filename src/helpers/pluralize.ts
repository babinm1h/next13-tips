const formatter = Intl.NumberFormat("ru", {
  style: "unit",
  unit: "hour",
  unitDisplay: "long",
});

const currFormatter = Intl.NumberFormat("ru", {
  currency: "rub",
  style: "currency",
  currencyDisplay: "symbol",
});

export const intlPluralize = (num: number) => {
  return formatter.format(num);
};

export const toRub = (n: number) => {
  return currFormatter.format(n);
};

//
const decCache: number[] = [];
const decCases = [2, 0, 1, 1, 1, 2];

/**
 * Plural forms for russian words
 * @param count quantity for word
 * @param words Array of words.
 * Example: ['коментарий', 'коментария', 'комментариев']
 * @return Count + plural form for word
 */

export default function pluralize(num: number, titles: string[]): string {
  if (!decCache[num]) {
    decCache[num] = num % 100 > 4 && num % 100 < 20 ? 2 : decCases[Math.min(num % 10, 5)];
  }
  return `${num} ` + titles[decCache[num]];
}
