import { MissionUtils } from "@woowacourse/mission-utils";
import Lotto from "./Lotto.js";

class App {
  #trimInput(input) {
    return input.replace(/\s/g, '');
  }

  inputLottoCost = async () => {
    const lottoCost = await MissionUtils.Console.readLineAsync("구입금액을 입력해 주세요.\n");
    const trimmedLottoCost = this.#trimInput(lottoCost);
    Lotto.validateLottoCost(trimmedLottoCost);
    return Number(trimmedLottoCost);
  }

  generateLottoNumbers = () => {
    return MissionUtils.Random.pickUniqueNumbersInRange(1, 45, 6);
  }

  generateLotto = () => {
    return new Lotto(this.generateLottoNumbers());
  }

  #calculateTicketCount(lottoCost) {
    return lottoCost / 1000;
  }

  #printPurchaseMessage(ticketCount) {
    MissionUtils.Console.print(`\n${ticketCount}개를 구매했습니다.`);
  }

  #generateLottos(ticketCount) {
    const lottos = [];
    for (let i = 0; i < ticketCount; i++) {
      const lotto = this.generateLotto();
      lottos.push(lotto);
      MissionUtils.Console.print(`[${lotto.getNumbers().join(', ')}]`);
    }
    return lottos;
  }

  inputWinningNumbers = async () => {
    const winningNumbersInput = await MissionUtils.Console.readLineAsync("\n당첨 번호를 입력해 주세요.\n");
    const winningNumbers = winningNumbersInput.split(",").map((num) => Number(num.trim()));
    Lotto.validateWinningNumbers(winningNumbers);
    return winningNumbers;
  }

  inputBonusNumber = async (winningNumbers) => {
    const bonusNumberInput = await MissionUtils.Console.readLineAsync("\n보너스 번호를 입력해 주세요.\n");
    const bonusNumber = Number(this.#trimInput(bonusNumberInput));
    Lotto.validateBonusNumber(bonusNumber, winningNumbers);
    return bonusNumber;
  }


  #countMatchingNumbers(lottoNumbers, winningNumbers) {
    return lottoNumbers.filter(num => winningNumbers.includes(num)).length;
  }

  #calculatePrizeResults(lottos, winningNumbers, bonusNumber) {
    const results = {
      fifth: 0,    // 3개 일치 (5,000원)
      fourth: 0,   // 4개 일치 (50,000원)
      third: 0,    // 5개 일치 (1,500,000원)
      second: 0,   // 5개 일치 + 보너스 (30,000,000원)
      first: 0,    // 6개 일치 (2,000,000,000원)
    };

    lottos.forEach(lotto => {
      const lottoNumbers = lotto.getNumbers();
      const matchCount = this.#countMatchingNumbers(lottoNumbers, winningNumbers);
      const hasBonus = lottoNumbers.includes(bonusNumber);

      if (matchCount === 6) {
        results.first++;
      } else if (matchCount === 5 && hasBonus) {
        results.second++;
      } else if (matchCount === 5) {
        results.third++;
      } else if (matchCount === 4) {
        results.fourth++;
      } else if (matchCount === 3) {
        results.fifth++;
      }
    });

    return results;
  }

  #calculateTotalPrize(results) {
    return results.fifth * 5000 +
           results.fourth * 50000 +
           results.third * 1500000 +
           results.second * 30000000 +
           results.first * 2000000000;
  }

  #calculateProfitRate(totalPrize, lottoCost) {
    return (totalPrize / lottoCost) * 100;
  }

  #printStatistics(results) {
    MissionUtils.Console.print("\n당첨 통계");
    MissionUtils.Console.print("---");
    MissionUtils.Console.print(`3개 일치 (5,000원) - ${results.fifth}개`);
    MissionUtils.Console.print(`4개 일치 (50,000원) - ${results.fourth}개`);
    MissionUtils.Console.print(`5개 일치 (1,500,000원) - ${results.third}개`);
    MissionUtils.Console.print(`5개 일치, 보너스 볼 일치 (30,000,000원) - ${results.second}개`);
    MissionUtils.Console.print(`6개 일치 (2,000,000,000원) - ${results.first}개`);
  }

  #printProfitRate(profitRate) {
    const roundedRate = Math.round(profitRate * 10) / 10;
    MissionUtils.Console.print(`총 수익률은 ${roundedRate}%입니다.`);
  }

  async run() {
    try {
      const lottoCost = await this.inputLottoCost();
      const ticketCount = this.#calculateTicketCount(lottoCost);
      this.#printPurchaseMessage(ticketCount);
      const lottos = this.#generateLottos(ticketCount);
      const winningNumbers = await this.inputWinningNumbers();
      const bonusNumber = await this.inputBonusNumber(winningNumbers);
      
      const results = this.#calculatePrizeResults(lottos, winningNumbers, bonusNumber);
      const totalPrize = this.#calculateTotalPrize(results);
      const profitRate = this.#calculateProfitRate(totalPrize, lottoCost);
      
      this.#printStatistics(results);
      this.#printProfitRate(profitRate);
    } catch (error) {
      MissionUtils.Console.print(error.message);
      return;
    }
  }
}

export default App;
