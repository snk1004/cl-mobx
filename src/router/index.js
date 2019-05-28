import React from "react"
import Routes from "./routes"
import RouterMap from "./map";

class RouterView extends React.Component{
    render(){
        const {routes} = this.props
        return <RouterMap routes={routes===undefined?Routes:routes}></RouterMap>
    }
}
export default RouterView