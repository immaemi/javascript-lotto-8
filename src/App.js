import { MissionUtils } from "@woowacourse/mission-utils";
import Lotto from "./Lotto.js";

class App {
  inputLottoCost = async () => {
    const lottoCost = await MissionUtils.Console.readLineAsync("구입금액을 입력해 주세요.\n");
    Lotto.validateLottoCost(lottoCost);
    return Number(lottoCost);
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
