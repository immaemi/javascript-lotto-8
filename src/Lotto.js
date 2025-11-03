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
    Lotto.#validateLottoNumbers(numbers);
    Lotto.#validateDuplicateLottoNumber(numbers);
    Lotto.#validateRangeLottoNumber(numbers);
  }

  static validateLottoCost(lottoCost) {
    this.#validateLottoCostIsInteger(lottoCost);
    const amount = Number(lottoCost);
    this.#validateLottoCostIsPositive(amount);
    this.#validateLottoCostMinAmount(amount);
    this.#validateLottoCostUnit(amount);
  }

  static #validateLottoCostIsInteger(lottoCost) {
    if (!/^-?\d+$/.test(lottoCost)) {
      if (/^-?\d+\.\d+$/.test(lottoCost)) {
        throw new Error("[ERROR] 구입 금액은 정수여야 합니다.");
      }
      throw new Error("[ERROR] 구입 금액은 숫자여야 합니다.");
    }
  }

  static #validateLottoCostIsPositive(amount) {
    if (amount < 0) {
      throw new Error("[ERROR] 구입 금액은 음수일 수 없습니다.");
    }
  }

  static #validateLottoCostMinAmount(amount) {
    if (amount < 1000) {
      throw new Error("[ERROR] 구입 금액은 1000원 이상이어야 합니다.");
    }
  }

  static #validateLottoCostUnit(amount) {
    if (amount % 1000 !== 0) {
      throw new Error("[ERROR] 구입 금액은 1000원 단위여야 합니다.");
    }
  }

  static validateWinningNumbers(numbers) {
    if (numbers.length !== 6) {
      throw new Error("[ERROR] 로또 번호는 6개여야 합니다.");
    }
    Lotto.#validateLottoNumbers(numbers);
    Lotto.#validateDuplicateLottoNumber(numbers);
    Lotto.#validateRangeLottoNumber(numbers);
  }

  static #validateLottoNumbers(numbers) {
    if (!Array.isArray(numbers) || numbers.some((n) => !Number.isInteger(n))) {
      throw new Error("[ERROR] 로또 번호는 정수여야 합니다.");
    }
  }

  static #validateDuplicateLottoNumber(numbers) {
    if (numbers.some((number, index, arr) => arr.indexOf(number) !== index)) {
      throw new Error("[ERROR] 로또 번호는 중복되지 않아야 합니다.");
    }
  }

  static #validateRangeLottoNumber(numbers) {
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
