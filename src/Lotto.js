class Lotto {
  #numbers;

  // Constructor
  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  // Public Instance Methods
  getNumbers() {
    return this.#getSortedLottoNumbers();
  }

  // Public Static Methods
  static validateLottoCost(lottoCost) {
    this.#validateLottoCostIsInteger(lottoCost);
    const amount = Number(lottoCost);
    this.#validateLottoCostIsPositive(amount);
    this.#validateLottoCostMinAmount(amount);
    this.#validateLottoCostUnit(amount);
  }

  static validateWinningNumbers(numbers) {
    if (numbers.length !== 6) {
      throw new Error("[ERROR] 로또 번호는 6개여야 합니다.");
    }
    Lotto.#validateLottoNumbers(numbers);
    Lotto.#validateDuplicateLottoNumber(numbers);
    Lotto.#validateRangeLottoNumber(numbers);
  }

  static validateBonusNumber(bonusNumber, winningNumbers) {
    Lotto.#validateBonusNumberIsInteger(bonusNumber);
    Lotto.#validateBonusNumberRange(bonusNumber);
    Lotto.#validateBonusNumberDuplicate(bonusNumber, winningNumbers);
  }

  // Private Instance Methods
  #validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error("[ERROR] 로또 번호는 6개여야 합니다.");
    }
    Lotto.#validateLottoNumbers(numbers);
    Lotto.#validateDuplicateLottoNumber(numbers);
    Lotto.#validateRangeLottoNumber(numbers);
  }

  #sortLottoNumber(numbers) {
    return [...numbers].sort((a, b) => a - b);
  }

  #getSortedLottoNumbers() {
    return this.#sortLottoNumber(this.#numbers);
  }

  // Private Static Methods - Lotto Cost Validation
  static #validateLottoCostIsInteger(lottoCost) {
    if (Lotto.#isDecimalNumber(lottoCost)) {
      throw new Error("[ERROR] 구입 금액은 정수여야 합니다.");
    }
    if (!Lotto.#isIntegerString(lottoCost)) {
      throw new Error("[ERROR] 구입 금액은 숫자여야 합니다.");
    }
  }

  static #isDecimalNumber(lottoCost) {
    return /^-?\d+\.\d+$/.test(lottoCost);
  }

  static #isIntegerString(lottoCost) {
    return /^-?\d+$/.test(lottoCost);
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

  // Private Static Methods - Lotto Numbers Validation
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
    if (numbers.some((number) => number < 1 || number > 45)) {
      throw new Error("[ERROR] 로또 번호는 1 이상 45 이하의 정수여야 합니다.");
    }
  }

  // Private Static Methods - Bonus Number Validation
  static #validateBonusNumberIsInteger(bonusNumber) {
    if (!Number.isInteger(bonusNumber)) {
      throw new Error("[ERROR] 보너스 번호는 정수여야 합니다.");
    }
  }

  static #validateBonusNumberRange(bonusNumber) {
    if (bonusNumber < 1 || bonusNumber > 45) {
      throw new Error(
        "[ERROR] 보너스 번호는 1 이상 45 이하의 정수여야 합니다."
      );
    }
  }

  static #validateBonusNumberDuplicate(bonusNumber, winningNumbers) {
    if (winningNumbers.includes(bonusNumber)) {
      throw new Error("[ERROR] 보너스 번호는 당첨 번호와 중복될 수 없습니다.");
    }
  }
}

export default Lotto;
