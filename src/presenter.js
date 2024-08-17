import {Result} from './container.js'
import {calculate} from './rule.js'

(() => {

    const select = document.querySelector.bind(document);

    const onAddResult = (e) => {
        e.stopPropagation();

        const current = result.add(parseInt(select("#calc-current").textContent));

        select("#current").textContent = current;
        select("#set-current").value = current;
        select("#set-goal").value = select("#goal").textContent;

        resetCalc();
    }

    const onResetCalc = (e) => {
        e.stopPropagation();

        resetCalc();
    }

    const onBlurCalc = (e) => {

        // validate
        if (!select("#calc-boss")) {
            select("#calc-boss").value = "0";
        }

        if (!select("#calc-king")) {
            select("#calc-king").value = "0";
        }

        const [bossCount, kingCount, isGolden] =
            [select("#calc-boss").value, select("#calc-king").value, select("#calc-golden").checked];

        console.log(`${bossCount}, ${kingCount}, ${isGolden}`)
        const answer = calculate(parseInt(bossCount), parseInt(kingCount), isGolden);
        
        select("#calc-current").textContent = answer;
    }

    const resetCalc = () => {
        select("#calc-boss").value = "0";
        select("#calc-king").value = "0";
        select("#calc-golden").checked = false;

        select("#calc-current").textContent = "0";
    }

    // -----------------------------------------------------------

    const onSetResult = (e) => {
        e.stopPropagation();

        const nextCurrent = select("#set-current").value;
        const nextGoal = select("#set-goal").value;

        if (window.confirm(`累計を 現在=${nextCurrent} 目標=${nextGoal} にセットしますか？`)) {
            result.setResult(nextCurrent, nextGoal);

            select("#current").textContent = nextCurrent;
            select("#goal").textContent = nextGoal;
        }
    }

    const onResetResult = (e) => {
        e.stopPropagation();

        if (window.confirm("累計の討伐数をリセットしますか？")) {
            result.reset();

            select("#current").textContent = "0";
            select("#goal").textContent = "0";

            select("#set-current").value = "0";
            select("#set-goal").value = "0";
        }
    }

    const createGoal = (extra) => {
        return (e) => {
            e.stopPropagation();

            const goal = result.addGoal(extra);
            select("#goal").textContent = goal;
        }
    }

    // --------------------------------------------------------

    const result = new Result();

    resetCalc();
    select("#current").textContent = "0";
    select("#goal").textContent = "0";
    
    // --------------------------------------------------------

    select("#add-result").addEventListener("click", onAddResult);
    select("#reset-calc").addEventListener("click", onResetCalc);

    select("#calc-boss").addEventListener("input", onBlurCalc);
    select("#calc-king").addEventListener("input", onBlurCalc);
    select("#calc-golden").addEventListener("change", onBlurCalc);

    select("#goal-10").addEventListener("click", createGoal(10));
    select("#goal-50").addEventListener("click", createGoal(50));
    select("#goal-100").addEventListener("click", createGoal(100));

    select("#set-result").addEventListener("click", onSetResult);
    select("#reset-result").addEventListener("click", onResetResult);

})();


