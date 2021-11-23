import React from 'react';
import './SortingVisualizer.css';

export default class SortingVisualizer extends React.Component {
    constructor(props){
        super(props);

        this.state={
            array: [],
        };
    }

    componentDidMount(){
        this.resetArray();
    }

    resetArray(){
        const array = []
        for(let i = 0; i < 310; i++){
            array.push(randomIntFromInterval(5, 600));
        }
        this.setState({array});
    }

    render() {
        const {array} = this.state;

        return(
            <div className="array-container">
                {array.map((value,idx) => (
                    <div 
                        className="array-bar" 
                        key = {idx} 
                        style={{height: `${value}px`}}>
                    </div>
                ))}
                <button onClick={() => this.resetArray()}>Create new array</button>
                <button onClick={() => this.mergesort()}>Merge Sort</button>
                <button onClick={() => this.quicksort()}>Quick Sort</button>
                <button onClick={() => this.heapsort()}>Heap Sort</button>
                <button onClick={() => this.bubblesort()}>Bubble Sort</button>
            </div>
        );
    }
}

function randomIntFromInterval(min,max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}