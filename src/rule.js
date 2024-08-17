const KING_BONUS = 50;
const KING_ALL_BONUS = 100;
const GOLDEN_MULTIPLY = 3; 

export const calculate = (bossCount, kingCount, isGolden) => 
    bossCount * (isGolden ? GOLDEN_MULTIPLY : 1)
     + KING_BONUS * kingCount
     + (kingCount>=3 ? KING_ALL_BONUS : 0)
    ;

