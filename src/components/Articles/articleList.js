const articlesList = [
    {
        id: 1,
        title: "It’s strongly recommended that you assign proper keys whenever you build dynamic lists.",
        text: "In this tutorial, we’ll show how to build an interactive tic-tac-toe game with React. You can see what we’ll be building here: Final Result. If the code doesn’t make sense to you, or if you are unfamiliar with the code’s syntax, don’t worry! The goal of this tutorial is to help you understand React and its syntax. We recommend that you check out the tic-tac-toe game before continuing with the tutorial. One of the features that you’ll notice is that there is a numbered list to the right of the game’s board. This list gives you a history of all of the moves that have occurred in the game, and is updated as the game progresses. You can close the tic-tac-toe game once you’re familiar with it. We’ll be starting from a simpler template in this tutorial. Our next step is to set you up so that you can start building the game."
    },
    {
        id: 2,
        title: "Making an Interactive Component",
        text: "If you’re going to work on the tutorial in your browser, open this code in a new tab: Starter Code. If you’re going to work on the tutorial locally, instead open src/index.js in your project folder (you have already touched this file during the setup). This Starter Code is the base of what we’re building. We’ve provided the CSS styling so that you only need to focus on learning React and programming the tic-tac-toe game. By inspecting the code, you’ll notice that we have three React components: Square Board Game The Square component renders a single <button> and the Board renders 9 squares. The Game component renders a board with placeholder values which we’ll modify later. There are currently no interactive components."
    },
    {
        id: 3,
        title: "Why Immutability Is Important",
        text: "Currently, each Square component maintains the game’s state. To check for a winner, we’ll maintain the value of each of the 9 squares in one location. We may think that Board should just ask each Square for the Square’s state. Although this approach is possible in React, we discourage it because the code becomes difficult to understand, susceptible to bugs, and hard to refactor. Instead, the best approach is to store the game’s state in the parent Board component instead of in each Square. The Board component can tell each Square what to display by passing a prop, just like we did when we passed a number to each Square. To collect data from multiple children, or to have two child components communicate with each other, you need to declare the shared state in their parent component instead. The parent component can pass the state back down to the children by using props; this keeps the child components in sync with each other and with the parent component. Lifting state into a parent component is common when React components are refactored — let’s take this opportunity to try it out. We’ll add a constructor to the Board and set the Board’s initial state to contain an array with 9 nulls."
    },
    {
        id: 4,
        title: "What Are We Building?",
        text: "In this tutorial, we’ll show how to build an interactive tic-tac-toe game with React. You can see what we’ll be building here: Final Result. If the code doesn’t make sense to you, or if you are unfamiliar with the code’s syntax, don’t worry! The goal of this tutorial is to help you understand React and its syntax. We recommend that you check out the tic-tac-toe game before continuing with the tutorial. One of the features that you’ll notice is that there is a numbered list to the right of the game’s board. This list gives you a history of all of the moves that have occurred in the game, and is updated as the game progresses. You can close the tic-tac-toe game once you’re familiar with it. We’ll be starting from a simpler template in this tutorial. Our next step is to set you up so that you can start building the game."
    },
    {
        id: 5,
        title: "Inspecting the Starter Code",
        text: "If you’re going to work on the tutorial in your browser, open this code in a new tab: Starter Code. If you’re going to work on the tutorial locally, instead open src/index.js in your project folder (you have already touched this file during the setup). This Starter Code is the base of what we’re building. We’ve provided the CSS styling so that you only need to focus on learning React and programming the tic-tac-toe game. By inspecting the code, you’ll notice that we have three React components: Square Board Game The Square component renders a single <button> and the Board renders 9 squares. The Game component renders a board with placeholder values which we’ll modify later. There are currently no interactive components."
    },
    {
        id: 6,
        title: "Lifting State Up",
        text: "Currently, each Square component maintains the game’s state. To check for a winner, we’ll maintain the value of each of the 9 squares in one location. We may think that Board should just ask each Square for the Square’s state. Although this approach is possible in React, we discourage it because the code becomes difficult to understand, susceptible to bugs, and hard to refactor. Instead, the best approach is to store the game’s state in the parent Board component instead of in each Square. The Board component can tell each Square what to display by passing a prop, just like we did when we passed a number to each Square. To collect data from multiple children, or to have two child components communicate with each other, you need to declare the shared state in their parent component instead. The parent component can pass the state back down to the children by using props; this keeps the child components in sync with each other and with the parent component. Lifting state into a parent component is common when React components are refactored — let’s take this opportunity to try it out. We’ll add a constructor to the Board and set the Board’s initial state to contain an array with 9 nulls."
    }
];

export default articlesList;