export const symbols = {
  cherry: "🍒",
  lemon: "🍋",
  star: "⭐",
  seven: "7",
  diamond: "💎",
};

export interface ReelMap {
  cherry: number;
  lemon: number;
  star: number;
  seven: number;
  diamond: number;
}

export const reel1Map = {
  cherry: 3,
  lemon: 3,
  star: 3,
  seven: 1,
  diamond: 0,
};

export const reel2Map = {
  cherry: 4,
  lemon: 3,
  star: 2,
  seven: 1,
  diamond: 0,
};

export const reel3Map = {
  cherry: 3,
  lemon: 3,
  star: 2,
  seven: 1,
  diamond: 1,
};

export const payouts: {
  [line: string]: {
    coins: number;
  };
} = {
  "cherry,cherry,cherry": {
    coins: 5,
  },

  "lemon,lemon,lemon": {
    coins: 10,
  },

  "star,star,star": {
    coins: 25,
  },

  "seven,seven,seven": {
    coins: 100,
  },

  "cherry,cherry,diamond": {
    coins: 15,
  },

  "lemon,lemon,diamond": {
    coins: 30,
  },

  "star,star,diamond": {
    coins: 75,
  },

  "seven,seven,diamond": {
    coins: 300,
  },
};
