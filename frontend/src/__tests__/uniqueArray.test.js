import { uniqueArray } from "../utils/uniqueArray";

describe("uniqueArray.js", () => {
  test("Number 중복제거 확인", () => {
    expect(uniqueArray([0, 1, 1])).toStrictEqual([0, 1]);
  });

  test("String 중복제거 확인", () => {
    expect(uniqueArray(["가", "나", "나", "다"])).toStrictEqual([
      "가",
      "나",
      "다",
    ]);
  });
});
