import React from "react";
class Signin extends React.Component {
    constructor(props){
       super(props);
       this.state =  {
           signInEmail:"",
           signInPassword:""
       }
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value })
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value })
    }

    // 箭头函数：render的时候不调用这个函数，只有当onClick的时候才调用
    onSubmitSignIn = () => {
        // 放fetch里面没有跳转，放外面跳转了，说明fetch出了问题
        // 404 not found ? 
        /*
        POST http://localhost:3000/signin 500 (Internal Server Error)
        (anonymous) @ VM333:1
        */
        fetch('http://localhost:3000/signin', {
            method: 'POST',
            // headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
                // .then(res => res.json())
                // .then(user =>{
                //     console.log(user.id)
                //     if (user.id){
                //         this.props.loadUser(user)
                //         this.props.onRouteChange("rankpage")
                //     }
                // }
                // )
                .catch(error => console.error('Error:', error))
                .then(res => console.log('Success:', res))

        })
        // this.props.onRouteChange("rankpage")
        console.log(this.state);
    }


    render(){
        const {onRouteChange} = this.props;
        return(
        // html代码
        <article className="center br3 ba b--black-10 mv4 w-100 w-50-m w-25-l shadow-5 mw6 center">
            <main className="pa4 black-80">
            <form className="measure ">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                    <input 
                        onChange={this.onEmailChange}
                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="email" 
                        name="email-address"  
                        id="email-address" />
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                    <input 
                    onChange={this.onPasswordChange}
                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                    type="password" name="password"  id="password" />
                </div>
                </fieldset>
                <div className="">
                <input 
                // 箭头函数：render的时候不调用这个函数，只有当onClick的时候才调用
                // 设置只有提交了数据才会页面跳转

                    onClick = {this.onSubmitSignIn}
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                    type="submit" 
                    value="Sign in" />
                </div>
                <div className="lh-copy mt3">
                    <p onClick = {() => onRouteChange("register")} href="#0" 
                        className="f6 link dim black db">Register</p>
                </div>
            </form>
            </main>
        </article>    
    )}
}

export default Signin;