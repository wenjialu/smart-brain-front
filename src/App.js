import React, {Component} from "react";
import './App.css';
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Signin from "./components/Signin/Signin";
// import Register from "./components/Register/Register";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Particles from 'react-particles-js';
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Register from "./Register/Register";

const particleOptions = {
  particles: {
    number:{
      value: 200,
      density: {
        enable: true,
        value_are: 800
      }
    }
    // ,
      // shape: {
      //     type: 'images',
      //     image: [
      //         {src: 'path/to/first/image.svg', height: 20, width: 20},
      //         {src: 'path/to/second/image.jpg', height: 20, width: 20},
      //     ]
      // }
  }
}


class App extends Component{
  constructor(){
    super()
    this.state = {
      input: "",
      route: "signin",
      isSignedIn: false,
      user:{
        id:"",
        name:"",
        email:"",
        entries:0,
        joined:""
      }
    }
  }

//   // 测试连接
//  componentDidMount(){
//    fetch("http://localhost:3000")
//    .then(response => response.json())
//    .then(console.log)
//  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'rankpage') {
      this.setState({isSignedIn: true})
    }

    this.setState({route: route});
  }

  loadUser = (data) => {
    this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
    }})
  }


  onInputChange = (event) => {
    console.log(event.target.value);
  }

  onButtonSubmit = () => {
    console.log("click");
  }

 

  render() {
    const {isSignedIn, route} = this.state;
    return (
      <div className="App">
        <Particles className="particles"
                      params={particleOptions}
                  />
         <Navigation isSignedIn = {isSignedIn} onRouteChange = {this.onRouteChange}/>
         { 
         route === "rankpage"
          ? <div> 
                <Logo /> 
                <Rank />
                <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
                <FaceRecognition />
                </div>
          
            :(
              route === "signin"
              ?  <div>
                  <Signin loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/>
                  </div>
              :   <div>
                  <Register loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/>    
              </div> 
          )            
         }   
      </div>
  
    );
    }
  }
   


export default App;
