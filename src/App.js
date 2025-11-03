import { MissionUtils } from "@woowacourse/mission-utils";
import Lotto from "./Lotto.js";

class App {
  // Public Methods
  async run() {
    try {
      const { lottoCost, lottos } = await this.#processLottoPurchase();
      const { winningNumbers, bonusNumber } = await this.#processWinningInput();
      this.#processPrizeResults(lottos, winningNumbers, bonusNumber, lottoCost);
    } catch (error) {
      MissionUtils.Console.print(error.message);
    }
  }

  // Input Methods
  inputLottoCost = async () => {
    const lottoCost = await MissionUtils.Console.readLineAsync(
      "구입금액을 입력해 주세요.\n"
    );
    const trimmedLottoCost = this.#trimInput(lottoCost);
    Lotto.validateLottoCost(trimmedLottoCost);
    return Number(trimmedLottoCost);
  };

  inputWinningNumbers = async () => {
    const winningNumbersInput = await MissionUtils.Console.readLineAsync(
      "\n당첨 번호를 입력해 주세요.\n"
    );
    const winningNumbers = winningNumbersInput
      .split(",")
      .map((num) => num.trim())
      .filter((num) => num !== "")
      .map((num) => Number(num));
    Lotto.validateWinningNumbers(winningNumbers);
    return winningNumbers;
  };

  inputBonusNumber = async (winningNumbers) => {
    const bonusNumberInput = await MissionUtils.Console.readLineAsync(
      "\n보너스 번호를 입력해 주세요.\n"
    );
    const bonusNumber = Number(this.#trimInput(bonusNumberInput));
    Lotto.validateBonusNumber(bonusNumber, winningNumbers);
    return bonusNumber;
  };

  // Lotto Generation Methods
  generateLottoNumbers = () => {
    return MissionUtils.Random.pickUniqueNumbersInRange(1, 45, 6);
  };

  generateLotto = () => {
    return new Lotto(this.generateLottoNumbers());
  };

  #generateLottos(ticketCount) {
    const lottos = [];
    for (let i = 0; i < ticketCount; i++) {
      const lotto = this.generateLotto();
      lottos.push(lotto);
      MissionUtils.Console.print(`[${lotto.getNumbers().join(", ")}]`);
    }
    return lottos;
  }

  // Calculation Methods
  #calculateTicketCount(lottoCost) {
    return lottoCost / 1000;
  }

  #countMatchingNumbers(lottoNumbers, winningNumbers) {
    return lottoNumbers.filter((num) => winningNumbers.includes(num)).length;
  }

  #calculatePrizeResults(lottos, winningNumbers, bonusNumber) {
    const results = {
      fifth: 0,
      fourth: 0,
      third: 0,
      second: 0,
      first: 0,
    };

    lottos.forEach((lotto) => {
      const prizeRank = this.#determinePrizeRank(
        lotto,
        winningNumbers,
        bonusNumber
      );
      this.#updateResults(results, prizeRank);
    });

    return results;
  }

  #determinePrizeRank(lotto, winningNumbers, bonusNumber) {
    const lottoNumbers = lotto.getNumbers();
    const matchCount = this.#countMatchingNumbers(
      lottoNumbers,
      winningNumbers
    );
    const hasBonus = lottoNumbers.includes(bonusNumber);

    if (matchCount === 6) {
      return "first";
    }
    if (matchCount === 5 && hasBonus) {
      return "second";
    }
    if (matchCount === 5) {
      return "third";
    }
    if (matchCount === 4) {
      return "fourth";
    }
    if (matchCount === 3) {
      return "fifth";
    }
    return null;
  }

  #updateResults(results, prizeRank) {
    if (prizeRank === null) {
      return;
    }
    results[prizeRank]++;
  }

  #calculateTotalPrize(results) {
    return (
      results.fifth * 5000 +
      results.fourth * 50000 +
      results.third * 1500000 +
      results.second * 30000000 +
      results.first * 2000000000
    );
  }

  #calculateProfitRate(totalPrize, lottoCost) {
    return (totalPrize / lottoCost) * 100;
  }

  // Output Methods
  #printPurchaseMessage(ticketCount) {
    MissionUtils.Console.print(`\n${ticketCount}개를 구매했습니다.`);
  }

  #printStatistics(results) {
    MissionUtils.Console.print("\n당첨 통계");
    MissionUtils.Console.print("---");
    MissionUtils.Console.print(`3개 일치 (5,000원) - ${results.fifth}개`);
    MissionUtils.Console.print(`4개 일치 (50,000원) - ${results.fourth}개`);
    MissionUtils.Console.print(`5개 일치 (1,500,000원) - ${results.third}개`);
    MissionUtils.Console.print(
      `5개 일치, 보너스 볼 일치 (30,000,000원) - ${results.second}개`
    );
    MissionUtils.Console.print(
      `6개 일치 (2,000,000,000원) - ${results.first}개`
    );
  }

  #printProfitRate(profitRate) {
    const roundedRate = Math.round(profitRate * 10) / 10;
    MissionUtils.Console.print(`총 수익률은 ${roundedRate}%입니다.`);
  }

  // Process Methods
  async #processLottoPurchase() {
    const lottoCost = await this.inputLottoCost();
    const ticketCount = this.#calculateTicketCount(lottoCost);
    this.#printPurchaseMessage(ticketCount);
    const lottos = this.#generateLottos(ticketCount);
    return { lottoCost, lottos };
  }

  async #processWinningInput() {
    const winningNumbers = await this.inputWinningNumbers();
    const bonusNumber = await this.inputBonusNumber(winningNumbers);
    return { winningNumbers, bonusNumber };
  }

  #processPrizeResults(lottos, winningNumbers, bonusNumber, lottoCost) {
    const results = this.#calculatePrizeResults(
      lottos,
      winningNumbers,
      bonusNumber
    );
    const totalPrize = this.#calculateTotalPrize(results);
    const profitRate = this.#calculateProfitRate(totalPrize, lottoCost);
    this.#printStatistics(results);
    this.#printProfitRate(profitRate);
  }

  // Utility Methods
  #trimInput(input) {
    if (input === null || input === undefined) {
      return "";
    }
    return String(input).replace(/\s/g, "");
  }
}

export default App;
