import Lotto from "../src/Lotto";

describe("로또 클래스 테스트", () => {
  describe("로또 생성", () => {
    test("로또 번호의 개수가 6개가 넘어가면 예외가 발생한다.", () => {
      expect(() => {
        new Lotto([1, 2, 3, 4, 5, 6, 7]);
      }).toThrow("[ERROR]");
    });

    test("로또 번호에 중복된 숫자가 있으면 예외가 발생한다.", () => {
      expect(() => {
        new Lotto([1, 2, 3, 4, 5, 5]);
      }).toThrow("[ERROR]");
    });

    test("로또 번호가 6개 미만이면 예외가 발생한다.", () => {
      expect(() => {
        new Lotto([1, 2, 3, 4, 5]);
      }).toThrow("[ERROR]");
    });

    test("로또 번호가 1 미만이면 예외가 발생한다.", () => {
      expect(() => {
        new Lotto([0, 1, 2, 3, 4, 5]);
      }).toThrow("[ERROR]");
    });

    test("로또 번호가 45를 초과하면 예외가 발생한다.", () => {
      expect(() => {
        new Lotto([1, 2, 3, 4, 5, 46]);
      }).toThrow("[ERROR]");
    });

    test("정상적인 로또 번호로 생성이 성공한다.", () => {
      expect(() => {
        new Lotto([1, 2, 3, 4, 5, 6]);
      }).not.toThrow();
    });

    test("로또 번호가 정렬되어 반환된다.", () => {
      const lotto = new Lotto([45, 1, 30, 15, 5, 20]);
      expect(lotto.getNumbers()).toEqual([1, 5, 15, 20, 30, 45]);
    });
  });

  describe("구입 금액 검증", () => {
    test.each([
      ["1000", true],
      ["5000", true],
      ["10000", true],
      ["abc", false],
      ["", false],
      ["-1000", false],
      ["0", false],
      ["500", false],
      ["1500", false],
      ["12.5", false],
      ["1000.5", false],
    ])('구입 금액 "%s" 검증', (input, isValid) => {
      if (isValid) {
        expect(() => {
          Lotto.validateLottoCost(input);
        }).not.toThrow();
      } else {
        expect(() => {
          Lotto.validateLottoCost(input);
        }).toThrow("[ERROR]");
      }
    });
  });

  describe("당첨 번호 검증", () => {
    test.each([
      [[1, 2, 3, 4, 5, 6], true],
      [[1, 2, 3, 4, 5], false],
      [[1, 2, 3, 4, 5, 6, 7], false],
      [[1, 2, 3, 4, 5, 5], false],
      [[0, 1, 2, 3, 4, 5], false],
      [[1, 2, 3, 4, 5, 46], false],
      [[1, 2, 3, 4, 5, 45], true],
    ])('당첨 번호 %s 검증', (numbers, isValid) => {
      if (isValid) {
        expect(() => {
          Lotto.validateWinningNumbers(numbers);
        }).not.toThrow();
      } else {
        expect(() => {
          Lotto.validateWinningNumbers(numbers);
        }).toThrow("[ERROR]");
      }
    });

    test("정수가 아닌 번호가 포함되면 예외가 발생한다.", () => {
      expect(() => {
        Lotto.validateWinningNumbers([1, 2, 3, 4, 5, 6.5]);
      }).toThrow("[ERROR]");
    });
  });

  describe("보너스 번호 검증", () => {
    const winningNumbers = [1, 2, 3, 4, 5, 6];

    test.each([
      [7, true],
      [45, true],
      [1, false],
      [6, false],
      [0, false],
      [46, false],
      [7.5, false],
    ])('보너스 번호 %s 검증', (bonusNumber, isValid) => {
      if (isValid) {
        expect(() => {
          Lotto.validateBonusNumber(bonusNumber, winningNumbers);
        }).not.toThrow();
      } else {
        expect(() => {
          Lotto.validateBonusNumber(bonusNumber, winningNumbers);
        }).toThrow("[ERROR]");
      }
    });

    test("보너스 번호가 당첨 번호와 중복되면 예외가 발생한다.", () => {
      expect(() => {
        Lotto.validateBonusNumber(3, winningNumbers);
      }).toThrow("[ERROR]");
    });
  });
});
