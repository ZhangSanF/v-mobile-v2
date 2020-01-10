import storage from "good-storage";

const FOLLOW_LOTTERY_LIST = "FOLLOW_LOTTERY_LIST";


function insertArray(arr, val, compare, maxLen) {
  const index = arr.findIndex(compare);
  if (index === 0) {
    return;
  }
  if (index > 0) {
    arr.splice(index, 1);
  }
  arr.unshift(val);
  if (maxLen && arr.length > maxLen) {
    arr.pop();
  }
}

function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare);
  if (index > -1) {
    arr.splice(index, 1);
  }
}

// 缓存收藏彩种
export function saveFollowLotteryList(list) {
  storage.set(FOLLOW_LOTTERY_LIST, list);
  return list;
}

// 读取收藏彩种
export function loadFollowLotteryList() {
  return storage.get(FOLLOW_LOTTERY_LIST, []);
}
