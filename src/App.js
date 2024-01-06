/*  this code is not run .
import { useState } from 'react'

import './App.css'
export default function App()
{
  var watchIntervalObj = undefined;

  const [isRunning,setIsRunning] = useState(false)
  const [watchData,setWatchData] = useState({
    hour : 0 , minute : 0 , second : 0
  })

  var startPause = ()=>{
    if(isRunning){
      // Pause
      clearInterval(watchIntervalObj)
      watchIntervalObj = undefined
    }else{
      // Start
      watchIntervalObj = setInterval(incrementSecond,3000)
    }
  }

  var incrementSecond = ()=>{       
        var second = watchData.second
        var minute = watchData.minute
        var hour = watchData.hour
        console.log("Before : " , hour,minute,second)
        second+=1
        if(second==60)
        {
          minute +=1
          second = 0
          if(minute==60)
          {
            hour+=1
            minute = 0
          }
        }
        console.log("After : " , hour,minute,second)
        setWatchData({
          hour : hour , minute : minute , second : second
        })
  }

  return <>
      <div className="row">
          <div className="col-lg-4 col-md-4">
             <img src='./stopwatch' height="150"/>
          </div>
          <div className="col-lg-4 col-md-4">
              <button className='btn btn-success' onClick={startPause}>
                {isRunning?"Pause":"Start"}
              </button>
              &nbsp;&nbsp;&nbsp;
              <button className='btn btn-warning'>Reset</button>
              &nbsp;&nbsp;&nbsp;
              <button className='btn btn-primary'>Lap</button>
          </div>        
      </div>
      <div className="row mt-3 text-center alert alert-info">
          <div className="col-lg-4 col-md-4 element">
              {watchData.hour}
          </div>
          <div className="col-lg-4 col-md-4 element">
              {watchData.minute}
          </div>
          <div className="col-lg-4 col-md-4 element">
              {watchData.second}  
          </div>
      </div>
  </>
} */

import { Component } from 'react';
import './App.css'
export default class App extends Component {
  constructor() {
    super()
    this.watchIntervalObj = undefined;

    this.state = {
      isRunning: false,
      watchData: {
        hour: 0, minute: 0, second: 0
      },
      laps : []
    }
  }

  startPause = () => {
    if (this.state.isRunning) {
      // Pause
      clearInterval(this.watchIntervalObj)
      this.watchIntervalObj = undefined
      this.setState({isRunning:false})
    } else {
      // Start
      this.watchIntervalObj = setInterval(this.incrementSecond, 1000)
      this.setState({isRunning:true})
    }
  }

  incrementSecond = () => {
    var second = this.state.watchData.second
    var minute = this.state.watchData.minute
    var hour = this.state.watchData.hour

    second += 1
    if (second == 60) {
      minute += 1
      second = 0
      if (minute == 60) {
        hour += 1
        minute = 0
      }
    }

    this.setState({ watchData: { hour, minute, second } })
  }

  reset = ()=>{
    clearInterval(this.watchIntervalObj)
    this.watchIntervalObj = undefined
    this.setState({isRunning:false,watchData:{hour:0,minute:0,second:0}})
  }

  addLap = ()=>{
     var ob = {...this.state.watchData}
     this.setState({laps:[...this.state.laps,ob]})
  }

  render() {
    return <>
      <div className="row">
        <div className="col-lg-4 col-md-4">
          <img src="./stopwatch.jpg" height="150" />
        </div>
        <div className="col-lg-4 col-md-4">
          <button className='btn btn-success' onClick={this.startPause}>
            {this.state.isRunning ? "Pause" : "Start"}
          </button>
          &nbsp;&nbsp;&nbsp;
          <button className='btn btn-warning' onClick={this.reset}>Reset</button>
          &nbsp;&nbsp;&nbsp;
          <button className='btn btn-primary' onClick={this.addLap}>Lap</button>
        </div>
      </div>
      <div className="row mt-3 text-center alert alert-info">
        <div className="col-lg-4 col-md-4 element">
          {this.state.watchData.hour}
        </div>
        <div className="col-lg-4 col-md-4 element">
          {this.state.watchData.minute}
        </div>
        <div className="col-lg-4 col-md-4 element">
          {this.state.watchData.second}
        </div>
      </div>
      <hr/>

      {this.state.laps.map((lap,index)=><div key={index}>
         <h4 className='alert alert-warning'> {lap.hour} : {lap.minute} : {lap.second} </h4>
      </div>)}
    </>
  }
}