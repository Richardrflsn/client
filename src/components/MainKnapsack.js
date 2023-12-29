import { Container, Row, Col, Button } from 'react-bootstrap'
import React, {useState} from 'react'

const MainKnapsack = () => {
    const [capacity, setCapacity] = useState('');
    const [numOfItems, setNumOfItems] = useState('');
    const [tableContent, setTableContent] = useState(null);
    const [profitArr, setProfitArr] = useState([]);
    const [weightArr, setWeightArr] = useState([]);
    const [result, setResult] = useState({
        knapsack: {
            resultantProfit: 0,
            profit: [],
            weight: [],
            density: [],
            resultantSolution: [],
        },
        knapsack01: {
            resultantProfit: 0,
            profit: [],
            weight: [],
            density: [],
            resultantSolution: [],
        },
    });

    const createTable = () => {
        const numberOfObjects = parseInt(numOfItems, 10) || 0; // Ensure it's a number
        const tableHeader = (
        <table className="table table-bordered" id="table">
        <thead>
            <tr>
                <th scope="col">Items</th>
                <th scope="col">Profit</th>
                <th scope="col">Weight</th>
            </tr>
        </thead>
        <tbody>
            {Array.from({ length: numberOfObjects }, (_, i) => (
            <tr key={i}>
                <td>Item {i}</td>
                <td>
                <input
                    type="number"
                    className="form-control"
                    placeholder="Value"
                    onChange={(e) => handleProfitChange(i, e.target.value)}
                />
                </td>
                <td>
                <input
                    type="number"
                    className="form-control"
                    placeholder="Weight"
                    onChange={(e) => handleWeightChange(i, e.target.value)}
                />
                </td>
            </tr>
            ))}
        </tbody>
        </table>
    );

    setTableContent(tableHeader);
    };

    const handleProfitChange = (index, value) => {
        const newProfitArr = [...profitArr];
        newProfitArr[index] = parseInt(value, 10) || 0;
        setProfitArr(newProfitArr);
    };

    const handleWeightChange = (index, value) => {
        const newWeightArr = [...weightArr];
        newWeightArr[index] = parseInt(value, 10) || 0;
        setWeightArr(newWeightArr);
    };

    const generateResult = () => {
        const knapsackCapacity = parseInt(capacity, 10) || 0;
        const numberOfObjects = parseInt(numOfItems, 10) || 0;

        const newProfitArr = profitArr.slice(0, numberOfObjects);
        const newWeightArr = weightArr.slice(0, numberOfObjects);

        const knapsackResult = knapsackAlgorithm(knapsackCapacity, newProfitArr, newWeightArr);
        const knapsack01Result = knapsack01Algorithm(knapsackCapacity, newProfitArr, newWeightArr);

        setResult({
            knapsack: knapsackResult,
            knapsack01: knapsack01Result,
        });
    };

    function sortLists(densityArr, profitArr, weightArr, numOfObjects) {

      // Loop for initializing density values.
        for (var i = 0; i < numOfObjects; i++) {
    
          // For detecting integer densities.
            if(Number.isInteger( profitArr[i] / weightArr[i] )) {
                densityArr[i] = Math.round(profitArr[i] / weightArr[i]);
                continue;
            }
            densityArr[i] = (profitArr[i] / weightArr[i]).toFixed(2);
        }       

      // to sort density in decreasing order along with profit and weight list
        var list = [];
        for (i = 0; i < numOfObjects; i++)
            list.push({ 'density': densityArr[i], 'profit': profitArr[i], 'weight': weightArr[i] });

            list.sort(function (a, b) {
            return ((a.density > b.density) ? -1 : ((a.density === b.density) ? 0 : 1));
        });

        for (i = 0; i < numOfObjects; i++) {
            densityArr[i] = list[i].density;
            profitArr[i] = list[i].profit;
            weightArr[i] = list[i].weight;
        }
    }

    function knapsackAlgorithm(knapsackCapacity, profitArr, weightArr, numOfObjects) {
        // An array for storing the densities of the objects.
        const densityArr = [];
        sortLists(densityArr, profitArr, weightArr, numOfObjects);
    
        // A variable for storing the resultant profit of the knapsack; initialized with 0.
        let knapsackResultantProfit = 0;
    
        // An array for storing the solution of the problem
        const kpResultantSolutionArr = [];
    
        for (var i = 0; i < numOfObjects; i++) {
            if (weightArr[i] <= knapsackCapacity) {
            knapsackCapacity -= weightArr[i];
            knapsackResultantProfit += profitArr[i];
            kpResultantSolutionArr[i] = 1;
            } else if (knapsackCapacity !== 0) {
            knapsackResultantProfit = knapsackResultantProfit + (profitArr[i] * (knapsackCapacity / weightArr[i]));
            kpResultantSolutionArr[i] = knapsackCapacity + '/' + weightArr[i];
            knapsackCapacity = 0;
            } else {
            kpResultantSolutionArr[i] = 0;
            }
        }
    
        console.log('profit = ' + profitArr);
        console.log('weight = ' + weightArr);
        console.log('density = ' + densityArr);
    
        console.log(knapsackResultantProfit);
    
        setResult((prevResult) => ({
        ...prevResult,
        knapsack: {
            resultantProfit: parseFloat(knapsackResultantProfit.toFixed(2)),
            profit: profitArr,
            weight: weightArr,
            density: densityArr,
            resultantSolution: kpResultantSolutionArr,
        },
        }));
    }
    
    
    function find01Solution(objToSelect, capLeft, solutionArr, table, numOfObjects, profitArr, weightArr) {
    // The base case will be reached in any scenario because the 0th row is initialized with 0 values.
    if( objToSelect === 0 ) {
        return;
    }
    
    // The current object is not selected.
    if(table[objToSelect][capLeft] === table[objToSelect - 1][capLeft]) {
        solutionArr[objToSelect - 1] = 0;
        find01Solution(objToSelect - 1, capLeft, solutionArr, table, numOfObjects, profitArr, weightArr);
    }
    else if(capLeft >= weightArr[objToSelect - 1]) {
        // The current object is selected.
        if( table[objToSelect][capLeft] === (table[objToSelect - 1][capLeft - weightArr[objToSelect - 1]] + profitArr[objToSelect - 1]) ) {
            solutionArr[objToSelect - 1] = 1;
            find01Solution(objToSelect - 1, capLeft - weightArr[objToSelect - 1], solutionArr, table, numOfObjects, profitArr, weightArr);
        }
    }
    }
    
    // applying knapsack 0/1 algorithm
    function knapsack01Algorithm(knapsackCapacity, profitArr, weightArr, numOfObjects) {
    
        const kp01ResultantProfitId = document.getElementById("kp01ResultantProfit");
        const kp01ProfitId = document.getElementById("kp01Profit");
        const kp01WeightId = document.getElementById("kp01Weight");
        const kp01ResultantSolutionId = document.getElementById("kp01ResultantSolution");
    
        var knapsackTable = new Array(numOfObjects + 1);
    
        for (let objConsidered = 0; objConsidered <= numOfObjects; objConsidered++) {
    
            knapsackTable[objConsidered] = Array(knapsackCapacity + 1);
            for (let capConsidered = 0; capConsidered <= knapsackCapacity; capConsidered++) {
                knapsackTable[objConsidered][capConsidered] = 0;
            }
        }
    
        const tableHeader = '<table class="table table-bordered">';
        var tableBody = '';
    
        for (var objConsidered = 0; objConsidered <= numOfObjects; objConsidered++) {
            for (var capConsidered = 0; capConsidered <= knapsackCapacity; capConsidered++) {
                
                if(objConsidered === 0) {
                    continue;
                }
    
                if (weightArr[objConsidered - 1] <= capConsidered) {
                    knapsackTable[objConsidered][capConsidered] = 
                    (Math.max(
                        knapsackTable[objConsidered - 1][capConsidered], 
                        knapsackTable[objConsidered - 1][capConsidered - weightArr[objConsidered - 1]] + profitArr[objConsidered - 1]));
                    tableBody += '<td>';
                    tableBody += knapsackTable[objConsidered][capConsidered];
                    tableBody += '</td>'
                }
                else {
                    knapsackTable[objConsidered][capConsidered] = knapsackTable[objConsidered - 1][capConsidered]
                    tableBody += '<td>';
                    tableBody += knapsackTable[objConsidered][capConsidered];
                    tableBody += '</td>'
                }
            }
            tableBody += '</tr></tbody>\n';
        }
    
        const tableFooter = '</table>';
        document.getElementById('knapsackTable').innerHTML = tableHeader + tableBody + tableFooter;
    
        // console.log(knapsackTable);
        // console.log(knapsackTable[numOfObjects][knapsackCapacity]);
    
        var solutionArr = [];
        for(let i = 0; i < numOfObjects; i++) {
            solutionArr.push(0);
        }
        find01Solution(parseInt(numOfObjects), parseInt(knapsackCapacity), solutionArr, knapsackTable, parseInt(numOfObjects), profitArr, weightArr);
    
    
        kp01ResultantProfitId.innerHTML = knapsackTable[numOfObjects][knapsackCapacity];
        kp01ProfitId.innerHTML = profitArr;
        kp01WeightId.innerHTML = weightArr;
        kp01ResultantSolutionId.innerHTML = solutionArr;
    }

    return (
        <div>
            <Container>
            <Row className="justify-content-md-center">
                <Col className="col-md-6">
                    <div className="input-group">
                    <div className="input-group-addon">
                        <span className="FAVICON"></span>
                    </div>
                    <input
                        className="form-control"
                        type="number"
                        placeholder="Enter Knapsack Capacity"
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                    />
                    </div>
                </Col>

                <Col className="col-md-6">
                    <div className="input-group">
                    <div className="input-group-addon">
                        <span className="FAVICON"></span>
                    </div>
                    <input
                        className="form-control"
                        type="number"
                        placeholder="Enter number of Items"
                        value={numOfItems}
                        onChange={(e) => setNumOfItems(e.target.value)}
                    />
                    </div>
                </Col>
                </Row>

                    <div className="text-center">
                    <Button type="button" className="generateTable btn btn-primary" onClick={createTable}>
                    Generate Table
                    </Button>
                    </div>

                    <div className="table" id="wrapper">
                    {tableContent}
                    </div>

                    <div className="text-center">
                    <Button type="button" className="generateResult btn btn-success" onClick={generateResult}>Calculate</Button>
                    </div>
            </Container>

            <hr></hr>

            <Container className="text-center">
                <div className="result">
                    <div className="resultContainer col-md-6">
                        <h1>Knapsack</h1>
                        <h4>Resultant Profit:</h4>
                        <h2 id="kpResultantProfit">{result.knapsack.resultantProfit}</h2>
                        <h4>Density</h4>
                        <h2 id="kpProfitWeight">{result.knapsack.density}</h2>
                        <h4>Profit</h4>
                        <h2 id="kpProfit">{result.knapsack.profit}</h2>
                        <h4>Weight</h4>
                        <h2 id="kpWeight">{result.knapsack.weight}</h2>
                        <h4>Resultant Solution</h4>
                        <h2 id="kpResultantSolution">{result.knapsack.resultantSolution}</h2>
                    </div>

                    <div className="resultContainer col-md-6">
                        <h1>Knapsack 0/1</h1>
                        <h4>Resultant Profit</h4>
                        <h2 id="kpResultantProfit">{result.knapsack01.resultantProfit}</h2>
                        <h4>Density</h4>
                        <h2 id="kpProfitWeight">{result.knapsack01.density}</h2>
                        <h4>Profit</h4>
                        <h2 id="kpProfit">{result.knapsack01.profit}</h2>
                        <h4>Weight</h4>
                        <h2 id="kpWeight">{result.knapsack01.weight}</h2>
                        <h4>Resultant Solution</h4>
                        <h2 id="kpResultantSolution">{result.knapsack01.resultantSolution}</h2>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default MainKnapsack
