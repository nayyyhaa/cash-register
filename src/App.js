import './App.css';
import {useState} from 'react';

function App() {
  let [billAmt, setBillAmt] = useState();
  let [cashGivenAmt, setCashGivenAmt] = useState();
  let [returnedAmt, setReturnedAmt] = useState();
  let [errorMsg, setErrorMsg] = useState('');
  let [showError, setShowError] = useState(false);
  let [changeArr, setChangeArr] = useState([0,0,0,0,0,0,0])
  let cashArray = [2000, 500, 100, 20, 10, 5, 1];

  function calculateChangeAmt() {
    let changeAmt = cashGivenAmt - billAmt;
    if(changeAmt > 0) {
      setShowError(false);
      setReturnedAmt(changeAmt);
      calculateNoteChange(changeAmt);
    }
    else if(changeAmt < 0) {
      setShowError(true);
      setErrorMsg("Cash Given value is less than bill, Please Enter right Amount");
    }
    else if(changeAmt === 0) {
      setShowError(true);
      setErrorMsg("No Cash to be returned!");
    }
    else{
      setShowError(true);
      setErrorMsg("Enter Valid Amount Please!");
    } 
  }

  function calculateNoteChange(changeAmt) {
    for(let i=0;i<7;i++) {
      let noOfNotes = Math.floor(changeAmt / cashArray[i]);
      if(noOfNotes > 0 && i<7) {
        changeAmt = changeAmt % cashArray[i];
        changeArr[i] = noOfNotes;
      }
      else changeArr[i] = 0;
    }
    setChangeArr([...changeArr])
  }

  return (
    <div className="App">
      <main>
        <header>
          <h1>Cash Register Manager</h1>
        </header>
        <p className="description">Enter the bill amount and cash given by the customer and know the minimum number of notes to return.</p>
        <div className="box-content">
          <label htmlFor="bill-amount">Total Bill Amount</label>
          <input id="bill-amount" type="number" onChange={(e) => setBillAmt(e.target.value)}/>
          <label htmlFor="cash-given">Cash Given</label>
          <input id="cash-given" type="number"onChange={(e) => setCashGivenAmt(e.target.value)}/>
          <button className="check" onClick={calculateChangeAmt}>check</button>
          <p className="errorMsg" style={showError? {display: 'block'}: {display: 'none'}}>{errorMsg}</p>
          <div className="returnTable" style={!showError? {display: 'block'}: {display: 'none'}}>
            <p>Total amount to be returned: {returnedAmt}</p>
            <table className="cash-table">
              <tbody>
                <tr>
                  <th>No. of Notes</th>
                  {changeArr.map((arr, index) => {
                    return <td key={index}>{arr}</td>
                  })}
                </tr>
                <tr>
                  <th>Note</th>
                  {cashArray.map((arr, index) => {
                    return <td key={index}>{arr}</td>
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
