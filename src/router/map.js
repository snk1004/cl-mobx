import React from 'react';
import { Switch,Route,Redirect } from "react-router-dom";

class RouterMap extends React.Component{
    render(){
        const {routes}=this.props
        const defaultRoute=<Route path="/" component={()=>{
            return <Redirect to="/index"/>
        }} key={1} exact/>
        return <Switch>{
                routes.map((item,index)=>{
                    const Comp=item.component
                    return <Route path={item.path} component={(apiRoute)=>{
                        return <Comp routes={item.children} {...apiRoute}></Comp>
                    }} key={index}></Route>
                }).concat(defaultRoute)
        }</Switch>
    }
}
export default RouterMap