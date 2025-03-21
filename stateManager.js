class StateManager {
    constructor() { 
        this.state = 'init'
    }

    setState(newState) {
        this.state = newState
    }
}

export let stateManager
export const initState = () => {
    console.log(stateManager)
    stateManager = new StateManager();

    console.log(stateManager)
}

export const resetGame = () => {
    stateManager.state = 'init'
    init()
}

export const pauseGame = () => {
    stateManager.state = 'pause'
}