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

  #generateAndPrintLottos(ticketCount) {
    for (let i = 0; i < ticketCount; i++) {
      const lotto = this.generateLotto();
      MissionUtils.Console.print(`[${lotto.getNumbers().join(', ')}]`);
    }
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

  async run() {
    try {
      const lottoCost = await this.inputLottoCost();
      const ticketCount = this.#calculateTicketCount(lottoCost);
      this.#printPurchaseMessage(ticketCount);
      this.#generateAndPrintLottos(ticketCount);
      const winningNumbers = await this.inputWinningNumbers();
      const bonusNumber = await this.inputBonusNumber(winningNumbers);
    } catch (error) {
      MissionUtils.Console.print(error.message);
      return;
    }
  }
}

export default App;
