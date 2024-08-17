export class Result {

    current = 0;
    goal = 0;

    setResult = (current, goal) => {
            this.current = current;
            this.goal = goal;
    }

    add = (score) => {
        this.current += score;
        return this.current;
    }

    reset = () => {
        this.setResult(0, 0);
    }

    addGoal = (extra) => {
        this.goal += extra;
        return this.goal;
    }
}