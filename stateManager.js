class StateManager {
    constructor() { 
        this.state = 'init'
    }

    setState(newState) {
        this.state = newState
    }

    getState() {
        return this.state
    }
}

export let stateManager
export const initState = () => {
    stateManager = new StateManager();
}

export const resetGame = () => {
    stateManager.setState('init')
}

export const runGame = () => {
    stateManager.setState('running')
}

export const pauseGame = () => {
    stateManager.setState('pause')
}