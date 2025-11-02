class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error("[ERROR] 로또 번호는 6개여야 합니다.");
    }
    this.#validateNumbers(numbers);
    this.#validateDuplicateLottoNumber(numbers);
    this.#validateRangeLottoNumber(numbers);
  }

  #validateNumbers(numbers) {
    if (!Array.isArray(numbers) || numbers.some((n) => !Number.isInteger(n))) {
      throw new Error("[ERROR] 로또 번호는 정수여야 합니다.");
    }
  }

  #validateDuplicateLottoNumber(numbers) {
    if (numbers.some((number, index, arr) => arr.indexOf(number) !== index)) {
      throw new Error("[ERROR] 로또 번호는 중복되지 않아야 합니다.");
    }
  }

  #validateRangeLottoNumber(numbers) {
    if (numbers.some(number => number < 1 || number > 45)) {
      throw new Error("[ERROR] 로또 번호는 1 이상 45 이하의 정수여야 합니다.");
    }
  }

  #sortLottoNumber(numbers) {
    return [...numbers].sort((a, b) => a - b);
  }

  #getSortedLottoNumbers() {
    return this.#sortLottoNumber(this.#numbers);
  }

  getNumbers() {
    return this.#getSortedLottoNumbers();
  }
}

export default Lotto;
