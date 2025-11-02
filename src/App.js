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

  async run() {
    try {
      const lottoCost = await this.inputLottoCost();
      MissionUtils.Console.print(lottoCost);
    } catch (error) {
      MissionUtils.Console.print(error.message);
    }
  }
}

export default App;
