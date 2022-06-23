// wrapper to use react router's v6 hooks in class component(to use HOC pattern, like in router v5)
import React from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";

const withRouter = (Component) => {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }
    return ComponentWithRouterProp;
}

export default withRouter;