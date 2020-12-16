import React, {Component} from "react";
import './App.css';
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Particles from 'react-particles-js';
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";


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
      //输入的url
      input: "",
      route: "signin",
      isSignedIn: false,
      imageUrl: '',
      box: {},
      user:{
        id:"",
        name:"",
        email:"",
        entries:0,
        joined:""
      }
    }
  }

//   测试连接, 如果访问成功/接口，会返回database.users.
// // 经过测试，测试成功的
//  componentDidMount(){
//    fetch("http://localhost:3000")
//    .then(response => response.json())
//    .then(console.log)
//    .catch(function(error) {
//     console.log(error);
// })
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

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    //  乘上百分比
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) =>{
    this.setState({box: box});
  }


  onInputChange = (event) => {
    console.log(event.target.value);
    this.setState({input:event.target.value})
  }


  onButtonSubmit = () => {
    console.log("click");
    this.setState({imageUrl: this.state.input});

    fetch('http://localhost:3000/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
    })
       // 自己加的
        .then(console.log)
        
        .then(response => response.json())
   

        .then(response => {
          if (response){
            fetch('http://localhost:3000/image', {
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                id: this.state.user.id
            })
          })
            
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })
            .catch(console.log)
          }
          this.displayFaceBox(this.calculateFaceLocation(response))
        })
        .catch(err => console.log(err));
  }
  render() {
    const {isSignedIn, route, imageUrl, box} = this.state;
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
                <FaceRecognition box={box} imageUrl={imageUrl}/>
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
