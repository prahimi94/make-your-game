class StateManager {
    constructor() { 
        this.state = 'start'
    }

    setState(newState) {
        this.state = newState
    }
}

export let stateManager
export const initState = () => {
    stateManager = new StateManager();
}

export const resetGame = () => {
    stateManager.state = 'start'
    init()
}

export const resumeGame = () => {
    stateManager.state = 'pause'
}

export const pauseGame = () => {
    stateManager.state = 'pause'
}