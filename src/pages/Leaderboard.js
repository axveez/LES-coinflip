import { utils } from "near-api-js";
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import regeneratorRuntime from "regenerator-runtime";
import axios from 'axios';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


const Home = () => {

  const [summary, setSummary] = useState({});
  const [leaderboard, setLeaderboard] = useState({});
  const [button1, setButton1] = useState([]);
  const [button2, setButton2] = useState([]);
  const [leadeboardoption, setLeadeboardOption] = useState([]);
  Date.prototype.startOfWeek = function (pStartOfWeek) {
    var mDifference = this.getDay() - pStartOfWeek;

      if (mDifference < 0) {
          mDifference += 7;
      }

      return new Date(this.addDays(mDifference * -1));
  }

  Date.prototype.addDays = function (pDays) {
      var mDate = new Date(this.valueOf());
      mDate.setDate(mDate.getDate() + pDays);
      return mDate;
  };

  var date = new Date();
  var month = new Date(date.getFullYear(), date.getMonth(), 1).valueOf() ;
  var week =new Date().startOfWeek(1).valueOf() ;
  var d = new Date();d.setHours(0,0,0,0);
  var day = d.valueOf() ;

    useEffect(() => {
      
      loadSummary(0);
      loadLeaderboard(0);
      setButton1("all");
      setButton2("all");
      setLeadeboardOption("volume")
    }, []);

  const loadSummary = async (timestamp) => {
    await axios.get(`https://dzflipapi.herokuapp.com/api/${timestamp}`)
      .then(res => {
        console.log(res);
        if (res && res.data) {
          setSummary(res.data);
        }
      })
      .catch(err => {
        console.log(err);
      })
  };

  const loadLeaderboard = async (timestamp) => {
    await axios.get(`https://dzflipapi.herokuapp.com/api/${timestamp}`)
      .then(res => {
        console.log(res);
        if (res && res.data) {
          setLeaderboard(res.data);
        }
      })
      .catch(err => {
        console.log(err);
      })
  };

  if (leaderboard.hasOwnProperty('leaderboard')){
    var signer_id = [];
    var amount = []
    leaderboard.leaderboard[`${leadeboardoption}`].slice(0, 10).map((val,key) => {
      signer_id.push(val.signer_id);
      amount.push(val.amount);
    })
    var data = {
        labels: signer_id,
        color: '#FFFFFF',
        datasets: [
          {
            label: '# of Votes',
            data: amount,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(25, 44, 186, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(25, 44, 186, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };
  }

  return (
    <div className="dashboard-page py-5">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h3 className="bold-font">KANGAROO FLIP COIN LEADERBOARD</h3>
            <br/>
            <a href="/" className="btn btn-leaderboard active">Play Flip Coin</a>
            <br/>
            <br/>
          </div>
          <div className="col-12 col-lg-4 mt-3">
            <button className={`btn btn-leaderboard btn-sm mx-1 ${button1=="all" ? "active": ""}`} onClick={()=>{loadSummary(0),setButton1("all")}}>ALL</button>
            <button className={`btn btn-leaderboard btn-sm mx-1 ${button1=="month" ? "active": ""}`} onClick={()=>{loadSummary(month),setButton1("month")}}>Current Month</button>
            <button className={`btn btn-leaderboard btn-sm mx-1 ${button1=="week" ? "active": ""}`} onClick={()=>{loadSummary(week),setButton1("week")}}>Current Week</button>
            <button className={`btn btn-leaderboard btn-sm mx-1 ${button1=="daily" ? "active": ""}`} onClick={()=>{loadSummary(day),setButton1("daily")}}>Current Day</button>
            <div className="row mt-3">
              <div className="col-6 pt-2">
                <div className="card">
                  <div className="card-body">
                    <p className="card-text">total flip : <br/> {summary.total_flip || "-"}</p>
                  </div>
                </div>
              </div>

              <div className="col-6 pt-2">
                <div className="card">
                  <div className="card-body">
                    <p className="card-text">total volume : <br/> {summary.total_volume ? Number(summary.total_volume).toFixed(2) : 0 || "-"}</p>
                  </div>
                </div>
              </div>

              <div className="col-6 pt-2">
                <div className="card">
                  <div className="card-body">
                    <p className="card-text">total win : <br/> {summary.total_win || "-"}</p>
                  </div>
                </div>
              </div>

              <div className="col-6 pt-2">
                <div className="card">
                  <div className="card-body">
                    <p className="card-text">total lose : <br/> {summary.total_lose || "-"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-8">

            <div className="row mt-3">
              <div className="col--12 col-lg-10 pt-2">
                <button className={`btn btn-leaderboard btn-sm mx-1 ${button2=="all" ? "active": ""}`} onClick={()=>{loadLeaderboard(0),setButton2("all")}}>ALL</button>
                <button className={`btn btn-leaderboard btn-sm mx-1 ${button2=="month" ? "active": ""}`} onClick={()=>{loadLeaderboard(month),setButton2("month")}}>Current Month</button>
                <button className={`btn btn-leaderboard btn-sm mx-1 ${button2=="week" ? "active": ""}`} onClick={()=>{loadLeaderboard(week),setButton2("week")}}>Current Week</button>
                <button className={`btn btn-leaderboard btn-sm mx-1 ${button2=="daily" ? "active": ""}`} onClick={()=>{loadLeaderboard(day),setButton2("daily")}}>Current Day</button>
              </div>
              
              <div className="col-12 col-lg-2 pt-2">
                <select className="form-select form-select-sm" aria-label="Default select example" onChange={e => setLeadeboardOption(e.target.value)}>
                  <option value="volume">volume</option>
                  <option value="net-win">net-win</option>
                  {/*<option value="net-gain">net-gain</option>*/}
                  <option value="win-streak">win streak</option>
                  <option value="lose-streak">lose streak</option>
                </select>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-12 pt-2">
                <div className="card">
                  <div className="card-body">

                    <table className="table table-sm table-borderless">
                      <thead>
                        <tr style={{backgroundColor: '#4a3959'}}>
                          <th>#.</th>
                          <th>Account ID</th>
                          <th className="text-end">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                      { leaderboard.hasOwnProperty('leaderboard') ?
                        leaderboard.leaderboard[`${leadeboardoption}`].slice(0, 10).map((item,i) => <tr key={`key${i+1}`}><td>{i+1}</td><td style={{wordBreak: 'break-all'}}>{item.signer_id}</td><td className="text-end">{Number.isInteger(item.amount) ? Number(item.amount) : Number(item.amount).toFixed(2)}</td></tr>)
                        :
                        <tr><td colSpan="3" className="text-center">NO DATA</td></tr>
                      }
                       </tbody>
                    </table>

                    <div className="row justify-content-center">
                      <div className="col-12 col-lg-6 py-2">
                        { leaderboard.hasOwnProperty('leaderboard') ?
                          <Pie data={data} options={{ color: '#FFFFFF'}} />
                          :
                          ""
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;