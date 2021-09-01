import './App.css';
import {useState} from 'react';

function App() {
  let [billAmt, setBillAmt] = useState();
  let [cashGivenAmt, setCashGivenAmt] = useState();
  let [returnedAmt, setReturnedAmt] = useState();
  let [errorMsg, setErrorMsg] = useState('');
  let [showError, setShowError] = useState(false);
  let [showChangeAmtContent, setShowChangeAmtContent] = useState(false);
  let [changeArr, setChangeArr] = useState([0,0,0,0,0,0,0])
  let cashArray = [2000, 500, 100, 20, 10, 5, 1];
  let changeAmt;

  function calculateChangeAmt() {
    changeAmt = cashGivenAmt - billAmt;
    if(changeAmt > 0 && billAmt>0) {
      setShowError(false);
      setReturnedAmt(changeAmt);
      calculateNoteChange();
    }
    else {
      setShowError(true);
      if(changeAmt < 0) setErrorMsg("Cash Given value is less than bill, Please Enter right Amount");
      else if(changeAmt === 0) setErrorMsg("No Cash to be returned!");
      else setErrorMsg("Enter Valid Amount Please!");
    }
  }

  function validateBillAmt() {
    if(billAmt>0) {
      setShowError(false);
      setShowChangeAmtContent(true);
    }
    else {
      setShowError(true);
      setErrorMsg("Enter Valid Amount Please!");
    }
  }

  function calculateNoteChange() {
    for(let i=0; i<cashArray.length; i++) {
      let noOfNotes = Math.floor(changeAmt / cashArray[i]);
      if(noOfNotes > 0) {
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
          <button onClick={validateBillAmt} style={!showChangeAmtContent? {display: 'flex'}: {display: 'none'}}>Next</button>
          <div className="cash-given-content" style={showChangeAmtContent? {display: 'flex'}: {display: 'none'}}>
            <label htmlFor="cash-given">Cash Given</label>
            <input id="cash-given" type="number" onChange={(e) => setCashGivenAmt(e.target.value)}/>
            <button className="check" onClick={calculateChangeAmt}>check</button>
          </div>
          <p className="errorMsg" style={showError? {display: 'block'}: {display: 'none'}}>{errorMsg}</p>
          <div className="returnTable" style={!showError && returnedAmt>0? {display: 'block'}: {display: 'none'}}>
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
