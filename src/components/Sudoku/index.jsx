import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import './index.css';
import { getSudokuResult } from '../../api/sudoku';

class Sudoku extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sudoku: [],
        }
        this.prevStateSudoku = [];
    }
    componentDidMount = () => {
        this.showSudoku()
    }

    //this function can be used to load initial values or the final result from api.
    loadSudoku = (sudoku) => {
        this.setState({
            sudoku,
        })
    }
    showSudoku = () => {
        let sudoku = []
        for(let i = 0; i < 9; i ++){
            let sudokuRow = [];
            for(let j = 0; j < 9; j ++){
                sudokuRow.push('')   
            }
            sudoku.push(sudokuRow)
        }
        this.setState({
            sudoku: sudoku,
        })
    }

    valueChange = (rowIndex, colIndex, value) => {
        if(value === ""||(value >= 1 && value <= 9)){
            this.prevStateSudoku.push(JSON.parse(JSON.stringify(this.state.sudoku)))
            let sudoku = this.state.sudoku;
            sudoku[rowIndex][colIndex] = value;
            this.setState({
                sudoku: sudoku,
            })
        }
    }

    undoClicked = () => {
        if(this.prevStateSudoku.length > 0){
            this.setState({
                sudoku: this.prevStateSudoku.pop(),
            })
        }
    }
    submitSudoku = () => {
        let body = {
            sudoku: this.state.sudoku,
        }
        getSudokuResult(body).then((response) => {
            this.loadSudoku(response);
        }).catch((error) => {
            console.log("Error while getting sodoku result ", error)
        })
    }
    render() {
        const {
            sudoku
        } = this.state;
        return (
            <Container>
                <Row style={{width: 60*9}}>
                    <Col><Button color="warning" onClick={this.undoClicked}>Undo</Button></Col>
                    <Col><h1>SUDOKU</h1></Col>
                    <Col><Button color="primary" onClick={this.submitSudoku}>Submit</Button></Col>
                </Row>
                {
                    sudoku.length > 0 &&
                    sudoku.map((sudokuRow, rowIndex) => {
                        return(
                            <Row key={rowIndex}>
                            {
                                sudokuRow.length > 0 &&
                                sudokuRow.map((sudokuCell, colIndex) => {
                                    return (
                                        <Col className="sudokoCol" key={colIndex}>
                                        <input value={sudoku[rowIndex][colIndex]} onChange={(e) => {this.valueChange(rowIndex, colIndex, e.target.value)}} placeholder="_" style={{borderTopWidth:[0,3,6].includes(rowIndex)?"5px":"0", borderLeftWidth: [0,3,6].includes(colIndex)?"5px":"0", borderBottomWidth: rowIndex === 8?"5px":"0", borderRightWidth: colIndex === 8?"5px": "0"}}/>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                        )
                    })
                    }
            </Container>
        )
    }
}

export default Sudoku;