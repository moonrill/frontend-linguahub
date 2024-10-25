/**
 * Utility function to capitalize the first letter of each word in a sentence
 * but leave Roman numerals unchanged.
 * @param sentence - The sentence to be formatted
 * @returns The formatted sentence with the first letter of each word capitalized, except for Roman numerals.
 */
export function capitalizeFirstLetter(sentence: string): string {
  if (!sentence) {
    return '';
  }

  const romanNumerals = [
    'I',
    'II',
    'III',
    'IV',
    'V',
    'VI',
    'VII',
    'VIII',
    'IX',
    'X',
    'XI',
    'XII',
    'XIII',
    'XIV',
    'XV',
    'XVI',
    'XVII',
    'XVIII',
    'XIX',
    'XX',
  ];

  return sentence
    .split(' ') // Memisahkan kalimat menjadi array kata-kata
    .map((word) => {
      // Jika kata adalah angka Romawi, biarkan tidak diubah
      if (romanNumerals.includes(word.toUpperCase())) {
        return word;
      }
      // Mengubah huruf pertama setiap kata menjadi huruf kapital
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' '); // Menggabungkan kembali menjadi kalimat
}
